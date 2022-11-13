using LostAndFound.AuthService.DataAccess;
using LostAndFound.AuthService.DataAccess.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using Xunit;

namespace LostAndFound.AuthService.UnitTests.ServiceRegistration
{
    public class AuthServiceDataAccessRegistrationTests
    {
        private readonly IConfiguration _configuration;
        private readonly ServiceCollection _services;

        public AuthServiceDataAccessRegistrationTests()
        {
            var myConfiguration = new Dictionary<string, string>
            {
                {
                    "LostAndFoundAuthServiceDb:ConnectionString",
                    "mongodb://localhost:27017"
                },
                {
                    "LostAndFoundAuthServiceDb:DatabaseName",
                    "test-name-db"
                },
            };

            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(myConfiguration)
                .Build();
            _services = new ServiceCollection();
        }

        [Theory]
        [InlineData(typeof(IAccountsRepository))]
        public void AddApplicationDataAccessServices_Execute_RepositoriesAreRegistered(Type type)
        {
            _services.AddDataAccessServices(_configuration);
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(type));
        }
    }
}
