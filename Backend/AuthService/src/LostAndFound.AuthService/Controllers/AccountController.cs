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
    [Produces("application/json")]
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
        /// <returns>Data of newly created user's account</returns>
        /// <response code="200">Returns new account data</response>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /account/register
        ///     {
        ///        "Email": "user_valid_email@lost.com",
        ///        "Username": "user_321",
        ///        "Password": "strongPassword321",
        ///        "ConfirmPassword": "strongPassword321"
        ///     }
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("register")]
        public async Task<ActionResult<RegisteredUserAccountResponseDto>> RegisterUser(RegisterUserAccountRequestDto dto)
        {
            var registeredUserAccount = await _accountService.RegisterUser(dto);

            return Ok(registeredUserAccount);
        }

        /// <summary>
        /// Login to account and obtain new authentication data
        /// </summary>
        /// <param name="dto">User data for signing in</param>
        /// <returns>Newly generated authentication data</returns>
        /// <response code="200">Returns authentication data</response>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /account/login
        ///     {
        ///        "Email": "user_valid_email@lost.com",
        ///        "Password": "strongPassword321"
        ///     }
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticatedUserResponseDto>> Login(LoginRequestDto dto)
        {
            var authenticatedUser = await _accountService.AuthenticateUser(dto);

            return Ok(authenticatedUser);
        }

        /// <summary>
        /// Refresh access token by sending valid refresh token
        /// </summary>
        /// <param name="dto">User's valid refresh token</param>
        /// <returns>Newly generated authentication data</returns>
        /// <response code="200">Returns authentication data</response>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /account/refresh
        ///     {
        ///        "RefreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NjczMjY1MDYsImV4cCI6MTY3MjU4NTk4NiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6Imh0dHBzOi8vbG9zdGFuZGZvdW5kLWRldmVsb3BtZW50LmNvbSJ9.dOJtN2kLymka4CNwucCsJ8PjcgkMUc9sd9x3I_Pr2GE"
        ///     }
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost("refresh")]
        public async Task<ActionResult<AuthenticatedUserResponseDto>> Refresh(RefreshRequestDto dto)
        {
            var authenticatedUser = await _accountService.RefreshUserAuthentication(dto);

            return Ok(authenticatedUser);
        }

        /// <summary>
        /// Logout user account
        /// </summary>
        /// <response code="204">The logout process was successful</response>
        /// <response code="401">Problem with authentication of user occurred</response>
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
