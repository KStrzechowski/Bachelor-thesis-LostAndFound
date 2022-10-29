using LostAndFound.AuthService.DataAccess.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LostAndFound.AuthService.DataAccess
{
    public static class AuthServiceDataAccessRegistration
    {
        public static IServiceCollection AddDataAccessServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IUsersRepository, InMemoryUsersRepository>();
            services.AddSingleton<IRefreshTokenRepository, InMemoryRefreshTokenRepository>();

            return services;
        }
    }
}
