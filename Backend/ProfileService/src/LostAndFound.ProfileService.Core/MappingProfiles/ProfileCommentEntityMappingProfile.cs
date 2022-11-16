using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.DataAccess.Entities;

namespace LostAndFound.ProfileService.Core.MappingProfiles
{
    public class ProfileCommentEntityMappingProfile : AutoMapper.Profile
    {
        public ProfileCommentEntityMappingProfile()
        {
            CreateMap<CreateProfileCommentRequestDto, Comment>()
                .ForMember(entity => entity.Content, opt => opt.MapFrom(dto => dto.Content))
                .ForMember(entity => entity.Rating, opt => opt.MapFrom(dto => dto.ProfileRating))
                .ForMember(entity => entity.AuthorId, opt => opt.Ignore())
                .ForMember(entity => entity.CreationTime, opt => opt.Ignore())
                .ForMember(entity => entity.LastModificationDate, opt => opt.Ignore());

            CreateMap<UpdateProfileCommentRequestDto, Comment>()
                .ForMember(entity => entity.Content, opt => opt.MapFrom(dto => dto.Content))
                .ForMember(entity => entity.Rating, opt => opt.MapFrom(dto => dto.ProfileRating))
                .ForMember(entity => entity.AuthorId, opt => opt.Ignore())
                .ForMember(entity => entity.CreationTime, opt => opt.Ignore())
                .ForMember(entity => entity.LastModificationDate, opt => opt.Ignore());
        }
    }
}
