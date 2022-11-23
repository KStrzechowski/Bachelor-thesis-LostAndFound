using LostAndFound.ChatService.Core.DateTimeProviders;
using Microsoft.Extensions.DependencyInjection;

namespace LostAndFound.ChatService.Core
{
    public static class CoreServicesRegistration
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddScoped<IDateTimeProvider, DateTimeProvider>();

            return services;
        }
    }
}
