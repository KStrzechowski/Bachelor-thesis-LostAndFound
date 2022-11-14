using LostAndFound.ChatService.DataAccess.Context.Interfaces;
using LostAndFound.ChatService.DataAccess.Entities;
using LostAndFound.ChatService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.ChatService.DataAccess.Repositories
{
    public class MessagesRepository : BaseRepository<Message>, IMessagesRepository
    {
        public MessagesRepository(IMongoChatServiceDbContext chatServiceDbContext) : base(chatServiceDbContext) { }
    }
}
