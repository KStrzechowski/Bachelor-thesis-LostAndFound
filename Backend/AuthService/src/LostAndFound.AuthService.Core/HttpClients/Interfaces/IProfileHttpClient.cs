using LostAndFound.AuthService.CoreLibrary.Responses;

namespace LostAndFound.AuthService.Core.HttpClients.Interfaces
{
    public interface IProfileHttpClient
    {
        Task CreateNewUserProfile(RegisteredUserAccountResponseDto registeredUserDto);
    }
}
