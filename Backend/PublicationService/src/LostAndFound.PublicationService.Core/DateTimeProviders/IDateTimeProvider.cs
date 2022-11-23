namespace LostAndFound.PublicationService.Core.DateTimeProviders
{
    public interface IDateTimeProvider
    {
        DateTime UtcNow { get; }
    }
}
