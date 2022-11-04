namespace LostAndFound.ProfileService.CoreLibrary.Settings
{
    public class AuthenticationSettings
    {
        public string AccessTokenSecret { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
    }
}
