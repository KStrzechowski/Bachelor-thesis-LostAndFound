using LostAndFound.PublicationService.CoreLibrary.Responses;
using Microsoft.AspNetCore.Http;

namespace LostAndFound.PublicationService.Core.PublicationServices.Interfaces
{
    public interface IPublicationActionsService
    {
        Task DeletePublicationPhoto(string rawUserId, Guid publicationId);
        Task<PublicationDetailsResponseDto> UpdatePublicationPhoto(IFormFile photo, string rawUserId, Guid publicationId);
    }
}
