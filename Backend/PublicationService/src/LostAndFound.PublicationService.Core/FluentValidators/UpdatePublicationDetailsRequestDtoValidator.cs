using FluentValidation;
using LostAndFound.PublicationService.Core.Helpers.DateTimeProviders;
using LostAndFound.PublicationService.CoreLibrary.Requests;
using LostAndFound.PublicationService.DataAccess.Repositories.Interfaces;

namespace LostAndFound.PublicationService.Core.FluentValidators
{
    public class UpdatePublicationDetailsRequestDtoValidator : AbstractValidator<UpdatePublicationDetailsRequestDto>
    {
        public UpdatePublicationDetailsRequestDtoValidator(IDateTimeProvider dateTimeProvider,
            ICategoriesRepository categoriesRepository)
        {
            RuleFor(dto => dto.Title)
                .NotEmpty();
            RuleFor(dto => dto.Description)
                .NotEmpty();
            RuleFor(dto => dto.IncidentAddress)
                .NotEmpty();

            RuleFor(dto => dto.IncidentDate)
                .NotEmpty()
                .LessThan(dateTimeProvider.UtcNow);

            RuleFor(dto => dto.SubjectCategoryId)
                .NotEmpty()
                .Custom((value, context) =>
                {
                    if (categoriesRepository.DoesCategoryExist(value))
                    {
                        context.AddFailure("SubjectCategoryId", "Category with this id does not exist");
                    }
                });

            RuleFor(dto => dto.PublicationType)
                .NotNull()
                .IsInEnum();
            RuleFor(dto => dto.PublicationState)
                .NotNull()
                .IsInEnum();
        }
    }
}
