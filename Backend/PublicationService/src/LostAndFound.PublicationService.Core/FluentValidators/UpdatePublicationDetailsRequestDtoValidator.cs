using FluentValidation;
using LostAndFound.PublicationService.CoreLibrary.Requests;

namespace LostAndFound.PublicationService.Core.FluentValidators
{
    public class UpdatePublicationDetailsRequestDtoValidator : AbstractValidator<UpdatePublicationDetailsRequestDto>
    {
        public UpdatePublicationDetailsRequestDtoValidator()
        {

        }
    }
}
