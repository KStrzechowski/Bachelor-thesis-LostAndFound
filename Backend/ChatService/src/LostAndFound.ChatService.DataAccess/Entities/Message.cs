using LostAndFound.ChatService.DataAccess.Attributes;
using MongoDB.Bson;

namespace LostAndFound.ChatService.DataAccess.Entities
{
    [BsonCollection("messages")]
    public class Message : BaseDocument
    {
        public ObjectId ChatId { get; set; }
        public string Content { get; set; } = string.Empty;
        public Guid AuthorId { get; set; }
    }
}
