using FluentValidation;
using LostAndFound.ProfileService.CoreLibrary.Requests;

namespace LostAndFound.ProfileService.Core.FluentValidators
{
    public class GetBaseProfilesDataRequestDtoValidator : AbstractValidator<GetBaseProfilesDataRequestDto>
    {
        public GetBaseProfilesDataRequestDtoValidator()
        {
            RuleFor(dto => dto.UserIds)
                .NotNull();
        }
    }
}
