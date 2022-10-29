using FluentAssertions;
using FluentValidation.TestHelper;
using LostAndFound.AuthService.Core.FluentValidators;
using LostAndFound.AuthService.CoreLibrary.Requests;
using LostAndFound.AuthService.DataAccess.Repositories;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace LostAndFound.AuthService.UnitTests.FluentValidators
{
    public class RegisterUserRequestDtoValidatorTests
    {
        private readonly Mock<IUsersRepository> _usersRepositoryMock;

        public RegisterUserRequestDtoValidatorTests()
        {
            _usersRepositoryMock = new Mock<IUsersRepository>();
        }

        [Fact]
        public void Validate_DtoWithAlreadyUsedEmail_ReturnsFailure()
        {
            _usersRepositoryMock
                .Setup(repo => repo.IsEmailInUse(It.IsAny<string>()))
                .Returns<string>(_ => true);
            _usersRepositoryMock
                .Setup(repo => repo.IsUsernameInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);

            var validator = new RegisterUserRequestDtoValidator(_usersRepositoryMock.Object);
            var validDtoModel = GetValidRegisterUserDto();

            var result = validator.TestValidate(validDtoModel);

            result.ShouldHaveAnyValidationError();
            result.Errors.First().ErrorMessage.Should().Contain("email is taken");
        }

        [Fact]
        public void Validate_DtoWithAlreadyUsedUsername_ReturnsFailure()
        {
            _usersRepositoryMock
                .Setup(repo => repo.IsEmailInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            _usersRepositoryMock
                .Setup(repo => repo.IsUsernameInUse(It.IsAny<string>()))
                .Returns<string>(_ => true);
            var validator = new RegisterUserRequestDtoValidator(_usersRepositoryMock.Object);
            RegisterUserRequestDto validDtoModel = GetValidRegisterUserDto();

            var result = validator.TestValidate(validDtoModel);

            result.ShouldHaveAnyValidationError();
            result.Errors.First().ErrorMessage.Should().Contain("username is taken");
        }

        [Fact]
        public void Validate_DtoWithPasswordsThatDoNotMatch_ReturnsFailure()
        {
            _usersRepositoryMock
                .Setup(repo => repo.IsEmailInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            _usersRepositoryMock
                .Setup(repo => repo.IsUsernameInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            var validator = new RegisterUserRequestDtoValidator(_usersRepositoryMock.Object);
            var validDtoModel = CreateRegisterUserRequestDto("goodEmail@gmail.com", "goodUsername123", "password1111", "password2222");

            var result = validator.TestValidate(validDtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Fact]
        public void Validate_DtoWithUsernameTooShort_ReturnsFailure()
        {
            _usersRepositoryMock
                .Setup(repo => repo.IsEmailInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            _usersRepositoryMock
                .Setup(repo => repo.IsUsernameInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            var validator = new RegisterUserRequestDtoValidator(_usersRepositoryMock.Object);
            var validDtoModel = CreateRegisterUserRequestDto("goodEmail@gmail.com", "short", "password1111", "password1111");

            var result = validator.TestValidate(validDtoModel);

            result.ShouldHaveAnyValidationError();
            result.Errors.First().ErrorMessage.Should().Contain("The length of 'Username' must be at least 6 characters");
        }

        [Fact]
        public void Validate_DtoWithPasswordTooShort_ReturnsFailure()
        {
            _usersRepositoryMock
                .Setup(repo => repo.IsEmailInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            _usersRepositoryMock
                .Setup(repo => repo.IsUsernameInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            var validator = new RegisterUserRequestDtoValidator(_usersRepositoryMock.Object);
            var validDtoModel = CreateRegisterUserRequestDto("goodEmail@gmail.com", "User12312", "pass1", "pass1");

            var result = validator.TestValidate(validDtoModel);

            result.ShouldHaveAnyValidationError();
            result.Errors.First().ErrorMessage.Should().Contain("The length of 'Password' must be at least 6 characters");
        }

        [Theory]
        [MemberData(nameof(GetValidRegisterUserRequestDtos))]
        public void Validate_WithValidDto_ReturnsSuccess(RegisterUserRequestDto requestDto)
        {
            _usersRepositoryMock
                .Setup(repo => repo.IsEmailInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            _usersRepositoryMock
                .Setup(repo => repo.IsUsernameInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            var validator = new RegisterUserRequestDtoValidator(_usersRepositoryMock.Object);

            var result = validator.TestValidate(requestDto);

            result.ShouldNotHaveAnyValidationErrors();
        }

        [Theory]
        [MemberData(nameof(GetInvalidRegisterUserRequestDtos))]
        public void Validate_WithInalidDto_ReturnsFailure(RegisterUserRequestDto requestDto)
        {
            _usersRepositoryMock
                .Setup(repo => repo.IsEmailInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            _usersRepositoryMock
                .Setup(repo => repo.IsUsernameInUse(It.IsAny<string>()))
                .Returns<string>(_ => false);
            var validator = new RegisterUserRequestDtoValidator(_usersRepositoryMock.Object);

            var result = validator.TestValidate(requestDto);

            result.ShouldHaveAnyValidationError();
        }

        public static IEnumerable<object[]> GetValidRegisterUserRequestDtos()
        {
            yield return new object[]
            {
                CreateRegisterUserRequestDto("goodEmail@gmail.com", "goodUsername123", "password123", "password123")
            };

            yield return new object[]
            {
                CreateRegisterUserRequestDto("goodEmailwqwe@gmail.com", "simple1314321@!@#!4322", "password1234111", "password1234111")
            };
        }

        public static IEnumerable<object[]> GetInvalidRegisterUserRequestDtos()
        {
            yield return new object[]
            {
                CreateRegisterUserRequestDto("NotAnEmail", "goodUsername123", "password123", "password123")
            };

            yield return new object[]
            {
                CreateRegisterUserRequestDto("NotAnEmail", "", "password123", "password123")
            };

            yield return new object[]
            {
                CreateRegisterUserRequestDto("emailCorrect@gg.pl", "", "password123", "password123")
            };

            yield return new object[]
            {
                CreateRegisterUserRequestDto("emailCorrect@gg.pl", "user12312", "", "")
            };

            yield return new object[]
            {
                CreateRegisterUserRequestDto("emailCorrect@gg.pl", "user12312", "koko", "kokosdas")
            };
        }

        private static RegisterUserRequestDto CreateRegisterUserRequestDto(string email, string usernam, string password, string confirmPassword)
        {
            return new RegisterUserRequestDto()
            {
                Email = email,
                Username = usernam,
                Password = password,
                ConfirmPassword = confirmPassword
            };
        }

        private static RegisterUserRequestDto GetValidRegisterUserDto()
        {
            return new RegisterUserRequestDto()
            {
                Email = "goodEmail@gmail.com",
                Username = "goodUsername123",
                Password = "password123",
                ConfirmPassword = "password123",
            };
        }
    }
}
