using LostAndFound.AuthService.DataAccess.Entities;

namespace LostAndFound.AuthService.DataAccess.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task Create(RefreshToken refreshToken);
        Task<RefreshToken?> GetByToken(string token);
        Task DeleteAll(Guid userId);
        Task Delete(Guid id);
    }
}
