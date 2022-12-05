using Azure.Storage.Blobs;
using Geocoding.Google;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices;
using LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LostAndFound.PublicationService.ThirdPartyServices
{
    public static class PublicationServiceThirdPartyServicesRegistration
    {
        public static IServiceCollection AddThirdPartyServices(this IServiceCollection services, IConfiguration configuration)
        {
            var blobStorageSettings = new BlobStorageSettings();
            configuration.Bind(BlobStorageSettings.SettingName, blobStorageSettings);
            services.AddSingleton(blobStorageSettings);

            services.AddSingleton(x =>
                new BlobServiceClient(blobStorageSettings.ConnectionString));

            // TODO: Restore geocoding
            //var googleGeocoderSettings = new GoogleGeocoderSettings();
            //configuration.Bind(GoogleGeocoderSettings.SettingName, googleGeocoderSettings);
            //services.AddSingleton(googleGeocoderSettings);

            //services.AddSingleton(x =>
            //    new GoogleGeocoder() { ApiKey = googleGeocoderSettings.ApiKey });

            //services.AddScoped<IGeocodingService, GoogleGeocoderService>();
            services.AddScoped<IFileStorageService, BlobStorageService>();

            return services;
        }
    }
}
