using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;

namespace LostAndFound.ProfileService.Core.UserProfileServices.Interfaces
{
    public interface IProfileCommentService
    {
        Task<CommentDataResponseDto> UpdateProfileComment(string rawUserId, UpdateProfileCommentRequestDto commentRequestDto, Guid profileOwnerId);
        Task<CommentDataResponseDto> CreateProfileComment(string rawUserId, CreateProfileCommentRequestDto commentRequestDto, Guid profileOwnerId);
        Task DeleteProfileComment(string rawUserId, Guid profileOwnerId);
        Task<ProfileCommentsSectionResponseDto> GetProfileCommentsSection(string rawUserId, Guid profileOwnerId, int pageNumber, int pageSize);
    }
}
