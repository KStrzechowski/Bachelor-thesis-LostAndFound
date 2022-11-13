using MongoDB.Driver;

namespace LostAndFound.AuthService.DataAccess.Context.Interfaces
{
    public interface IMongoAuthServiceDbContext
    {
        IMongoCollection<Account> GetCollection<Account>(string name);
    }
}
