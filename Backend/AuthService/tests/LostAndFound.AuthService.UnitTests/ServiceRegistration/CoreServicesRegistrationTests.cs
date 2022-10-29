using LostAndFound.AuthService.Core;
using LostAndFound.AuthService.Core.AccountServices;
using LostAndFound.AuthService.Core.DateTimeProviders;
using LostAndFound.AuthService.Core.TokenGenerators;
using LostAndFound.AuthService.Core.TokenValidators;
using LostAndFound.AuthService.CoreLibrary.Settings;
using LostAndFound.AuthService.DataAccess.Entities;
using LostAndFound.AuthService.DataAccess.Repositories;
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
        [InlineData(typeof(IPasswordHasher<User>))]
        public void AddCoreServices_Execute_ResultsInExpectedServiceIsRegistered(Type type)
        {
            _services.AddCoreServices();
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(type));
        }

        [Fact]
        public void AddCoreServices_Execute_ResultsInAccountServiceIsRegistered()
        {
            var mockedUsersRepository = new Mock<IUsersRepository>();
            _services.AddSingleton(mockedUsersRepository.Object);
            var mockedRefreshTokenRepository = new Mock<IRefreshTokenRepository>();
            _services.AddSingleton(mockedRefreshTokenRepository.Object);
            _services.AddCoreServices();

            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(typeof(IAccountService)));
        }
    }
}
