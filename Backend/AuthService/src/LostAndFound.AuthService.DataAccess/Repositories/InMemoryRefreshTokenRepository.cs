using LostAndFound.AuthService.DataAccess.Entities;

namespace LostAndFound.AuthService.DataAccess.Repositories
{
    public class InMemoryRefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly List<RefreshToken> _refreshTokens;

        public InMemoryRefreshTokenRepository()
        {
            _refreshTokens = new List<RefreshToken>();
        }

        public async Task Create(RefreshToken refreshToken)
        {
            refreshToken.Id = Guid.NewGuid();

            _refreshTokens.Add(refreshToken);

            await Task.CompletedTask;
        }

        public async Task<RefreshToken?> GetByToken(string token)
        {
            var refreshToken = _refreshTokens.FirstOrDefault(r => r.Token == token);
            
            return await Task.FromResult(refreshToken);
        }

        public async Task Delete(Guid id)
        {
            _refreshTokens.RemoveAll(r => r.Id == id);

            await Task.CompletedTask;
        }

        public async Task DeleteAll(Guid userId)
        {
            _refreshTokens.RemoveAll(r => r.UserId == userId);

            await Task.CompletedTask;
        }
    }
}
