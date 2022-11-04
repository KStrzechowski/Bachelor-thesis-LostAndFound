using LostAndFound.AuthService.Core.TokenGenerators;
using LostAndFound.AuthService.Core.TokenValidators;
using LostAndFound.AuthService.CoreLibrary.Exceptions;
using LostAndFound.AuthService.CoreLibrary.Requests;
using LostAndFound.AuthService.CoreLibrary.Responses;
using LostAndFound.AuthService.DataAccess.Entities;
using LostAndFound.AuthService.DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;

namespace LostAndFound.AuthService.Core.AccountServices
{
    public class AccountService : IAccountService
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IUsersRepository _usersRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IAccessTokenGenerator _accessTokenGenerator;
        private readonly IRefreshTokenGenerator _refreshTokenGenerator;
        private readonly IRefreshTokenValidator _refreshTokenValidator;

        public AccountService(IPasswordHasher<User> passwordHasher, IUsersRepository usersRepository, IRefreshTokenRepository refreshTokenRepository,
            IAccessTokenGenerator accessTokenGenerator, IRefreshTokenGenerator refreshTokenGenerator, IRefreshTokenValidator refreshTokenValidator)
        {
            _passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _refreshTokenRepository = refreshTokenRepository ?? throw new ArgumentNullException(nameof(refreshTokenRepository));
            _accessTokenGenerator = accessTokenGenerator ?? throw new ArgumentNullException(nameof(accessTokenGenerator));
            _refreshTokenGenerator = refreshTokenGenerator ?? throw new ArgumentNullException(nameof(refreshTokenGenerator));
            _refreshTokenValidator = refreshTokenValidator ?? throw new ArgumentNullException(nameof(refreshTokenValidator));
        }

        public async Task<AuthenticatedUserResponseDto> AuthenticateUser(LoginRequestDto dto)
        {
            var user = await _usersRepository.GetUserByEmailAsync(dto.Email);
            if (user == null)
            {
                throw new BadRequestException("User with a specified email does not exist.");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid email or password");
            }

            return await CreateAuthenticatedUser(user);
        }

        public async Task LogoutUser(string rawUserId)
        {
            if (!Guid.TryParse(rawUserId, out Guid userId))
            {
                throw new UnauthorizedException();
            }

            await _refreshTokenRepository.DeleteAll(userId);
        }

        public async Task<AuthenticatedUserResponseDto> RefreshUserAuthentication(RefreshRequestDto dto)
        {
            bool isRefreshTokenValid = _refreshTokenValidator.ValidateRefreshToken(dto.RefreshToken);
            var refreshToken = await _refreshTokenRepository.GetByToken(dto.RefreshToken);
            if (!isRefreshTokenValid || refreshToken == null)
            {
                throw new BadRequestException("Invalid refresh token.");
            }

            await _refreshTokenRepository.Delete(refreshToken.Id);
            var user = await _usersRepository.GetUserByIdAsync(refreshToken.UserId);
            if (user == null)
            {
                throw new BadRequestException("Account does not exist for specified user.");
            }

            return await CreateAuthenticatedUser(user);
        }

        public async Task<RegisteredUserAccountResponseDto> RegisterUser(RegisterUserAccountRequestDto dto)
        {
            var newUser = new User()
            {
                Email = dto.Email,
                Username = dto.Username,
            };

            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = hashedPassword;

            await _usersRepository.AddUserAsync(newUser);

            return new RegisteredUserAccountResponseDto()
            {
                Email = newUser.Email,
                UserIdentifier = Guid.NewGuid().ToString(),
                Username = newUser.Username,
            };
        }

        private async Task<AuthenticatedUserResponseDto> CreateAuthenticatedUser(User user)
        {
            var accessToken = _accessTokenGenerator.GenerateAccessToken(user);
            var refreshTokenRaw = _refreshTokenGenerator.GenerateRefreshToken();

            var refreshToken = new RefreshToken()
            {
                Token = refreshTokenRaw,
                UserId = user.Id,
            };

            await _refreshTokenRepository.Create(refreshToken);

            return new AuthenticatedUserResponseDto
            {
                AccessToken = accessToken.Value,
                AccessTokenExpirationTime = accessToken.ExpirationTime,
                RefreshToken = refreshTokenRaw,
            };
        }
    }
}
