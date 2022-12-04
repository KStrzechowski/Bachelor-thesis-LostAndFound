using LostAndFound.PublicationService.CoreLibrary.Requests;
using LostAndFound.PublicationService.CoreLibrary.Responses;
using Microsoft.AspNetCore.Http;

namespace LostAndFound.PublicationService.Core.PublicationServices.Interfaces
{
    public interface IPublicationActionsService
    {
        Task DeletePublicationPhoto(string rawUserId, Guid publicationId);
        Task<PublicationDetailsResponseDto> UpdatePublicationPhoto(IFormFile photo, string rawUserId, Guid publicationId);
        Task<PublicationDetailsResponseDto> CreatePublication(string rawUserId, string username, 
            CreatePublicationRequestDto publicationData, IFormFile subjectPhoto);
        Task<PublicationDetailsResponseDto> GetPublicationDetails(string rawUserId, Guid publicationId);
        Task<PublicationDetailsResponseDto> UpdatePublicationDetails(string rawUserId, Guid publicationId, 
            UpdatePublicationDetailsRequestDto publicationDetailsDto);
        Task DeletePublication(string rawUserId, Guid publicationId);
    }
}
