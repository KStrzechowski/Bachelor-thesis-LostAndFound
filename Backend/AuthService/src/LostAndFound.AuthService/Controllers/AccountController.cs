using LostAndFound.AuthService.Core.AccountServices;
using LostAndFound.AuthService.CoreLibrary.Requests;
using LostAndFound.AuthService.CoreLibrary.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LostAndFound.AuthService.Controllers
{
    /// <summary>
    /// Account controller responsible for registration, signing-in and signing-out process
    /// </summary>
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        /// <summary>
        /// Default AccountController constructor
        /// </summary>
        /// <param name="accountService">Instance of IAccountService interface</param>
        /// <exception cref="ArgumentNullException">Throws ArgumentNullException when IAccountService is null</exception>
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
        }

        /// <summary>
        /// Register a new user account
        /// </summary>
        /// <param name="dto">User data for account registration</param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterUserRequestDto dto)
        {
            await _accountService.RegisterUser(dto);

            return Ok();
        }

        /// <summary>
        /// Login to account and obtain new authentication data
        /// </summary>
        /// <param name="dto">User data for signing in</param>
        /// <returns>Newly generated authentication data</returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticatedUserDto>> Login(LoginRequestDto dto)
        {
            var authenticatedUser = await _accountService.AuthenticateUser(dto);

            return Ok(authenticatedUser);
        }

        /// <summary>
        /// Refresh access token by sending valid refresh token
        /// </summary>
        /// <param name="dto">User's valid refresh token</param>
        /// <returns>Newly generated authentication data</returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("refresh")]
        public async Task<ActionResult<AuthenticatedUserDto>> Refresh(RefreshRequestDto dto)
        {
            var authenticatedUser = await _accountService.RefreshUserAuthentication(dto);

            return Ok(authenticatedUser);
        }

        /// <summary>
        /// Logout user account
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpDelete("logout")]
        public async Task<ActionResult> Logout()
        {
            string rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _accountService.LogoutUser(rawUserId);

            return NoContent();
        }
    }
}
