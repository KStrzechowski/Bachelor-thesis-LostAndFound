namespace LostAndFound.AuthService.CoreLibrary.Responses
{
    public class AuthenticatedUserDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public DateTime AccessTokenExpirationTime { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
    }
}
