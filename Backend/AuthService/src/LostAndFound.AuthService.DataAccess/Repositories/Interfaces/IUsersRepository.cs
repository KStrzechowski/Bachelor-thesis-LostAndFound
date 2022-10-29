using LostAndFound.AuthService.DataAccess.Entities;

namespace LostAndFound.AuthService.DataAccess.Repositories
{
    public interface IUsersRepository
    {
        Task<User> AddUserAsync(User newUser);
        Task<User?> GetUserByEmailAsync(string email);
        bool IsEmailInUse(string email);
        Task<User?> GetUserByIdAsync(Guid userId);
        bool IsUsernameInUse(string value);
    }
}
