using LostAndFound.ChatService.DataAccess.Attributes;
using MongoDB.Bson;

namespace LostAndFound.ChatService.DataAccess.Entities
{
    [BsonCollection("chats")]
    public class Chat : BaseDocument
    {
        public ObjectId ChatId { get; set; }
        public IEnumerable<string> MemberIds { get; set; } = Enumerable.Empty<string>();
        public bool ContainUnreadMessage { get; set; }
    }
}
