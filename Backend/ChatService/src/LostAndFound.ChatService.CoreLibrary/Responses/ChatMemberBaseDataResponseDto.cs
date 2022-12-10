namespace LostAndFound.ChatService.CoreLibrary.Responses
{
    /// <summary>
    /// Chat member base data
    /// </summary>
    public class ChatMemberBaseDataResponseDto
    {
        /// <summary>
        /// Member Identifier
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Chat member username
        /// </summary>
        public string Username { get; set; } = string.Empty;
    }
}
