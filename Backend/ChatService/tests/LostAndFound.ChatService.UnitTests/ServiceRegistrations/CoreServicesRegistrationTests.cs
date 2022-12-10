using LostAndFound.ChatService.Core;
using LostAndFound.ChatService.Core.ChatServices.Interfaces;
using LostAndFound.ChatService.Core.DateTimeProviders;
using LostAndFound.ChatService.Core.MessageServices.Interfaces;
using LostAndFound.ChatService.CoreLibrary.Settings;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using Xunit;

namespace LostAndFound.ChatService.UnitTests.ServiceRegistrations
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
        [InlineData(typeof(IDateTimeProvider))]
        public void AddCoreServices_Execute_ResultsInExpectedServiceIsRegistered(Type type)
        {
            _services.AddCoreServices();
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(type));
        }

        [Fact]
        public void AddCoreServices_Execute_ResultsInChatActionsServiceIsRegistered()
        {
            _services.AddCoreServices();
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(typeof(IChatActionService)));
        }

        [Fact]
        public void AddCoreServices_Execute_ResultsInMessageServiceIsRegistered()
        {
            _services.AddCoreServices();
            var serviceProvider = _services.BuildServiceProvider();

            Assert.NotNull(serviceProvider.GetService(typeof(IMessageService)));
        }
    }
}
