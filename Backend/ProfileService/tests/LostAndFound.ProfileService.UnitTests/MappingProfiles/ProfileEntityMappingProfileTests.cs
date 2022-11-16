using AutoMapper;
using LostAndFound.ProfileService.Core.MappingProfiles;
using Xunit;

namespace LostAndFound.ProfileService.UnitTests.MappingProfiles
{
    public class ProfileEntityMappingProfileTests
    {
        [Fact]
        public void ValidateProductsProfileMappingIsValid()
        {
            MapperConfiguration mapperConfig = new(
                cfg =>
                {
                    cfg.AddProfile(new ProfileEntityMappingProfile());
                });

            IMapper mapper = new Mapper(mapperConfig);

            mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
