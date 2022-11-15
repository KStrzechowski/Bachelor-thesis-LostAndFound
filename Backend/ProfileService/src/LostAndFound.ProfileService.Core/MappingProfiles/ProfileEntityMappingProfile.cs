using AutoMapper;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;
using ProfileEntity = LostAndFound.ProfileService.DataAccess.Entities.Profile;

namespace LostAndFound.ProfileService.Core.MappingProfiles
{
    public class ProfileEntityMappingProfile : Profile
    {
        public ProfileEntityMappingProfile()
        {
            CreateMap<CreateProfileRequestDto, ProfileEntity>()
                .ForMember(entity => entity.UserId, opt => opt.MapFrom(dto => dto.UserId))
                .ForMember(entity => entity.Email, opt => opt.MapFrom(dto => dto.Email))
                .ForMember(entity => entity.Username, opt => opt.MapFrom(dto => dto.Username));

            CreateMap<ProfileEntity, ProfileDetailsResponseDto>()
                .ForMember(dto => dto.UserId, opt => opt.MapFrom(o => o.UserId))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(o => o.Email))
                .ForMember(dto => dto.Username, opt => opt.MapFrom(o => o.Username))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(o => o.Name))
                .ForMember(dto => dto.Surname, opt => opt.MapFrom(o => o.Surname))
                .ForMember(dto => dto.Description, opt => opt.MapFrom(o => o.Description))
                .ForMember(dto => dto.City, opt => opt.MapFrom(o => o.City))
                .ForMember(dto => dto.AverageProfileRating, opt => opt.MapFrom(o => o.AverageRating));

            CreateMap<UpdateProfileDetailsRequestDto, ProfileEntity>()
                .ForMember(entity => entity.Name, opt => opt.MapFrom(dto => dto.Name))
                .ForMember(entity => entity.Surname, opt => opt.MapFrom(dto => dto.Surname))
                .ForMember(entity => entity.City, opt => opt.MapFrom(dto => dto.City))
                .ForMember(entity => entity.Description, opt => opt.MapFrom(dto => dto.Description));
        }
    }
}
