namespace LostAndFound.ProfileService.CoreLibrary.Requests
{
    /// <summary>
    /// Data to get base profile information for user list
    /// </summary>
    public class GetBaseProfilesDataRequestDto
    {
        /// <summary>
        /// List of user id's
        /// </summary>
        public IEnumerable<Guid> UserIds { get; set; } = Enumerable.Empty<Guid>();
    }
}
