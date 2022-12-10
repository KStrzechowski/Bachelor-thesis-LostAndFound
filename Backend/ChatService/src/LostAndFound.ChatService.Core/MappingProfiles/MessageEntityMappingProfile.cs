﻿using AutoMapper;
using LostAndFound.ChatService.CoreLibrary.Responses;
using LostAndFound.ChatService.CoreLibrary.Requests;
using LostAndFound.ChatService.DataAccess.Entities;

namespace LostAndFound.ChatService.Core.MappingProfiles
{
    public class MessageEntityMappingProfile : Profile
    {
        public MessageEntityMappingProfile()
        {
            CreateMap<Message, MessageResponseDto>()
               .ForMember(dto => dto.AuthorId, opt => opt.MapFrom(entity => entity.AuthorId))
               .ForMember(dto => dto.Content, opt => opt.MapFrom(entity => entity.Content))
               .ForMember(dto => dto.CreationTime, opt => opt.MapFrom(entity => entity.CreationTime));

            CreateMap<CreateMessageRequestDto, Message>()
               .ForMember(entity => entity.Content, opt => opt.MapFrom(dto => dto.Content));
        }
    }
}
