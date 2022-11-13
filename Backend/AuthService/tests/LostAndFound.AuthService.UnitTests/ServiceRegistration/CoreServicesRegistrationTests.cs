using LostAndFound.AuthService.Core;
using LostAndFound.AuthService.Core.AccountServices;
using LostAndFound.AuthService.Core.DateTimeProviders;
using LostAndFound.AuthService.Core.TokenGenerators;
using LostAndFound.AuthService.Core.TokenValidators;
using LostAndFound.AuthService.CoreLibrary.Settings;
using LostAndFound.AuthService.DataAccess.Context.Interfaces;
using LostAndFound.AuthService.DataAccess.Entities;
using LostAndFound.AuthService.DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using Xunit;

namespace LostAndFound.AuthService.UnitTests.ServiceRegistration
{
    public class CoreServicesRegistrationTests
    {
        private readonly ServiceCollection _services;

        public CoreServicesRegistrationTests()
        {
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
            _services.AddCoreServices();
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
            _services.AddCoreServices();

            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(typeof(IAccountService)));
        }
    }
}
