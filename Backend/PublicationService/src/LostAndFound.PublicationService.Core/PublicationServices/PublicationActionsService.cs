using AutoMapper;
using LostAndFound.PublicationService.Core.DateTimeProviders;
using LostAndFound.PublicationService.Core.PublicationServices.Interfaces;
using LostAndFound.PublicationService.CoreLibrary.Exceptions;
using LostAndFound.PublicationService.CoreLibrary.Requests;
using LostAndFound.PublicationService.CoreLibrary.Responses;
using LostAndFound.PublicationService.DataAccess.Entities;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.Models;
using Microsoft.AspNetCore.Http;

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
            CreatePublicationRequestDto publicationDto, IFormFile subjectPhoto)
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
            // TODO: Add latitude calclulation

            if (subjectPhoto is not null && subjectPhoto.Length > 0)
            {
                FileDto fileDto = CreateFileDto(subjectPhoto);
                publicationEntity.SubjectPhotoUrl = await _fileStorageService.UploadAsync(fileDto);
            }

            await _publicationsRepository.InsertOneAsync(publicationEntity);

            return await GetPublicationDetails(publicationEntity.ExposedId);
        }

        public async Task DeletePublicationPhoto(string rawUserId, Guid publicationId)
        {
            var userId = ParseUserId(rawUserId);
            var publicationEntity = await GetUserPublication(userId, publicationId);

            await DeletePublicationPhotoFromBlob(publicationEntity.SubjectPhotoUrl);

            await _publicationsRepository.UpdatePublicationPhotoUrl(userId, null);
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

            var photoUrl = await _fileStorageService.UploadAsync(fileDto);
            await _publicationsRepository.UpdatePublicationPhotoUrl(publicationId, photoUrl);

            return await GetPublicationDetails(publicationId);
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

        private async Task<PublicationDetailsResponseDto> GetPublicationDetails(Guid publicationId)
        {
            var publicationEntity = await _publicationsRepository.GetSingleAsync(x => x.ExposedId == publicationId);
            if (publicationEntity == null)
            {
                throw new NotFoundException("Publication not found.");
            }

            return _mapper.Map<PublicationDetailsResponseDto>(publicationEntity);
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
