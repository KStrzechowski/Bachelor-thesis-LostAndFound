using LostAndFound.ProfileService.Core.UserProfileServices.Interfaces;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LostAndFound.ProfileService.Controllers
{
    /// <summary>
    /// Profile controller responsible for user profile data management
    /// </summary>
    [Route("[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;

        /// <summary>
        /// Default ProfileController constructor
        /// </summary>
        /// <param name="userProfileService">Instance of IUserProfileService interface</param>
        /// <exception cref="ArgumentNullException">Throws ArgumentNullException when IUserProfileService is null</exception>
        public ProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService ?? throw new ArgumentNullException(nameof(userProfileService));
        }


        /// <summary>
        /// Get authenticated user profile details
        /// </summary>
        /// <returns>User profile details</returns>
        /// <response code="200">Returns profile details</response>
        /// <response code="401">Problem with authentication of user occurred</response>
        /// <response code="404">Could not find profile corresponding to authenticated user</response>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /profile
        ///
        /// </remarks>
        [Authorize]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet(Name = "GetProfileDetails")]
        public async Task<ActionResult<ProfileDetailsResponseDto>> GetProfileDetails()
        {
            var rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileDetailsDto = await _userProfileService.GetUserProfileDetails(rawUserId);

            return Ok(profileDetailsDto);
        }

        /// <summary>
        /// Create new user profile
        /// </summary>
        /// <param name="createProfileRequestDto">Data for new user profile</param>
        /// <returns>Newly created profile details</returns>
        /// <response code="201">Creation succeed, returns created profile details</response>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /profile
        ///     {
        ///        "UserId": "2b1bafcd-b2fd-492b-b050-9b7027653716",
        ///        "Email": "user_valid_email@lost.com",
        ///        "Username": "user_321",
        ///     }
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<ActionResult<ProfileDetailsResponseDto>> CreateProfile(CreateProfileRequestDto createProfileRequestDto)
        {
            var newProfileDetails = await _userProfileService.CreateUserProfile(createProfileRequestDto);

            return CreatedAtRoute("GetProfileDetails",
                 newProfileDetails);
        }

        /// <summary>
        /// Update authenticated user profile details
        /// </summary>
        /// <param name="updateProfileDetailsRequestDto">Updated user profile details data</param>
        /// <returns>Updated user profile details</returns>
        /// <response code="200">Returns updated profile details</response>
        /// <response code="401">Problem with authentication of user occurred</response>
        /// <response code="404">Could not find profile corresponding to authenticated user</response>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /profile
        ///     {
        ///        "Name": "Piotr",
        ///        "Surname": "Kowalski",
        ///        "Description": "I like cats",
        ///        "City": "Warsaw",
        ///     }
        ///
        /// </remarks>
        [Authorize]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPut]
        public async Task<ActionResult<ProfileDetailsResponseDto>> UpdateProfileDetails(UpdateProfileDetailsRequestDto updateProfileDetailsRequestDto)
        {
            var rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profileDetailsDto = await _userProfileService.UpdateProfileDetails(updateProfileDetailsRequestDto, rawUserId);

            return Ok(profileDetailsDto);
        }

        /// <summary>
        /// Retrieve user profile details with identifier <paramref name="userId"/>
        /// </summary>
        /// <param name="userId">User identifier</param>
        /// <returns>User profile details</returns>
        /// <response code="200">Returns profile details</response>
        /// <response code="401">Problem with authentication of user occurred</response>
        /// <response code="404">Could not find profile corresponding to authenticated user</response>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /profile/2b1bafcd-b2fd-492b-b050-9b7027653716
        ///
        /// </remarks>
        [Authorize]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet("{userId}")]
        public async Task<ActionResult<ProfileDetailsResponseDto>> GetProfileDetailsOfUser(string userId)
        {
            var profileDetailsDto = await _userProfileService.GetUserProfileDetails(userId);

            return Ok(profileDetailsDto);
        }
    }
}
