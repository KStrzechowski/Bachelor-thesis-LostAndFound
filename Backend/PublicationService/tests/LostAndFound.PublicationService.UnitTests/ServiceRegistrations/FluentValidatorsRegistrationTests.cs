using FluentAssertions;
using LostAndFound.PublicationService.Core.FluentValidators;
using Microsoft.Extensions.DependencyInjection;
using System;
using Xunit;

namespace LostAndFound.PublicationService.UnitTests.ServiceRegistrations
{
    public class FluentValidatorsRegistrationTests
    {
        private readonly ServiceCollection _services;

        public FluentValidatorsRegistrationTests()
        {
            _services = new ServiceCollection();
        }

        [Theory]
        [InlineData(typeof(CreatePublicationRequestDtoValidator))]
        [InlineData(typeof(UpdatePublicationDetailsRequestDtoValidator))]
        [InlineData(typeof(UpdatePublicationRatingRequestDtoValidator))]
        [InlineData(typeof(UpdatePublicationStateRequestDtoValidator))]
        public void AddFluentValidators_Execute_ResultsInExpectedValidatorIsRegistered(Type type)
        {
            _services.AddFluentValidators();
            var serviceProvider = _services.BuildServiceProvider();

            serviceProvider.GetService(type).Should().NotBeNull();
        }
    }
}
