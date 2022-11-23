using FluentValidation;
using LostAndFound.PublicationService.Core.DateTimeProviders;
using LostAndFound.PublicationService.CoreLibrary.Requests;

namespace LostAndFound.PublicationService.Core.FluentValidators
{
    public class UpdatePublicationDetailsRequestDtoValidator : AbstractValidator<UpdatePublicationDetailsRequestDto>
    {
        public UpdatePublicationDetailsRequestDtoValidator(IDateTimeProvider dateTimeProvider)
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

            RuleFor(dto => dto.SubjectCategory)
                .NotEmpty();
            RuleFor(dto => dto.PublicationType)
                .NotNull()
                .IsInEnum();
            RuleFor(dto => dto.PublicationState)
                .NotNull()
                .IsInEnum();
        }
    }
}
