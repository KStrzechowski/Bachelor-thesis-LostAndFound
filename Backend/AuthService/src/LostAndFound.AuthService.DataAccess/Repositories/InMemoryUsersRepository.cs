using LostAndFound.AuthService.DataAccess.Entities;

namespace LostAndFound.AuthService.DataAccess.Repositories
{
    public class InMemoryUsersRepository : IUsersRepository
    {
        private readonly IList<User> _users;

        public InMemoryUsersRepository()
        {
            _users = new List<User>();
        }

        public async Task<User> AddUserAsync(User newUser)
        {
            newUser.Id = Guid.NewGuid();
            _users.Add(newUser);

            return await Task.FromResult(newUser);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await Task.FromResult(_users.FirstOrDefault(u => u.Email == email));
        }

        public async Task<User?> GetUserByIdAsync(Guid userId)
        {
            return await Task.FromResult(_users.FirstOrDefault(u => u.Id == userId));
        }

        public bool IsEmailInUse(string email)
        {
            return _users.Any(u => u.Email == email);
        }

        public bool IsUsernameInUse(string username)
        {
            return _users.Any(u => u.Username == username);
        }
    }
}
