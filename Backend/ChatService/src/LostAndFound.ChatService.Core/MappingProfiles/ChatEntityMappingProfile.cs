using AutoMapper;
using LostAndFound.ChatService.CoreLibrary.Responses;
using LostAndFound.ChatService.DataAccess.Entities;

namespace LostAndFound.ChatService.Core.MappingProfiles
{
    public class ChatEntityMappingProfile : Profile
    {
        public ChatEntityMappingProfile()
        {
            CreateMap<Chat, ChatBaseDataResponseDto>()
                .ForMember(dto => dto.ChatId, opt => opt.MapFrom(entity => entity.ExposedId))
                .ForMember(dto => dto.LastMessage, opt => opt.MapFrom(entity => entity.Messages.Last()))
                .ForMember(dto => dto.ContainsUnreadMessage, opt => opt.Ignore())
                .ForMember(dto => dto.ChatMember, opt => opt.Ignore());
        }
    }
}
