using LostAndFound.ChatService.Core.MessageServices.Interfaces;
using LostAndFound.ChatService.CoreLibrary.Requests;
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
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="messageService"></param>
        /// <exception cref="ArgumentNullException"></exception>
        public MessageController(IMessageService messageService)
        {
            _messageService = messageService ?? throw new ArgumentNullException(nameof(messageService));
        }

        [HttpPost("{userId:Guid}")]
        public Task<ActionResult<MessageResponseDto>> SendMessage(Guid userId, 
            CreateMessageRequestDto messageRequestDto)
        {
            throw new NotImplementedException();
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet("{userId:Guid}")]
        public Task<ActionResult<IEnumerable<MessageResponseDto>>> GetChatMessages(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
