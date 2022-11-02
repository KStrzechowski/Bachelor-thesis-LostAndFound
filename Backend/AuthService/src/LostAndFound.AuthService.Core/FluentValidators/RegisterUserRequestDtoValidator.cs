using FluentValidation;
using LostAndFound.AuthService.CoreLibrary.Requests;
using LostAndFound.AuthService.DataAccess.Repositories;

namespace LostAndFound.AuthService.Core.FluentValidators
{
    public class RegisterUserRequestDtoValidator : AbstractValidator<RegisterUserAccountRequestDto>
    {
        public RegisterUserRequestDtoValidator(IUsersRepository usersRepository)
        {
            RuleFor(dto => dto.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress();

            RuleFor(dto => dto.Username)
                .NotNull()
                .NotEmpty()
                .MinimumLength(6);

            RuleFor(dto => dto.Password)
                .MinimumLength(6);
            RuleFor(dto => dto.ConfirmPassword)
                .Equal(dto => dto.Password);

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    if (usersRepository.IsEmailInUse(value))
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });

            RuleFor(x => x.Username)
                .Custom((value, context) =>
                {
                    if (usersRepository.IsUsernameInUse(value))
                    {
                        context.AddFailure("Username", "That username is taken");
                    }
                });
        }
    }
}
