namespace LostAndFound.ProfileService.CoreLibrary.Requests
{
    /// <summary>
    /// Basic details of the new user profile
    /// </summary>
    public class CreateProfileRequestDto
    {
        /// <summary>
        /// Profile owner Identifier
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// The e-mail address of the profile owner
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// The username address of the profile owner
        /// </summary>
        public string Username { get; set; } = string.Empty;
    }
}
