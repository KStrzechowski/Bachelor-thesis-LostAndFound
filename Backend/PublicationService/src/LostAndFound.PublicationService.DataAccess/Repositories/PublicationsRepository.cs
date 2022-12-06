using LostAndFound.PublicationService.DataAccess.Context.Interfaces;
using LostAndFound.PublicationService.DataAccess.Entities;
using LostAndFound.PublicationService.DataAccess.Entities.PublicationEnums;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;
using MongoDB.Driver;

namespace LostAndFound.PublicationService.DataAccess.Repositories
{
    public class PublicationsRepository : BaseRepository<Publication>, IPublicationsRepository
    {
        public PublicationsRepository(IMongoPublicationServiceDbContext publicationServiceDbContext) : base(publicationServiceDbContext) { }


        public async Task DeletePublicationVote(Guid publicationId, Vote voteEntity)
        {
            var filter = Builders<Publication>.Filter
                .Eq(publication => publication.ExposedId, publicationId);
            var update = Builders<Publication>.Update
                .Pull(publication => publication.Votes, voteEntity);

            await _collection.UpdateOneAsync(filter, update);

            await UpdatePublicationAggregateRating(publicationId);
        }

        public async Task InsertNewPublicationVote(Guid publicationId, Vote voteEntity)
        {
            var filter = Builders<Publication>.Filter
                .Eq(publication => publication.ExposedId, publicationId);
            var update = Builders<Publication>.Update
                .Push(publication => publication.Votes, voteEntity);

            await _collection.UpdateOneAsync(filter, update);

            await UpdatePublicationAggregateRating(publicationId);
        }

        public async Task UpdatePublicationPhotoUrl(Guid publicationId, string? photoUrl)
        {
            var filter = Builders<Publication>.Filter
                .Eq(publication => publication.ExposedId, publicationId);
            var update = Builders<Publication>.Update
                .Set(publication => publication.SubjectPhotoUrl, photoUrl);

            await _collection.UpdateOneAsync(filter, update);
        }

        public async Task UpdatePublicationState(Guid publicationId, State state)
        {
            var filter = Builders<Publication>.Filter
                .Eq(publication => publication.ExposedId, publicationId);
            var update = Builders<Publication>.Update
                .Set(publication => publication.State, state);

            await _collection.UpdateOneAsync(filter, update);
        }

        public async Task UpdatePublicationVote(Guid publicationId, Vote voteEntity)
        {
            var filter = Builders<Publication>.Filter.Eq(publication => publication.ExposedId, publicationId)
                & Builders<Publication>.Filter.ElemMatch(p => p.Votes, Builders<Vote>.Filter.Eq(x => x.VoterId, voteEntity.VoterId));

            var update = Builders<Publication>.Update
                .Set(publication => publication.Votes[-1], voteEntity);

            await _collection.UpdateOneAsync(filter, update);

            await UpdatePublicationAggregateRating(publicationId);
        }

        public async Task<IEnumerable<Publication>> UseFilterDefinition(FilterDefinition<Publication> filterExpression)
        {
            var publications = (await _collection.FindAsync(filterExpression))
                ?.ToEnumerable<Publication>();

            return publications ?? Enumerable.Empty<Publication>();
        }

        private async Task UpdatePublicationAggregateRating(Guid publicationId)
        {
            var publicationEntity = await base
                .GetSingleAsync(publication => publication.ExposedId == publicationId);
            var newAggregateRating = publicationEntity.Votes.Any() ?
                publicationEntity.Votes.Sum(x => x.Rating) : 0;

            var filter = Builders<Publication>.Filter
                .Eq(publication => publication.ExposedId, publicationId);
            var update = Builders<Publication>.Update
                .Set(publication => publication.AggregateRating, newAggregateRating);

            await _collection.UpdateOneAsync(filter, update);
        }
    }
}
