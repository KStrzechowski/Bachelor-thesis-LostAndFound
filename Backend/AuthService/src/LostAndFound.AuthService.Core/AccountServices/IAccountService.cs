using LostAndFound.AuthService.CoreLibrary.Requests;
using LostAndFound.AuthService.CoreLibrary.Responses;

namespace LostAndFound.AuthService.Core.AccountServices
{
    public interface IAccountService
    {
        Task RegisterUser(RegisterUserRequestDto dto);
        Task<AuthenticatedUserDto> AuthenticateUser(LoginRequestDto dto);
        Task<AuthenticatedUserDto> RefreshUserAuthentication(RefreshRequestDto dto);
        Task LogoutUser(string userId);
    }
}
