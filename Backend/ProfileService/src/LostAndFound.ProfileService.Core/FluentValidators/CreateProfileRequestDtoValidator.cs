using FluentValidation;
using LostAndFound.ProfileService.CoreLibrary.Requests;

namespace LostAndFound.ProfileService.Core.FluentValidators
{
    public class CreateProfileRequestDtoValidator : AbstractValidator<CreateProfileRequestDto>
    {
        public CreateProfileRequestDtoValidator()
        {
            RuleFor(dto => dto.UserId)
                .NotEmpty();

            RuleFor(dto => dto.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(dto => dto.Username)
                .NotEmpty()
                .MinimumLength(8);
        }
    }
}
