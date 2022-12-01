﻿using LostAndFound.PublicationService.CoreLibrary.Enums;

namespace LostAndFound.PublicationService.CoreLibrary.Responses
{
    /// <summary>
    /// Publication details
    /// </summary>
    public class PublicationDetailsResponseDto
    {
        /// <summary>
        /// Publication Identifier
        /// </summary>
        public Guid PublicationId { get; set; }

        /// <summary>
        /// Publication title
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        ///  Publication description
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Subject photo url address
        /// </summary>
        public string? SubjectPhotoUrl { get; set; }

        /// <summary>
        /// Publication incident address
        /// </summary>
        public string IncidentAddress { get; set; } = string.Empty;

        /// <summary>
        /// Date of the incident
        /// </summary>
        public DateTime IncidentDate { get; set; }

        /// <summary>
        /// Publication aggregated rating
        /// </summary>
        public long AggregateRating { get; set; }

        /// <summary>
        /// Authenticated user vote
        /// </summary>
        public SinglePublicationVote UserVote { get; set; }

        /// <summary>
        /// The category of the object being the subject of the publication
        /// </summary>
        public string SubjectCategory { get; set; } = string.Empty;

        /// <summary>
        /// Publication type, lost/found object
        /// </summary>
        public PublicationType PublicationType { get; set; }

        /// <summary>
        /// Publication state (open/closed)
        /// </summary>
        public PublicationState PublicationState { get; set; }

        /// <summary>
        /// Last publication update date
        /// </summary>
        public DateTime LastModificationDate { get; set; }

        /// <summary>
        /// Publication creation date
        /// </summary>
        public DateTime CreationDate { get; set; }

        /// <summary>
        /// Base author data
        /// </summary>
        public UserDataResponseDto Author { get; set; } = null!;
    }
}
