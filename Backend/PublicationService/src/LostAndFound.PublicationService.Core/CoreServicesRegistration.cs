using LostAndFound.PublicationService.Core.DateTimeProviders;
using Microsoft.Extensions.DependencyInjection;

namespace LostAndFound.PublicationService.Core
{
    public static class CoreServicesRegistration
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddScoped<IDateTimeProvider, DateTimeProvider>();

            return services;
        }
    }
}
