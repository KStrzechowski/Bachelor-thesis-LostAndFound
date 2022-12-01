﻿using LostAndFound.PublicationService.Core.CategoryServices;
using LostAndFound.PublicationService.Core.CategoryServices.Interfaces;
using LostAndFound.PublicationService.Core.DateTimeProviders;
using LostAndFound.PublicationService.Core.PublicationServices;
using LostAndFound.PublicationService.Core.PublicationServices.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace LostAndFound.PublicationService.Core
{
    public static class CoreServicesRegistration
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IPublicationActionsService, PublicationActionsService>();
            services.AddScoped<IDateTimeProvider, DateTimeProvider>();

            return services;
        }
    }
}