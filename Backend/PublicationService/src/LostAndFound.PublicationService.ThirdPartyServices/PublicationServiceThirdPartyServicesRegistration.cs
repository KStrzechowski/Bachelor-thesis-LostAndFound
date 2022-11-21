using Azure.Storage.Blobs;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices.Interfaces;
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

            services.AddScoped<IFileStorageService, BlobStorageService>();

            return services;
        }
    }
}
