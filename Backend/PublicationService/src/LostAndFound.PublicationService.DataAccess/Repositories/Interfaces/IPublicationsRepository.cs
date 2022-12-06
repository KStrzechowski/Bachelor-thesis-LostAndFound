using LostAndFound.PublicationService.DataAccess.Entities;
using LostAndFound.PublicationService.DataAccess.Entities.PublicationEnums;

namespace LostAndFound.PublicationService.DataAccess.Repositories.Interfaces
{
    public interface IPublicationsRepository : IRepository<Publication>
    {
        Task UpdatePublicationPhotoUrl(Guid publicationId, string? photoUrl);
        Task UpdatePublicationState(Guid publicationId, State state);
        Task DeletePublicationVote(Guid publicationId, Vote voteEntity);
        Task UpdatePublicationVote(Guid publicationId, Vote voteEntity);
        Task InsertNewPublicationVote(Guid publicationId, Vote voteEntity);
    }
}
