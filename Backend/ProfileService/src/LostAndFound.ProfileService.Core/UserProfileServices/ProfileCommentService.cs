using AutoMapper;
using LostAndFound.ProfileService.Core.DateTimeProviders;
using LostAndFound.ProfileService.Core.UserProfileServices.Interfaces;
using LostAndFound.ProfileService.CoreLibrary.Exceptions;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using LostAndFound.ProfileService.CoreLibrary.Responses;
using LostAndFound.ProfileService.DataAccess.Entities;
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

        public async Task<CommentDataResponseDto> CreateProfileComment(string rawUserId, CreateProfileCommentRequestDto commentRequestDto, Guid profileOwnerId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            var commentEntity = _mapper.Map<Comment>(commentRequestDto);
            if (commentEntity == null)
            {
                throw new BadRequestException("The comment data is incorrect.");
            }
            commentEntity.CreationTime = commentEntity.LastModificationDate = _dateTimeProvider.UtcNow;
            commentEntity.AuthorId = userId;

            var profileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == profileOwnerId);
            if (profileEntity == null)
            {
                throw new NotFoundException();
            }

            throw new NotImplementedException();
        }

        public async Task DeleteProfileComment(string rawUserId, Guid profileOwnerId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            var profileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == profileOwnerId);
            if (profileEntity == null)
            {
                throw new NotFoundException();
            }

            int removedCommentsCount = profileEntity.Comments.ToList().RemoveAll(x => x.AuthorId == userId);
            if (removedCommentsCount < 1)
            {
                throw new NotFoundException();
            }

            await _profilesRepository.ReplaceOneAsync(profileEntity);
        }

        public async Task<ProfileCommentsSectionResponseDto> GetProfileCommentsSection(string rawUserId, Guid profileOwnerId, int pageNumber, int pageSize)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            var profileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == profileOwnerId);
            if (profileEntity == null)
            {
                throw new NotFoundException();
            }

            throw new NotImplementedException();
        }

        public async Task<CommentDataResponseDto> UpdateProfileComment(string rawUserId, UpdateProfileCommentRequestDto commentRequestDto, Guid profileOwnerId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            var profileEntity = await _profilesRepository.GetSingleAsync(x => x.UserId == profileOwnerId);
            if (profileEntity == null)
            {
                throw new NotFoundException();
            }

            var commentEntity = profileEntity.Comments.SingleOrDefault(c => c.AuthorId == userId);
            if (commentEntity == null)
            {
                throw new NotFoundException();
            }

            _mapper.Map(commentRequestDto, commentEntity);
            commentEntity.LastModificationDate = DateTime.UtcNow;

            await _profilesRepository.ReplaceOneAsync(profileEntity);

            throw new NotImplementedException();
        }
    }
}
