using AutoMapper;
using LostAndFound.PublicationService.Core.MappingProfiles;
using Xunit;

namespace LostAndFound.PublicationService.UnitTests.Core.MappingProfiles
{
    public class PublicationStateEntityMappingProfileTests
    {
        [Fact]
        public void ValidateProfileCommentEntityMappingProfileIsValid()
        {
            MapperConfiguration mapperConfig = new(
                cfg =>
                {
                    cfg.AddProfile(new PublicationStateEntityMappingProfile());
                });

            IMapper mapper = new Mapper(mapperConfig);

            mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
