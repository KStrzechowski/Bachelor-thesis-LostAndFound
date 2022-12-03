using LostAndFound.AuthService.Core;
using LostAndFound.AuthService.Core.AccountServices;
using LostAndFound.AuthService.Core.DateTimeProviders;
using LostAndFound.AuthService.Core.HttpClients.Interfaces;
using LostAndFound.AuthService.Core.TokenGenerators;
using LostAndFound.AuthService.Core.TokenValidators;
using LostAndFound.AuthService.CoreLibrary.Settings;
using LostAndFound.AuthService.DataAccess.Context.Interfaces;
using LostAndFound.AuthService.DataAccess.Entities;
using LostAndFound.AuthService.DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace LostAndFound.AuthService.UnitTests.ServiceRegistrations
{
    public class CoreServicesRegistrationTests
    {
        private readonly ServiceCollection _services;
        private readonly IConfiguration _configuration;

        public CoreServicesRegistrationTests()
        {
            var myConfiguration = new Dictionary<string, string>
            {
                {"ServiceUrls:Profile", "http://localhost:5300"}
            };

            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(myConfiguration)
                .Build();

            _services = new ServiceCollection();

            var mockedAuthenticationSettings = new Mock<AuthenticationSettings>();
            _services.AddSingleton(mockedAuthenticationSettings.Object);
        }

        [Theory]
        [InlineData(typeof(IJwtTokenGenerator))]
        [InlineData(typeof(IAccessTokenGenerator))]
        [InlineData(typeof(IRefreshTokenGenerator))]
        [InlineData(typeof(IRefreshTokenValidator))]
        [InlineData(typeof(IDateTimeProvider))]
        [InlineData(typeof(IPasswordHasher<Account>))]
        public void AddCoreServices_Execute_ResultsInExpectedServiceIsRegistered(Type type)
        {
            _services.AddCoreServices(_configuration);
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(type));
        }

        [Fact]
        public void AddCoreServices_Execute_ResultsInAccountServiceIsRegistered()
        {
            var mockedAccountssRepository = new Mock<IAccountsRepository>();
            _services.AddSingleton(mockedAccountssRepository.Object);
            var mockedMongoAuthServiceDbContext = new Mock<IMongoAuthServiceDbContext>();
            _services.AddSingleton(mockedMongoAuthServiceDbContext.Object);
            _services.AddCoreServices(_configuration);

            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(typeof(IAccountService)));
        }

        [Fact]
        public void AddCoreServices_Execute_ProfileHttpClientIsRegistered()
        {

            _services.AddCoreServices(_configuration);
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService<IProfileHttpClient>());
        }
    }
}
