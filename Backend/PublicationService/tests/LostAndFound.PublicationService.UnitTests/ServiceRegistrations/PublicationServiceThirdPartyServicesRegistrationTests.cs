﻿using Azure.Storage.Blobs;
using FluentAssertions;
using Geocoding.Google;
using LostAndFound.PublicationService.ThirdPartyServices;
using LostAndFound.PublicationService.ThirdPartyServices.AzureServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.GeocodingServices.Interfaces;
using LostAndFound.PublicationService.ThirdPartyServices.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using Xunit;

namespace LostAndFound.PublicationService.UnitTests.ServiceRegistrations
{
    public class PublicationServiceThirdPartyServicesRegistrationTests
    {
        private readonly IConfiguration _configuration;
        private readonly ServiceCollection _services;
        private readonly Dictionary<string, string> _testCustomConfiguration;

        public PublicationServiceThirdPartyServicesRegistrationTests()
        {
            _testCustomConfiguration = new Dictionary<string, string>
            {
                {
                    "LostAndFoundBlobStorageSettings:ConnectionString",
                    "DefaultEndpointsProtocol=https;AccountName=lostandfoundstorageTest;AccountKey=i27BG+cowBxceqL7KVTktwCv656A0n6aIA6BjQeN03BEkvE5WrT5yL6T/Q5xkJzxGvzDNdYeIrdq+AStvgk5Nw==;EndpointSuffix=core.windows.net"
                },
                {
                    "LostAndFoundBlobStorageSettings:PublicationPicturesContainerName",
                    "publication-container"
                },
                {
                    "LostAndFoundGoogleGeocoderSettings:ApiKey",
                    "BCzaSyC3FfyxStTRB1L5SG6CQNGqlhJ1rE3gW4T"
                }
            };
            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(_testCustomConfiguration)
                .Build();

            _services = new ServiceCollection();
        }

        [Theory]
        [InlineData(typeof(IFileStorageService))]
        [InlineData(typeof(BlobServiceClient))]
        [InlineData(typeof(IGeocodingService), Skip = "For now skipped")]
        [InlineData(typeof(GoogleGeocoder), Skip = "For now skipped")]
        public void AddThirdPartyServices_Execute_ResultsInExpectedServiceIsRegistered(Type type)
        {
            _services.AddThirdPartyServices(_configuration);
            var serviceProvider = _services.BuildServiceProvider();

            serviceProvider.GetService(type).Should().NotBeNull();
        }

        [Fact]
        public void AddThirdPartyServices_Execute_BlobStorageSettingsAreConfiguredCorrectly()
        {
            _services.AddThirdPartyServices(_configuration);
            var serviceProvider = _services.BuildServiceProvider();

            var configuration = serviceProvider.GetService(typeof(BlobStorageSettings)) as BlobStorageSettings;

            configuration?.Should().NotBeNull();
            configuration!.ConnectionString.Should().Be(_testCustomConfiguration["LostAndFoundBlobStorageSettings:ConnectionString"]);
            configuration!.PublicationPicturesContainerName.Should().Be(_testCustomConfiguration["LostAndFoundBlobStorageSettings:PublicationPicturesContainerName"]);
        }

        [Fact(Skip = "For now skipped")]
        public void AddThirdPartyServices_Execute_GoogleGeocoderSettingsAreConfiguredCorrectly()
        {
            _services.AddThirdPartyServices(_configuration);
            var serviceProvider = _services.BuildServiceProvider();

            var configuration = serviceProvider.GetService(typeof(GoogleGeocoderSettings)) as GoogleGeocoderSettings;

            configuration?.Should().NotBeNull();
            configuration!.ApiKey.Should().Be(_testCustomConfiguration["LostAndFoundGoogleGeocoderSettings:ApiKey"]);
        }
    }
}
