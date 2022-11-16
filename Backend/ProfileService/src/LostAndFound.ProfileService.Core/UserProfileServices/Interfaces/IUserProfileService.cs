using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;

namespace LostAndFound.ProfileService.Core.UserProfileServices.Interfaces
{
    public interface IUserProfileService
    {
        Task<ProfileDetailsResponseDto> CreateUserProfile(CreateProfileRequestDto createProfileRequestDto);
        Task<ProfileDetailsResponseDto> GetUserProfileDetails(string rawUserId);
        Task<ProfileDetailsResponseDto> UpdateProfileDetails(UpdateProfileDetailsRequestDto updateProfileDetailsRequestDto, string rawUserId);
    }
}
