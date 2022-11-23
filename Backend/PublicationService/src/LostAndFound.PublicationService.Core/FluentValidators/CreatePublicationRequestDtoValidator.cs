using FluentValidation;
using LostAndFound.PublicationService.CoreLibrary.Requests;

namespace LostAndFound.PublicationService.Core.FluentValidators
{
    public class CreatePublicationRequestDtoValidator : AbstractValidator<CreatePublicationRequestDto>
    {
        public CreatePublicationRequestDtoValidator()
        {

        }
    }
}
