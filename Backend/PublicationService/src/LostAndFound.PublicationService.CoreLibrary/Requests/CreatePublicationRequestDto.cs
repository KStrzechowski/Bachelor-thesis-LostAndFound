using LostAndFound.PublicationService.CoreLibrary.Enums;

namespace LostAndFound.PublicationService.CoreLibrary.Requests
{
    /// <summary>
    /// Data used to create new publication
    /// </summary>
    public class CreatePublicationRequestDto
    {
        /// <summary>
        /// Publication title
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Publication description
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Publication incident address
        /// </summary>
        public string IncidentAddress { get; set; } = string.Empty;

        /// <summary>
        /// Date of the incident
        /// </summary>
        public DateTime IncidentDate { get; set; }

        /// <summary>
        /// The category of the object being the subject of the publication
        /// </summary>
        public string SubjectCategory { get; set; } = string.Empty;

        /// <summary>
        /// Publication type, lost/found object
        /// </summary>
        public PublicationType PublicationType { get; set; }
    }
}
