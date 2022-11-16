using AutoMapper;
using LostAndFound.ProfileService.Core.DateTimeProviders;
using LostAndFound.ProfileService.Core.UserProfileServices.Interfaces;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;
using LostAndFound.ProfileService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.ProfileService.Core.UserProfileServices
{
    public class ProfileCommentService : IProfileCommentService
    {
        private readonly IProfilesRepository _profilesRepository;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IMapper _mapper;

        public ProfileCommentService(IProfilesRepository profilesRepository, IDateTimeProvider dateTimeProvider, IMapper mapper)
        {
            _profilesRepository = profilesRepository ?? throw new ArgumentNullException(nameof(profilesRepository));
            _dateTimeProvider = dateTimeProvider ?? throw new ArgumentNullException(nameof(dateTimeProvider));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public Task<CommentDataResponseDto> CreateProfileComment(string rawUserId, CreateProfileCommentRequestDto commentRequestDto, Guid profileOwnerId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteProfileComment(string rawUserId, Guid profileOwnerId)
        {
            throw new NotImplementedException();
        }

        public Task<ProfileCommentsSectionResponseDto> GetProfileCommentsSection(string rawUserId, Guid profileOwnerId, int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<CommentDataResponseDto> UpdateProfileComment(string rawUserId, UpdateProfileCommentRequestDto commentRequestDto, Guid profileOwnerId)
        {
            throw new NotImplementedException();
        }
    }
}
