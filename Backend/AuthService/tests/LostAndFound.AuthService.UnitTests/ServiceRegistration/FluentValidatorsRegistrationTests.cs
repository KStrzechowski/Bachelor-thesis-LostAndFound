using LostAndFound.AuthService.Core.FluentValidators;
using LostAndFound.AuthService.DataAccess.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using Xunit;

namespace LostAndFound.AuthService.UnitTests.ServiceRegistration
{
    public class FluentValidatorsRegistrationTests
    {
        private readonly ServiceCollection _services;

        public FluentValidatorsRegistrationTests()
        {
            _services = new ServiceCollection();
        }

        [Theory]
        [InlineData(typeof(RegisterUserRequestDtoValidator))]
        [InlineData(typeof(LoginRequestDtoValidator))]
        [InlineData(typeof(RefreshRequestDtoValidator))]
        public void AddFluentValidators_Execute_ResultsInExpectedValidatorIsRegistered(Type type)
        {
            var mockedUsersRepository = new Mock<IUsersRepository>();
            _services.AddSingleton(mockedUsersRepository.Object);

            _services.AddFluentValidators();
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(type));
        }
    }
}
