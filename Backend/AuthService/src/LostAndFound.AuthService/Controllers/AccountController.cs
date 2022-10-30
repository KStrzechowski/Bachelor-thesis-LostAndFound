using LostAndFound.AuthService.Core.AccountServices;
using LostAndFound.AuthService.CoreLibrary.Requests;
using LostAndFound.AuthService.CoreLibrary.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LostAndFound.AuthService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterUserRequestDto dto)
        {
            await _accountService.RegisterUser(dto);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticatedUserDto>> Login(LoginRequestDto dto)
        {
            var authenticatedUser = await _accountService.AuthenticateUser(dto);

            return Ok(authenticatedUser);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<AuthenticatedUserDto>> Refresh(RefreshRequestDto dto)
        {
            var authenticatedUser = await _accountService.RefreshUserAuthentication(dto);

            return Ok(authenticatedUser);
        }

        [Authorize]
        [HttpDelete("logout")]
        public async Task<ActionResult> Logout()
        {
            string rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _accountService.LogoutUser(rawUserId);

            return NoContent();
        }
    }
}
