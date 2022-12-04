using LostAndFound.PublicationService.DataAccess.Context.Interfaces;
using LostAndFound.PublicationService.DataAccess.Entities;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;
using MongoDB.Driver;

namespace LostAndFound.PublicationService.DataAccess.Repositories
{
    public class PublicationsRepository : BaseRepository<Publication>, IPublicationsRepository
    {
        public PublicationsRepository(IMongoPublicationServiceDbContext publicationServiceDbContext) : base(publicationServiceDbContext) { }

        public async Task UpdatePublicationPhotoUrl(Guid publicationId, string? photoUrl)
        {
            var filter = Builders<Publication>.Filter.Eq(publication => publication.ExposedId, publicationId);
            var update = Builders<Publication>.Update.Set(publication => publication.SubjectPhotoUrl, photoUrl);

            await _collection.UpdateOneAsync(filter, update);
        }
    }
}
