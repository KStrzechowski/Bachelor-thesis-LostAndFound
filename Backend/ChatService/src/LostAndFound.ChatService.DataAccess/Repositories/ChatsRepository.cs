using LostAndFound.ChatService.DataAccess.Context.Interfaces;
using LostAndFound.ChatService.DataAccess.Entities;
using LostAndFound.ChatService.DataAccess.Repositories.Interfaces;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace LostAndFound.ChatService.DataAccess.Repositories
{
    public class ChatsRepository : BaseRepository<Chat>, IChatsRepository
    {
        public ChatsRepository(IMongoChatServiceDbContext chatServiceDbContext) : base(chatServiceDbContext) { }


        public async Task<IEnumerable<Chat>> GetUserChatWithUnreadMessage(Guid userId)
        {
            var query = _collection.AsQueryable().Where(c =>
                c.Members.Any(m => m.Id == userId)
                && c.ContainUnreadMessage
                && c.Messages.Last().AuthorId != userId);

            return await query.ToListAsync();
        }

        public async Task InsertNewChatMessage(Guid chatId, Message messageEntity)
        {
            var filter = Builders<Chat>.Filter.Eq(c => c.ExposedId, chatId);
            var update = Builders<Chat>.Update.Push(c => c.Messages, messageEntity)
                .Set(c => c.ContainUnreadMessage, true);

            await _collection.UpdateOneAsync(filter, update);
        }

        public async Task ReadChatMessages(Chat chatEntity)
        {
            var filter = Builders<Chat>.Filter
                .Eq(chat => chat.ExposedId, chatEntity.ExposedId);
            var update = Builders<Chat>.Update
                .Set(chat => chat.ContainUnreadMessage, chatEntity.ContainUnreadMessage);

            await _collection.UpdateOneAsync(filter, update);
        }
    }
}
