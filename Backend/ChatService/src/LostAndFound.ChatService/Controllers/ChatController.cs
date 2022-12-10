using LostAndFound.ChatService.CoreLibrary.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LostAndFound.ChatService.Controllers
{
    /// <summary>
    /// Chat controller responsible for managing correspondence history
    /// </summary>
    [Authorize]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        /// <summary>
        /// Default ChatController constructor
        /// </summary>
        public ChatController()
        {
        }


        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public Task<ActionResult<IEnumerable<ChatBaseDataResponseDto>>> GetChats()
        {
            throw new NotImplementedException();
        }
    }
}
