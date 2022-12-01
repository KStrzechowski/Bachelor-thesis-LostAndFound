using LostAndFound.PublicationService.DataAccess.Context.Interfaces;
using LostAndFound.PublicationService.DataAccess.Entities;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;
using MongoDB.Driver;

namespace LostAndFound.PublicationService.DataAccess.Repositories
{
    public class CategoriesRepository : BaseRepository<Category>, ICategoriesRepository
    {
        public CategoriesRepository(IMongoPublicationServiceDbContext publicationServiceDbContext) : base(publicationServiceDbContext) { }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            var categories = await _collection.FindAsync(Builders<Category>.Filter.Empty);

            return categories.ToList();
        }
    }
}
