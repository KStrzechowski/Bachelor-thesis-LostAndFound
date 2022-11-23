namespace LostAndFound.PublicationService.ThirdPartyServices.Settings
{
    public class GoogleGeocoderSettings
    {
        private const string settingName = "LostAndFoundGoogleGeocoderSettings";

        public static string SettingName => settingName;
        public string ApiKey { get; set; } = string.Empty;
    }
}
