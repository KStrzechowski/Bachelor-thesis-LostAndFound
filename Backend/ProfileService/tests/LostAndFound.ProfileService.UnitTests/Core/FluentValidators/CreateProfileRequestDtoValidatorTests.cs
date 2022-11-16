using FluentValidation.TestHelper;
using LostAndFound.ProfileService.Core.FluentValidators;
using LostAndFound.ProfileService.CoreLibrary.Requests;
using Xunit;

namespace LostAndFound.ProfileService.UnitTests.Core.FluentValidators
{
    public class CreateProfileRequestDtoValidatorTests
    {
        private readonly CreateProfileRequestDtoValidator _createProfileRequestDtoValidator;

        public CreateProfileRequestDtoValidatorTests()
        {
            _createProfileRequestDtoValidator = new CreateProfileRequestDtoValidator();
        }

        [Theory]
        [MemberData(nameof(GetValidLoginRequestDtos))]
        public void Validate_WithValidDto_ReturnsSuccess(CreateProfileRequestDto requestDto)
        {
            var result = _createProfileRequestDtoValidator.TestValidate(requestDto);

            result.ShouldNotHaveAnyValidationErrors();
        }

        [Theory]
        [MemberData(nameof(GetInvalidLoginRequestDtos))]
        public void Validate_WithInalidDto_ReturnsFailure(CreateProfileRequestDto requestDto)
        {
            var result = _createProfileRequestDtoValidator.TestValidate(requestDto);

            result.ShouldHaveAnyValidationError();
        }

        public static TheoryData<CreateProfileRequestDto> GetValidLoginRequestDtos() => new()
        {
            new CreateProfileRequestDto()
            {
                UserId = System.Guid.NewGuid(),
                Email = "correct@email.pl",
                Username = "secure-Username",
            },
            new CreateProfileRequestDto()
            {
                UserId = System.Guid.NewGuid(),
                Email = "anotherEmail213@email.pl",
                Username = "goodUsername!",
            }
        };

        public static TheoryData<CreateProfileRequestDto> GetInvalidLoginRequestDtos() => new()
        {
            new CreateProfileRequestDto()
            {
                Email = "",
                Username = "",
            },
            new CreateProfileRequestDto()
            {
                UserId = System.Guid.NewGuid(),
                Email = "correctEmail@email.pl",
                Username = "",
            },
            new CreateProfileRequestDto()
            {
                UserId = new System.Guid(),
                Email = "anr",
                Username = "asdfaaads!",
            },
            new CreateProfileRequestDto()
            {
                UserId = System.Guid.Empty,
                Email = "correctEmail@email.pl",
                Username = "toshort",
            }
        };
    }
}
