using LostAndFound.AuthService.Core.AccountServices;
using LostAndFound.AuthService.Core.DateTimeProviders;
using LostAndFound.AuthService.Core.HttpClients;
using LostAndFound.AuthService.Core.HttpClients.Interfaces;
using LostAndFound.AuthService.Core.PasswordHashers;
using LostAndFound.AuthService.Core.TokenGenerators;
using LostAndFound.AuthService.Core.TokenValidators;
using LostAndFound.AuthService.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LostAndFound.AuthService.Core
{
    public static class CoreServicesRegistration
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IPasswordHasher<Account>, BCryptPasswordHasher<Account>>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IDateTimeProvider, DateTimeProvider>();

            services.AddScoped<IAccessTokenGenerator, AccessTokenGenerator>();
            services.AddScoped<IRefreshTokenGenerator, RefreshTokenGenerator>();
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

            services.AddScoped<IRefreshTokenValidator, RefreshTokenValidator>();

            services.AddHttpClient<IProfileHttpClient, ProfileHttpClient>(c =>
            {
                c.BaseAddress = new Uri(configuration["ServiceUrls:Profile"]!);
            })
           .ConfigurePrimaryHttpMessageHandler(handler =>
               new HttpClientHandler()
               {
                   AutomaticDecompression = System.Net.DecompressionMethods.GZip
               });

            return services;
        }
    }
}
