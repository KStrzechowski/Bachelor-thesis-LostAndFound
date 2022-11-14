using LostAndFound.PublicationService.DataAccess.Attributes;

namespace LostAndFound.PublicationService.DataAccess.Entities
{
    [BsonCollection("publications")]
    public class Publication : BaseDocument
    {
        public Guid CreatorId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? SubjectPhotoId { get; set; }
        public string IncidentAddress { get; set; } = string.Empty;
        public string SubjectCategory { get; set; } = string.Empty;
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public string Type { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public int AggregateRating { get; set; }
        public DateTime LastModificationDate { get; set; }
        public IEnumerable<Vote> Votes { get; set; } = Enumerable.Empty<Vote>();
    }

    public class Vote
    {
        public Guid VoterId { get; set; }
        public int Rating { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
