using AutoMapper;
using LostAndFound.PublicationService.Core.MappingProfiles;
using Xunit;

namespace LostAndFound.PublicationService.UnitTests.Core.MappingProfiles
{
    public class CategoryEntityMappingProfileTests
    {
        [Fact]
        public void ValidateProfileCommentEntityMappingProfileIsValid()
        {
            MapperConfiguration mapperConfig = new(
                cfg =>
                {
                    cfg.AddProfile(new CategoryEntityMappingProfile());
                });

            IMapper mapper = new Mapper(mapperConfig);

            mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
