using AutoMapper;
using LostAndFound.ChatService.Core.ChatServices.Interfaces;
using LostAndFound.ChatService.Core.DateTimeProviders;
using LostAndFound.ChatService.Core.Extensions;
using LostAndFound.ChatService.CoreLibrary.Exceptions;
using LostAndFound.ChatService.CoreLibrary.Internal;
using LostAndFound.ChatService.CoreLibrary.ResourceParameters;
using LostAndFound.ChatService.CoreLibrary.Responses;
using LostAndFound.ChatService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.ChatService.Core.ChatServices
{
    public class ChatActionService : IChatActionService
    {
        private readonly IChatsRepository _chatsRepository;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IMapper _mapper;

        public ChatActionService(IChatsRepository chatsRepository, IDateTimeProvider dateTimeProvider, IMapper mapper)
        {
            _chatsRepository = chatsRepository ?? throw new NotImplementedException(nameof(chatsRepository));
            _dateTimeProvider = dateTimeProvider ?? throw new NotImplementedException(nameof(dateTimeProvider));
            _mapper = mapper ?? throw new NotImplementedException(nameof(mapper));
        }


        public async Task<(IEnumerable<ChatBaseDataResponseDto>?, PaginationMetadata)> GetChats(
            string rawUserId, ChatsResourceParameters resourceParameters)
        {
            var userId = ParseUserId(rawUserId);
            var chats = await _chatsRepository.FilterByAsync(c => c.Members.Any(m => m.Id == userId));

            var chatsPage = chats.OrderByDescending(c => c.Messages.Last().CreationTime)
                .Skip(resourceParameters.PageSize * (resourceParameters.PageNumber - 1))
                .Take(resourceParameters.PageSize)
                .ToList();

            var chatDtos = Enumerable.Empty<ChatBaseDataResponseDto>();
            if(chatsPage is not null && chatsPage.Any())
            {
                chatDtos = _mapper.Map<IEnumerable<ChatBaseDataResponseDto>>(chatsPage);

                foreach (var it in chatDtos.Zip(chatsPage, Tuple.Create))
                {
                    if(it.Item1 is not null)
                    {
                        it.Item1.ContainsUnreadMessage = it.Item1.LastMessage?.AuthorId != userId
                            && it.Item2.ContainUnreadMessage;

                        var chatMember = it.Item2.Members.Single(m => m.Id != userId);
                        it.Item1.ChatMember = new ChatMemberBaseDataResponseDto()
                        {
                            Id = chatMember.Id,
                            Username = chatMember.Username,
                        };
                    }
                }
            }

            int totalItemCount = chats.Count();
            var paginationMetadata = new PaginationMetadata(totalItemCount, resourceParameters.PageSize, resourceParameters.PageNumber);

            return (chatDtos, paginationMetadata);
        }

        public async Task ReadChatMessages(string rawUserId, Guid chatMemberId)
        {
            var userId = ParseUserId(rawUserId);
            var chatId = userId.MungeTwoGuids(chatMemberId);

            var chatEntity = await _chatsRepository.GetSingleAsync(c => c.ExposedId == chatId);
            if (chatEntity?.Messages is null)
            {
                throw new NotFoundException("Chat not found");
            }

            if(chatEntity.Messages.Any() && chatEntity.Messages.Last().AuthorId == chatMemberId 
                && chatEntity.ContainUnreadMessage)
            {
                chatEntity.ContainUnreadMessage = false;
                await _chatsRepository.ReadChatMessages(chatEntity);
            }
        }

        private static Guid ParseUserId(string rawUserId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            return userId;
        }
    }
}
