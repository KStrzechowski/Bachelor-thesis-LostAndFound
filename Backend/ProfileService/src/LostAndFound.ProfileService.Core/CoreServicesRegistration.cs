using LostAndFound.ProfileService.Core.UserProfileServices;
using LostAndFound.ProfileService.Core.UserProfileServices.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace LostAndFound.AuthService.Core
{
    public static class CoreServicesRegistration
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IUserProfileService, UserProfileService>();

            return services;
        }
    }
}
