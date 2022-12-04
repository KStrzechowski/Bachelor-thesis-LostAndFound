using LostAndFound.PublicationService.DataAccess.Entities;

namespace LostAndFound.PublicationService.DataAccess.Repositories.Interfaces
{
    public interface IPublicationsRepository : IRepository<Publication>
    {
        Task UpdatePublicationPhotoUrl(Guid publicationId, string? photoUrl);
    }
}
