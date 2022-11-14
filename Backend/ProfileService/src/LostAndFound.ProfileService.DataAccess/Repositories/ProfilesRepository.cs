using LostAndFound.ProfileService.DataAccess.Context.Interfaces;
using LostAndFound.ProfileService.DataAccess.Entities;
using LostAndFound.ProfileService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.ProfileService.DataAccess.Repositories
{
    public class ProfilesRepository : BaseRepository<Profile>, IProfilesRepository
    {
        public ProfilesRepository(IMongoProfileServiceDbContext profileServiceDbContext) : base(profileServiceDbContext) { }
    }
}
