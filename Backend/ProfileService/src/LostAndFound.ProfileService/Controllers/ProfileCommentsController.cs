using LostAndFound.ProfileService.Core.UserProfileServices.Interfaces;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LostAndFound.ProfileService.Controllers
{
    /// <summary>
    /// Profile comments controller responsible for the process of commenting and rating user profiles
    /// </summary>
    [Authorize]
    [Route("profile/{profileOwnerId:Guid}/comments")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ApiController]
    public class ProfileCommentsController : ControllerBase
    {
        private const int maxCommentsPageSize = 50;
        private readonly IProfileCommentService _profileCommentService;

        /// <summary>
        /// Default ProfileCommentsController constructor
        /// </summary>
        /// <param name="profileCommentService">Instance of IProfileCommentService interface</param>
        /// <exception cref="ArgumentNullException">Throws ArgumentNullException when IProfileCommentService is null</exception>
        public ProfileCommentsController(IProfileCommentService profileCommentService)
        {
            _profileCommentService = profileCommentService ?? throw new ArgumentNullException(nameof(profileCommentService));
        }

        /// <summary>
        /// Retrieves a list of comments from a given user profile sorted by creation date. Provides pagination.
        /// </summary>
        /// <param name="profileOwnerId">Profile owner identifier</param>
        /// <param name="pageNumber">Comments page number</param>
        /// <param name="pageSize">Number of comment per page</param>
        /// <returns>Profile comments section </returns>
        /// <response code="200">Returns profile comments section</response>
        /// <response code="401">Problem with authentication of user occurred</response>
        /// <response code="404">Could not find profile corresponding to <paramref name="profileOwnerId"/></response>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /profile/2b1bafcd-b2fd-492b-b050-9b7027653716/comments?pageNumber=3
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<ActionResult<ProfileCommentsSectionResponseDto>> GetProfileCommentsSection(Guid profileOwnerId, int pageNumber = 1, int pageSize = 20)
        {
            var rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            pageSize = pageSize > maxCommentsPageSize ? maxCommentsPageSize : pageSize;

            var commentsSectionDto = await _profileCommentService.GetProfileCommentsSection(rawUserId, profileOwnerId, pageNumber, pageSize);

            return Ok(commentsSectionDto);
        }

        /// <summary>
        /// Create a comment under another user's profile
        /// </summary>
        /// <param name="profileOwnerId">Profile owner identifier</param>
        /// <param name="commentRequestDto"></param>
        /// <returns>New comment data</returns>
        /// <response code="200">Returns new comment data</response>
        /// <response code="401">Problem with authentication of user occurred</response>
        /// <response code="404">Could not find profile corresponding to <paramref name="profileOwnerId"/></response>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /profile/2b1bafcd-b2fd-492b-b050-9b7027653716/comments
        ///     {
        ///        "Content": "Thank's for help",
        ///        "ProfileRating": 5,
        ///     }
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost]
        public async Task<ActionResult<CommentDataResponseDto>> CreateProfileComment(Guid profileOwnerId, CreateProfileCommentRequestDto commentRequestDto)
        {
            var rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var commentDataDto = await _profileCommentService.CreateProfileComment(rawUserId, commentRequestDto, profileOwnerId);

            return CreatedAtRoute("GetProfileDetails",
                 commentDataDto);
        }

        /// <summary>
        /// Update authenticated user comment posted under another user's profile
        /// </summary>
        /// <param name="profileOwnerId">Profile owner identifier</param>
        /// <param name="commentRequestDto"></param>
        /// <returns>Updated comment data</returns>
        /// <response code="200">Returns updated comment data</response>
        /// <response code="401">Problem with authentication of user occurred</response>
        /// <response code="404">Could not find profile corresponding to <paramref name="profileOwnerId"/></response>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /profile/2b1bafcd-b2fd-492b-b050-9b7027653716/comments
        ///     {
        ///        "Content": "Thank's for help",
        ///        "ProfileRating": 5,
        ///     }
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPut]
        public async Task<ActionResult<CommentDataResponseDto>> UpdateProfileComment(Guid profileOwnerId, UpdateProfileCommentRequestDto commentRequestDto)
        {
            var rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var commentDataDto = await _profileCommentService.UpdateProfileComment(rawUserId, commentRequestDto, profileOwnerId);

            return Ok(commentDataDto);
        }

        /// <summary>
        /// Delete authenticated user comment posted under another user's profile
        /// </summary>
        /// <param name="profileOwnerId">Profile owner identifier</param>
        /// <response code="204">Successfully removed</response>
        /// <response code="401">Problem with authentication of user occurred</response>
        /// <response code="404">Could not find profile corresponding to <paramref name="profileOwnerId"/></response>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /profile/2b1bafcd-b2fd-492b-b050-9b7027653716/comments
        ///
        /// </remarks>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpDelete]
        public async Task<ActionResult> DeleteProfileComment(Guid profileOwnerId)
        {
            var rawUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _profileCommentService.DeleteProfileComment(rawUserId, profileOwnerId);

            return NoContent();
        }
    }
}
