﻿using LostAndFound.PublicationService.DataAccess.Attributes;
using LostAndFound.PublicationService.DataAccess.Context.Interfaces;
using LostAndFound.PublicationService.DataAccess.Entities.Interfaces;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace LostAndFound.PublicationService.DataAccess.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : IDocument
    {
        protected readonly IMongoCollection<T> _collection;
        protected readonly IMongoPublicationServiceDbContext _context;

        public BaseRepository(IMongoPublicationServiceDbContext publicationServiceDbContext)
        {
            _context = publicationServiceDbContext ?? throw new ArgumentNullException(nameof(publicationServiceDbContext));
            _collection = publicationServiceDbContext.GetCollection<T>(GetCollectionName());
        }

        private static string GetCollectionName()
        {
            return (typeof(T).GetCustomAttributes(typeof(BsonCollectionAttribute), true).FirstOrDefault()
                as BsonCollectionAttribute)!.CollectionName;
        }

        public async Task<(long, IReadOnlyList<T>)> AggregateByPage(FilterDefinition<T> filterDefinition, SortDefinition<T> sortDefinition, int pageNumber, int pageSize)
        {
            var countFacet = AggregateFacet.Create("count",
                PipelineDefinition<T, AggregateCountResult>.Create(new[]
                {
                    PipelineStageDefinitionBuilder.Count<T>()
                }));

            var dataFacet = AggregateFacet.Create("data",
                PipelineDefinition<T, T>.Create(new[]
                {
                    PipelineStageDefinitionBuilder.Sort(sortDefinition),
                    PipelineStageDefinitionBuilder.Skip<T>((pageNumber - 1) * pageSize),
                    PipelineStageDefinitionBuilder.Limit<T>(pageSize),
                }));

            var aggregation = await _collection.Aggregate()
                .Match(filterDefinition)
                .Facet(countFacet, dataFacet)
                .ToListAsync();

            var totalCount = aggregation.First()
                .Facets.First(x => x.Name == "count")
                .Output<AggregateCountResult>()
                ?.FirstOrDefault()
                ?.Count;

            var data = aggregation.First()
                .Facets.First(x => x.Name == "data")
                .Output<T>();

            return (totalCount ?? 0, data);
        }

        public virtual IQueryable<T> AsQueryable()
        {
            return _collection.AsQueryable();
        }

        public virtual async Task DeleteManyAsync(Expression<Func<T, bool>> filterExpression)
        {
            await _collection.DeleteManyAsync(filterExpression);
        }

        public virtual async Task DeleteOneAsync(Expression<Func<T, bool>> filterExpression)
        {
            await _collection.FindOneAndDeleteAsync(filterExpression);
        }

        public virtual async Task<IEnumerable<T>> FilterByAsync(Expression<Func<T, bool>> filterExpression)
        {
            return (await _collection.FindAsync(filterExpression)).ToEnumerable();
        }

        public virtual async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate)
        {
            return await _collection.Find(predicate).FirstOrDefaultAsync();
        }

        public virtual async Task InsertManyAsync(ICollection<T> documents)
        {
            await _collection.InsertManyAsync(documents);
        }

        public virtual async Task InsertOneAsync(T document)
        {
            await _collection.InsertOneAsync(document);
        }

        public virtual async Task ReplaceOneAsync(T document)
        {
            var filter = Builders<T>.Filter.Eq(doc => doc.Id, document.Id);
            await _collection.FindOneAndReplaceAsync(filter, document);
        }
    }
}
