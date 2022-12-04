using LostAndFound.AuthService.Core.HttpClients.Interfaces;
using LostAndFound.AuthService.CoreLibrary.Responses;
using Marvin.StreamExtensions;
using System.Net.Http.Headers;
using System.Text;

namespace LostAndFound.AuthService.Core.HttpClients
{
    public class ProfileHttpClient : IProfileHttpClient
    {
        private readonly HttpClient _client;

        public ProfileHttpClient(HttpClient client)
        {
            _client = client;

            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));
        }

        public async Task CreateNewUserProfile(RegisteredUserAccountResponseDto registeredUserDto)
        {
            var memoryContentStream = new MemoryStream();
            memoryContentStream.SerializeToJsonAndWrite(registeredUserDto,
                new UTF8Encoding(),
                1024,
                true);
            memoryContentStream.Seek(0, SeekOrigin.Begin);

            using var request = new HttpRequestMessage(HttpMethod.Post, "profile");
            using var streamContent = new StreamContent(memoryContentStream);

            streamContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            request.Content = streamContent;

            var response = await _client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
            response.EnsureSuccessStatusCode();
        }
    }
}
