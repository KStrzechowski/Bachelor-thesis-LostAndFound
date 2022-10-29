using LostAndFound.AuthService.DataAccess;
using LostAndFound.AuthService.DataAccess.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Xunit;

namespace LostAndFound.AuthService.UnitTests.ServiceRegistration
{
    public class AuthServiceDataAccessRegistrationTests
    {
        private readonly IConfiguration _configuration;
        private readonly ServiceCollection _services;

        public AuthServiceDataAccessRegistrationTests()
        {
            _configuration = new ConfigurationBuilder()
                .Build();
            _services = new ServiceCollection();
        }

        [Theory]
        [InlineData(typeof(IUsersRepository))]
        [InlineData(typeof(IRefreshTokenRepository))]
        public void AddApplicationDataAccessServices_Execute_RepositoriesAreRegistered(Type type)
        {
            _services.AddDataAccessServices(_configuration);
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(type));
        }
    }
}
