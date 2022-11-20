using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace LostAndFound.ProfileService.UnitTests.ServiceRegistrations
{
    public class ProfileServiceThirdPartyServicesRegistrationTests
    {
        private readonly IConfiguration _configuration;
        private readonly ServiceCollection _services;
        private readonly Dictionary<string, string> _testCustomConfiguration;

        public ProfileServiceThirdPartyServicesRegistrationTests()
        {
            _testCustomConfiguration = new Dictionary<string, string>
            {
                {
                    "LostAndFoundBlobStorageSettings:ConnectionString",
                    "mongodb://localhost:27017"
                }
            };
            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(_testCustomConfiguration)
                .Build();

            _services = new ServiceCollection();
        }
    }
}
