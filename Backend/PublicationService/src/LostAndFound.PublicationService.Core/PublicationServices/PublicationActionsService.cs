using AutoMapper;
using LostAndFound.PublicationService.Core.DateTimeProviders;
using LostAndFound.PublicationService.Core.PublicationServices.Interfaces;
using LostAndFound.PublicationService.CoreLibrary.Responses;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices.Interfaces;
using Microsoft.AspNetCore.Http;

namespace LostAndFound.PublicationService.Core.PublicationServices
{
    public class PublicationActionsService : IPublicationActionsService
    {
        private readonly IPublicationsRepository _publicationsRepository;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private readonly IGeocodingService _geocodingService;

        public PublicationActionsService(IPublicationsRepository publicationsRepository, IDateTimeProvider dateTimeProvider, 
            IMapper mapper, IFileStorageService fileStorageService, IGeocodingService geocodingService)
        {
            _publicationsRepository = publicationsRepository ?? throw new ArgumentNullException(nameof(publicationsRepository));
            _dateTimeProvider = dateTimeProvider ?? throw new ArgumentNullException(nameof(dateTimeProvider));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _fileStorageService = fileStorageService ?? throw new ArgumentNullException(nameof(fileStorageService));
            _geocodingService = geocodingService ?? throw new ArgumentNullException(nameof(geocodingService));
        }

        public Task DeletePublicationPhoto(string rawUserId)
        {
            throw new NotImplementedException();
        }

        public Task<PublicationDetailsResponseDto> UpdatePublicationPhoto(IFormFile photo, string rawUserId)
        {
            throw new NotImplementedException();
        }
    }
}
