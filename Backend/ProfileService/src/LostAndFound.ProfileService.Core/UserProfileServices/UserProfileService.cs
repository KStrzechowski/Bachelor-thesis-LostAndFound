﻿using AutoMapper;
using LostAndFound.ProfileService.Core.DateTimeProviders;
using LostAndFound.ProfileService.Core.UserProfileServices.Interfaces;
using LostAndFound.ProfileService.CoreLibrary.Exceptions;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;
using LostAndFound.ProfileService.DataAccess.Repositories.Interfaces;
using Profile = LostAndFound.ProfileService.DataAccess.Entities.Profile;

namespace LostAndFound.ProfileService.Core.UserProfileServices
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IProfilesRepository _profilesRepository;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IMapper _mapper;

        public UserProfileService(IProfilesRepository profilesRepository, IDateTimeProvider dateTimeProvider, IMapper mapper)
        {
            _profilesRepository = profilesRepository ?? throw new ArgumentNullException(nameof(profilesRepository));
            _dateTimeProvider = dateTimeProvider ?? throw new ArgumentNullException(nameof(dateTimeProvider));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }


        public async Task<ProfileDetailsResponseDto> CreateUserProfile(CreateProfileRequestDto createProfileRequestDto)
        {
            var newProfileEntity = _mapper.Map<Profile>(createProfileRequestDto);
            newProfileEntity.CreationTime = _dateTimeProvider.UtcNow;

            if (newProfileEntity == null)
            {
                throw new BadRequestException("The profile information is incorrect.");
            }

            await _profilesRepository.InsertOneAsync(newProfileEntity);

            return await GetUserProfileDetails(createProfileRequestDto.UserId);
        }

        public async Task<ProfileDetailsResponseDto> GetUserProfileDetails(string rawUserId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            return await GetUserProfileDetails(userId);
        }

        public async Task<ProfileDetailsResponseDto> UpdateProfileDetails(UpdateProfileDetailsRequestDto updateProfileDetailsRequestDto, string rawUserId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            var profileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == userId);
            if (profileEntity == null)
            {
                throw new NotFoundException();
            }

            _mapper.Map(updateProfileDetailsRequestDto, profileEntity);
            await _profilesRepository.ReplaceOneAsync(profileEntity);

            return await GetUserProfileDetails(userId);
        }

        private async Task<ProfileDetailsResponseDto> GetUserProfileDetails(Guid userId)
        {
            var userProfileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == userId);
            if (userProfileEntity == null)
            {
                throw new NotFoundException();
            }

            return _mapper.Map<ProfileDetailsResponseDto>(userProfileEntity);
        }
    }
}