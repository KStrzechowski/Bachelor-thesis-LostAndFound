using FluentValidation;
using LostAndFound.AuthService.CoreLibrary.Requests;
using LostAndFound.AuthService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.AuthService.Core.FluentValidators
{
    public class RegisterUserRequestDtoValidator : AbstractValidator<RegisterUserAccountRequestDto>
    {
        public RegisterUserRequestDtoValidator(IAccountsRepository accountsRepository)
        {
            RuleFor(dto => dto.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress();

            RuleFor(dto => dto.Username)
                .NotNull()
                .NotEmpty()
                .MinimumLength(8);

            RuleFor(dto => dto.Password)
                .MinimumLength(8);

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    if (accountsRepository.IsEmailInUse(value))
                    {
                        context.AddFailure("Email", "That email is taken");
                    }
                });

            RuleFor(x => x.Username)
                .Custom((value, context) =>
                {
                    if (accountsRepository.IsUsernameInUse(value))
                    {
                        context.AddFailure("Username", "That username is taken");
                    }
                });
        }
    }
}
