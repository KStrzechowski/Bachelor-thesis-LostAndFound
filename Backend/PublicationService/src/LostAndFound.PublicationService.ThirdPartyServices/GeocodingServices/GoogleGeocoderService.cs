using Geocoding.Google;
using LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.Models;

namespace LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices
{
    public class GoogleGeocoderService : IGeocodingService
    {
        private readonly GoogleGeocoder _googleGeocoder;

        public GoogleGeocoderService(GoogleGeocoder blobServiceClient)
        {
            _googleGeocoder = blobServiceClient ?? throw new ArgumentNullException(nameof(blobServiceClient));
        }

        public async Task<AddressDataDto?> GeocodeAddress(string address)
        {
            var addresses = await _googleGeocoder.GeocodeAsync(address);

            var geocodedCord = addresses.FirstOrDefault()?.Coordinates;
            if (geocodedCord != null)
            {
                return null;
            }

            return new AddressDataDto
            {
                Address = address,
                Latitude = geocodedCord!.Latitude,
                Longitude = geocodedCord.Longitude,
            };
        }
    }
}
