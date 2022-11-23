using LostAndFound.PublicationService.DataAccess.Attributes;

namespace LostAndFound.PublicationService.DataAccess.Entities
{
    [BsonCollection("categories")]
    public class Category : BaseDocument
    {
        public string Name { get; set; } = string.Empty;
    }
}
