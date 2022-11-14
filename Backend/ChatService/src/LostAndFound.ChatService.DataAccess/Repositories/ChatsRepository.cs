using LostAndFound.ChatService.DataAccess.Context.Interfaces;
using LostAndFound.ChatService.DataAccess.Entities;
using LostAndFound.ChatService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.ChatService.DataAccess.Repositories
{
    public class ChatsRepository : BaseRepository<Chat>, IChatsRepository
    {
        public ChatsRepository(IMongoChatServiceDbContext chatServiceDbContext) : base(chatServiceDbContext) { }
    }
}
