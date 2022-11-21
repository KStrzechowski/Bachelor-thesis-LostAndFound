using AutoMapper;
using LostAndFound.ProfileService.Core.DateTimeProviders;
using LostAndFound.ProfileService.Core.UserProfileServices.Interfaces;
using LostAndFound.ProfileService.CoreLibrary.Exceptions;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;
using LostAndFound.ProfileService.DataAccess.Repositories.Interfaces;
using LostAndFound.ProfileService.ThirdPartyServices.AzureServices.Interfaces;
using LostAndFound.ProfileService.ThirdPartyServices.Models;
using Microsoft.AspNetCore.Http;
using Profile = LostAndFound.ProfileService.DataAccess.Entities.Profile;

namespace LostAndFound.ProfileService.Core.UserProfileServices
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IProfilesRepository _profilesRepository;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public UserProfileService(IProfilesRepository profilesRepository, IDateTimeProvider dateTimeProvider, IMapper mapper, IFileStorageService fileStorageService)
        {
            _profilesRepository = profilesRepository ?? throw new ArgumentNullException(nameof(profilesRepository));
            _dateTimeProvider = dateTimeProvider ?? throw new ArgumentNullException(nameof(dateTimeProvider));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _fileStorageService = fileStorageService ?? throw new ArgumentNullException(nameof(fileStorageService));
        }


        public async Task<ProfileDetailsResponseDto> CreateUserProfile(CreateProfileRequestDto createProfileRequestDto)
        {
            var newProfileEntity = _mapper.Map<Profile>(createProfileRequestDto);
            if (newProfileEntity == null)
            {
                throw new BadRequestException("The profile information is incorrect.");
            }
            newProfileEntity.CreationTime = _dateTimeProvider.UtcNow;

            await _profilesRepository.InsertOneAsync(newProfileEntity);

            return await GetUserProfileDetails(createProfileRequestDto.UserId);
        }

        public async Task<ProfileDetailsResponseDto> GetUserProfileDetails(string rawUserId)
        {
            var userId = ParseUserId(rawUserId);

            return await GetUserProfileDetails(userId);
        }

        public async Task<ProfileDetailsResponseDto> UpdateProfileDetails(UpdateProfileDetailsRequestDto updateProfileDetailsRequestDto, string rawUserId)
        {
            var userId = ParseUserId(rawUserId);
            var profileEntity = await GetUserProfile(userId);

            _mapper.Map(updateProfileDetailsRequestDto, profileEntity);

            await _profilesRepository.ReplaceOneAsync(profileEntity);

            return await GetUserProfileDetails(userId);
        }

        public async Task<ProfileDetailsResponseDto> UpdateUserProfilePicture(IFormFile picture, string rawUserId)
        {
            var userId = ParseUserId(rawUserId);
            _ = await GetUserProfile(userId);

            var fileDto = new FileDto()
            {
                Content = picture.OpenReadStream(),
                Name = picture.FileName,
                ContentType = picture.ContentType,
            };
            if (fileDto == null || fileDto.Content.Length == 0)
            {
                throw new BadRequestException("The profile picture is incorrect");
            }

            var pictureUrl = await _fileStorageService.UploadAsync(fileDto);
            await _profilesRepository.UpdateProfilePictureUrl(userId, pictureUrl);

            return await GetUserProfileDetails(userId);
        }

        public async Task DeleteUserProfilePicture(string rawUserId)
        {
            var userId = ParseUserId(rawUserId);
            var profileEntity = await GetUserProfile(userId);

            var blobName = Path.GetFileName(profileEntity.PictureUrl);
            if (blobName == null)
            {
                throw new NotFoundException("User profile picture not found.");
            }

            await _fileStorageService.DeleteAsync(blobName);
            await _profilesRepository.UpdateProfilePictureUrl(userId, null);
        }

        private async Task<Profile> GetUserProfile(Guid profileOwnerId)
        {
            var profileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == profileOwnerId);
            if (profileEntity == null)
            {
                throw new NotFoundException("User profile not found.");
            }

            return profileEntity;
        }

        private async Task<ProfileDetailsResponseDto> GetUserProfileDetails(Guid userId)
        {
            var userProfileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == userId);
            if (userProfileEntity == null)
            {
                throw new NotFoundException("User profile not found.");
            }

            return _mapper.Map<ProfileDetailsResponseDto>(userProfileEntity);
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
