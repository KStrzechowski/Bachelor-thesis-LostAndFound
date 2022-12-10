using AutoMapper;
using LostAndFound.ChatService.Core.MappingProfiles;
using Xunit;

namespace LostAndFound.ChatService.UnitTests.Core.MappingProfiles
{
    public class MessageEntityMappingProfileTests
    {
        [Fact]
        public void ValidateProfileCommentEntityMappingProfileIsValid()
        {
            MapperConfiguration mapperConfig = new(
                cfg =>
                {
                    cfg.AddProfile(new MessageEntityMappingProfile());
                });

            var mapper = new Mapper(mapperConfig);

            mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
