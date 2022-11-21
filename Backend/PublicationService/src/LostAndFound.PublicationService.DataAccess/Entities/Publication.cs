using LostAndFound.PublicationService.DataAccess.Attributes;

namespace LostAndFound.PublicationService.DataAccess.Entities
{
    [BsonCollection("publications")]
    public class Publication : BaseDocument
    {
        public Guid CreatorId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? SubjectPhotoUrl { get; set; }
        public string IncidentAddress { get; set; } = string.Empty;
        public string SubjectCategory { get; set; } = string.Empty;
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Type { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public int AggregateRating { get; set; }
        public DateTime LastModificationDate { get; set; }
        public Vote[] Votes { get; set; } = Array.Empty<Vote>();
    }
}
