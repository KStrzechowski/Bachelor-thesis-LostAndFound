namespace LostAndFound.ChatService.DataAccess.Settings
{
    public class ChatServiceDatabaseSettings
    {
        private const string settingName = "LostAndFoundChatServiceDb";

        public static string SettingName => settingName;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}
