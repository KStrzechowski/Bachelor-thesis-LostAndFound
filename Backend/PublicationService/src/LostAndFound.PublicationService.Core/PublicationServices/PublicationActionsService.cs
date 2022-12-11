using AutoMapper;
using Geolocation;
using LostAndFound.PublicationService.Core.DateTimeProviders;
using LostAndFound.PublicationService.Core.PublicationServices.Interfaces;
using LostAndFound.PublicationService.CoreLibrary.Enums;
using LostAndFound.PublicationService.CoreLibrary.Exceptions;
using LostAndFound.PublicationService.CoreLibrary.Internal;
using LostAndFound.PublicationService.CoreLibrary.Requests;
using LostAndFound.PublicationService.CoreLibrary.ResourceParameters;
using LostAndFound.PublicationService.CoreLibrary.Responses;
using LostAndFound.PublicationService.DataAccess.Entities;
using LostAndFound.PublicationService.DataAccess.Entities.PublicationEnums;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.Models;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LostAndFound.PublicationService.Core.PublicationServices
{
    public class PublicationActionsService : IPublicationActionsService
    {
        private readonly IPublicationsRepository _publicationsRepository;
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private readonly IGeocodingService _geocodingService;

        public PublicationActionsService(IPublicationsRepository publicationsRepository, ICategoriesRepository categoriesRepository,
            IDateTimeProvider dateTimeProvider, IMapper mapper, IFileStorageService fileStorageService, IGeocodingService geocodingService)
        {
            _publicationsRepository = publicationsRepository ?? throw new ArgumentNullException(nameof(publicationsRepository));
            _categoriesRepository = categoriesRepository ?? throw new ArgumentNullException(nameof(categoriesRepository));
            _dateTimeProvider = dateTimeProvider ?? throw new ArgumentNullException(nameof(dateTimeProvider));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _fileStorageService = fileStorageService ?? throw new ArgumentNullException(nameof(fileStorageService));
            _geocodingService = geocodingService ?? throw new ArgumentNullException(nameof(geocodingService));
        }

        public async Task<PublicationDetailsResponseDto> CreatePublication(string rawUserId, string username,
            CreatePublicationRequestDto publicationDto)
        {
            var userId = ParseUserId(rawUserId);

            var category = (await _categoriesRepository
                .FilterByAsync(cat => cat.ExposedId == publicationDto.SubjectCategoryId))
                .FirstOrDefault();
            if (category is null)
            {
                throw new BadRequestException("Category with this id does not exist");
            }

            var publicationEntity = _mapper.Map<Publication>(publicationDto);
            if (publicationEntity == null)
            {
                throw new BadRequestException("The publication data is incorrect.");
            }
            publicationEntity.CreationTime = publicationEntity.LastModificationDate = _dateTimeProvider.UtcNow;
            publicationEntity.Author = new Author()
            {
                Id = userId,
                Username = username,
            };
            publicationEntity.SubjectCategoryName = category.DisplayName;

            var decodedAddress = await _geocodingService.GeocodeAddress(publicationDto.IncidentAddress);
            if(decodedAddress is not null)
            {
                publicationEntity.Latitude = decodedAddress.Latitude;
                publicationEntity.Longitude = decodedAddress.Longitude;
            }

            if (publicationDto.SubjectPhoto is not null && publicationDto.SubjectPhoto.Length > 0)
            {
                FileDto fileDto = CreateFileDto(publicationDto.SubjectPhoto);
                publicationEntity.SubjectPhotoUrl = await _fileStorageService.UploadAsync(fileDto);
            }

            await _publicationsRepository.InsertOneAsync(publicationEntity);

            return await GetPublicationDetails(publicationEntity.ExposedId, userId);
        }

        public async Task DeletePublicationPhoto(string rawUserId, Guid publicationId)
        {
            var userId = ParseUserId(rawUserId);
            var publicationEntity = await GetUserPublication(userId, publicationId);

            await DeletePublicationPhotoFromBlob(publicationEntity.SubjectPhotoUrl);
            publicationEntity.SubjectPhotoUrl = null;

            await _publicationsRepository.UpdatePublicationPhotoUrl(publicationEntity);
        }

        public async Task<PublicationDetailsResponseDto> UpdatePublicationPhoto(IFormFile photo, string rawUserId, Guid publicationId)
        {
            var userId = ParseUserId(rawUserId);
            var publicationEntity = await GetUserPublication(userId, publicationId);
            FileDto fileDto = CreateFileDto(photo);

            if (publicationEntity.SubjectPhotoUrl is not null)
            {
                await DeletePublicationPhotoFromBlob(publicationEntity.SubjectPhotoUrl);
            }

            publicationEntity.SubjectPhotoUrl = await _fileStorageService.UploadAsync(fileDto);
            await _publicationsRepository.UpdatePublicationPhotoUrl(publicationEntity);

            return await GetPublicationDetails(publicationId, userId);
        }

        public async Task<PublicationDetailsResponseDto> UpdatePublicationDetails(string rawUserId, Guid publicationId,
            UpdatePublicationDetailsRequestDto publicationDetailsDto)
        {
            var userId = ParseUserId(rawUserId);

            var category = (await _categoriesRepository
                .FilterByAsync(cat => cat.ExposedId == publicationDetailsDto.SubjectCategoryId))
                .FirstOrDefault();
            if (category is null)
            {
                throw new BadRequestException("Category with this id does not exist");
            }

            var publicationEntity = await GetUserPublication(userId, publicationId);
            var isNewAddress = !publicationEntity.IncidentAddress.Equals(publicationDetailsDto.IncidentAddress);
            if (isNewAddress)
            {
                var decodedAddress = await _geocodingService.GeocodeAddress(publicationDetailsDto.IncidentAddress);
                publicationEntity.Latitude = decodedAddress?.Latitude ?? 0d;
                publicationEntity.Longitude = decodedAddress?.Longitude ?? 0d;
            }

            _mapper.Map(publicationDetailsDto, publicationEntity);
            publicationEntity.SubjectCategoryName = category.DisplayName;
            publicationEntity.LastModificationDate = _dateTimeProvider.UtcNow;

            await _publicationsRepository.ReplaceOneAsync(publicationEntity);

            return await GetPublicationDetails(publicationId, userId);
        }

        public async Task DeletePublication(string rawUserId, Guid publicationId)
        {
            var userId = ParseUserId(rawUserId);
            var publicationEntity = await GetUserPublication(userId, publicationId);

            await _publicationsRepository.DeleteOneAsync(pub => pub.ExposedId == publicationId);
        }

        public async Task<(IEnumerable<PublicationBaseDataResponseDto>?, PaginationMetadata)> GetPublications(string rawUserId,
            PublicationsResourceParameters resourceParameters)
        {
            var userId = ParseUserId(rawUserId);

            var filterExpression = await CreateFilterExpression(resourceParameters, userId);
            var publications = (await _publicationsRepository.UseFilterDefinition(filterExpression)).ToList();

            var publicationsPage = publications.OrderByDescending(pub => pub.AggregateRating)
                .Skip(resourceParameters.PageSize * (resourceParameters.PageNumber - 1))
                .Take(resourceParameters.PageSize)
                .ToList();

            var publicationDtos = Enumerable.Empty<PublicationBaseDataResponseDto>();
            if (publicationsPage != null && publicationsPage.Any())
            {
                publicationDtos = _mapper.Map<IEnumerable<PublicationBaseDataResponseDto>>(publicationsPage);

                if (publicationDtos != null && publicationDtos.Any())
                {
                    foreach (var it in publicationDtos.Zip(publicationsPage, Tuple.Create))
                    {
                        var userVote = it.Item2.Votes.FirstOrDefault(x => x.VoterId == userId);

                        it.Item1.UserVote = userVote is null ?
                            SinglePublicationVote.NoVote : _mapper.Map<SinglePublicationVote>(userVote.Rating);
                    }
                }
            }

            int totalItemCount = publications.Count;
            var paginationMetadata = new PaginationMetadata(totalItemCount, resourceParameters.PageSize, resourceParameters.PageNumber);

            return (publicationDtos, paginationMetadata);
        }

        private async Task<FilterDefinition<Publication>> CreateFilterExpression(PublicationsResourceParameters resourceParameters, Guid userId)
        {
            var builder = Builders<Publication>.Filter;
            var filter = builder.Empty;

            if (resourceParameters.PublicationState is not null)
            {
                var state = _mapper.Map<State>(resourceParameters.PublicationState);
                filter = builder.Eq(pub => pub.State, state);
            }

            if (resourceParameters.PublicationType is not null)
            {
                var type = _mapper.Map<DataAccess.Entities.PublicationEnums.Type>(resourceParameters.PublicationType);
                filter &= builder.Eq(pub => pub.Type, type);
            }

            if (resourceParameters.OnlyUserPublications)
                filter &= builder.Eq(pub => pub.Author.Id, userId);

            if (!String.IsNullOrEmpty(resourceParameters.SubjectCategoryId))
                filter &= builder.Eq(pub => pub.SubjectCategoryId, resourceParameters.SubjectCategoryId);

            if (resourceParameters.FromDate is not null)
                filter &= builder.Gte(pub => pub.IncidentDate, resourceParameters.FromDate);

            if (resourceParameters.ToDate is not null)
                filter &= builder.Lte(pub => pub.IncidentDate, resourceParameters.ToDate);

            if (!String.IsNullOrEmpty(resourceParameters.SearchQuery))
                filter &= (builder.Regex(pub => pub.Description, new BsonRegularExpression($"/{resourceParameters.SearchQuery}/")) |
                    builder.Regex(pub => pub.Title, new BsonRegularExpression($"/{resourceParameters.SearchQuery}/")));

            if (!String.IsNullOrEmpty(resourceParameters.IncidentAddress))
            {
                var decodedAddress = await _geocodingService.GeocodeAddress(resourceParameters.IncidentAddress);
                if (decodedAddress is not null && decodedAddress.Latitude != 0d && decodedAddress.Longitude != 0d)
                {
                    var boundaries = new CoordinateBoundaries(
                        decodedAddress.Latitude, 
                        decodedAddress.Longitude, 
                        resourceParameters.SearchRadius,
                        DistanceUnit.Kilometers);

                    filter &= (builder.Gte(p => p.Latitude, boundaries.MinLatitude)
                        & builder.Gte(p => p.Longitude, boundaries.MinLongitude)
                        & builder.Lte(p => p.Latitude, boundaries.MaxLatitude)
                        & builder.Lte(p => p.Longitude, boundaries.MaxLatitude));
                }
            }

            return filter;
        }

        public async Task<PublicationDetailsResponseDto> UpdatePublicationState(string rawUserId,
            Guid publicationId, UpdatePublicationStateRequestDto publicationStateDto)
        {
            var userId = ParseUserId(rawUserId);
            var publicationEntity = await GetUserPublication(userId, publicationId);

            publicationEntity.State = _mapper.Map<State>(publicationStateDto.PublicationState);
            publicationEntity.LastModificationDate = _dateTimeProvider.UtcNow;
            await _publicationsRepository.UpdatePublicationState(publicationEntity!);

            return await GetPublicationDetails(publicationId, userId);
        }

        public async Task<PublicationDetailsResponseDto> UpdatePublicationRating(string rawUserId, Guid publicationId,
            UpdatePublicationRatingRequestDto publicationRatingDto)
        {
            var userId = ParseUserId(rawUserId);
            var publicationEntity = await GetUserPublication(userId, publicationId);

            var userVote = publicationEntity.Votes.FirstOrDefault(x => x.VoterId == userId);
            if (userVote != null)
            {
                if (publicationRatingDto.NewPublicationVote == SinglePublicationVote.NoVote)
                {
                    await _publicationsRepository.DeletePublicationVote(publicationId, userVote);
                }
                else
                {
                    _mapper.Map(publicationRatingDto.NewPublicationVote, userVote);
                    await _publicationsRepository.UpdatePublicationVote(publicationId, userVote);
                }
            }
            else
            {
                var voteEntity = _mapper.Map<Vote>(publicationRatingDto.NewPublicationVote);
                if (voteEntity is null)
                {
                    throw new BadRequestException("The vote data is incorrect.");
                }
                voteEntity.CreationDate = _dateTimeProvider.UtcNow;
                voteEntity.VoterId = userId;

                await _publicationsRepository.InsertNewPublicationVote(publicationId, voteEntity);
            }

            return await GetPublicationDetails(publicationId, userId);
        }

        public async Task<PublicationDetailsResponseDto> GetPublicationDetails(string rawUserId, Guid publicationId)
        {
            var userId = ParseUserId(rawUserId);

            return await GetPublicationDetails(publicationId, userId);
        }

        private async Task<PublicationDetailsResponseDto> GetPublicationDetails(Guid publicationId, Guid userId)
        {
            var publicationEntity = await _publicationsRepository.GetSingleAsync(x => x.ExposedId == publicationId);
            if (publicationEntity == null)
            {
                throw new NotFoundException("Publication not found.");
            }
            var userVote = publicationEntity.Votes.FirstOrDefault(x => x.VoterId == userId);

            var publicationDetailsDto = _mapper.Map<PublicationDetailsResponseDto>(publicationEntity);
            publicationDetailsDto.UserVote = userVote is null ?
                SinglePublicationVote.NoVote : _mapper.Map<SinglePublicationVote>(userVote.Rating);

            return publicationDetailsDto;
        }

        private static FileDto CreateFileDto(IFormFile photo)
        {
            var fileDto = new FileDto()
            {
                Content = photo.OpenReadStream(),
                Name = photo.FileName,
                ContentType = photo.ContentType,
            };
            if (fileDto == null || fileDto.Content.Length == 0)
            {
                throw new BadRequestException("The profile picture is incorrect");
            }

            return fileDto;
        }

        private async Task DeletePublicationPhotoFromBlob(string? photoUrl)
        {
            var blobName = Path.GetFileName(photoUrl);
            if (blobName == null)
            {
                throw new NotFoundException("Publication photo not found.");
            }

            await _fileStorageService.DeleteAsync(blobName);
        }

        private async Task<Publication> GetUserPublication(Guid userId, Guid publicationId)
        {
            var publicationEntity = await _publicationsRepository.GetSingleAsync(x => x.ExposedId == publicationId);
            if (publicationEntity == null)
            {
                throw new NotFoundException("Publication not found.");
            }

            if (publicationEntity.Author.Id != userId)
            {
                throw new UnauthorizedException();
            }

            return publicationEntity;
        }

        private static Guid ParseUserId(string rawUserId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            return userId;
        }
    }
}
