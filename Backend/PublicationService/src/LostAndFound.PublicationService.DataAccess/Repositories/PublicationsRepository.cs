using LostAndFound.PublicationService.DataAccess.Context.Interfaces;
using LostAndFound.PublicationService.DataAccess.Entities;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.PublicationService.DataAccess.Repositories
{
    public class PublicationsRepository : BaseRepository<Publication>, IPublicationsRepository
    {
        public PublicationsRepository(IMongoPublicationServiceDbContext publicationServiceDbContext) : base(publicationServiceDbContext) { }
    }
}
