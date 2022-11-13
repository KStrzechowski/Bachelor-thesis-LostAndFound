using FluentValidation;
using LostAndFound.AuthService.CoreLibrary.Requests;

namespace LostAndFound.AuthService.Core.FluentValidators
{
    public class LoginRequestDtoValidator : AbstractValidator<LoginRequestDto>
    {
        public LoginRequestDtoValidator()
        {
            RuleFor(dto => dto.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(dto => dto.Password).MinimumLength(8);
        }
    }
}
