using FluentValidation.TestHelper;
using LostAndFound.PublicationService.Core.DateTimeProviders;
using LostAndFound.PublicationService.Core.FluentValidators;
using LostAndFound.PublicationService.CoreLibrary.Enums;
using LostAndFound.PublicationService.CoreLibrary.Requests;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace LostAndFound.PublicationService.UnitTests.Core.FluentValidators
{
    public class CreatePublicationRequestDtoValidatorTests
    {
        private readonly CreatePublicationRequestDtoValidator _validator;
        private readonly Mock<IDateTimeProvider> _dateTimeProvideMock;
        private readonly DateTime _utcDateNowForTests;

        public CreatePublicationRequestDtoValidatorTests()
        {
            _dateTimeProvideMock = new Mock<IDateTimeProvider>();
            _utcDateNowForTests = DateTime.UtcNow;

            _dateTimeProvideMock.Setup(x => x.UtcNow)
                .Returns(_utcDateNowForTests).Verifiable();

            _validator = new CreatePublicationRequestDtoValidator(_dateTimeProvideMock.Object);
        }

        [Fact]
        public void Validate_DtoWithFutureIncidentDate_ReturnsFailure()
        {
            var dtoModel = GetValidCreatePublicationRequestDto();
            dtoModel.IncidentDate = _utcDateNowForTests.AddDays(1);

            var result = _validator.TestValidate(dtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Fact]
        public void Validate_DtoWithEmptyIncidentDate_ReturnsFailure()
        {
            var dtoModel = GetValidCreatePublicationRequestDto();
            dtoModel.IncidentDate = default(DateTime);

            var result = _validator.TestValidate(dtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Fact]
        public void Validate_DtoWithEmptyTitle_ReturnsFailure()
        {
            var dtoModel = GetValidCreatePublicationRequestDto();
            dtoModel.Title = String.Empty;

            var result = _validator.TestValidate(dtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Fact]
        public void Validate_DtoWithEmptyDescription_ReturnsFailure()
        {
            var dtoModel = GetValidCreatePublicationRequestDto();
            dtoModel.Description = String.Empty;

            var result = _validator.TestValidate(dtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Fact]
        public void Validate_DtoWithEmptyIncidentAddress_ReturnsFailure()
        {
            var dtoModel = GetValidCreatePublicationRequestDto();
            dtoModel.IncidentAddress = String.Empty;

            var result = _validator.TestValidate(dtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Fact]
        public void Validate_DtoWithEmptySubjectCategory_ReturnsFailure()
        {
            var dtoModel = GetValidCreatePublicationRequestDto();
            dtoModel.SubjectCategoryId = String.Empty;

            var result = _validator.TestValidate(dtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Theory]
        [InlineData(-2)]
        [InlineData(100)]
        public void Validate_DtoWithInvalidPublicationType_ReturnsFailure(int value)
        {
            var dtoModel = GetValidCreatePublicationRequestDto();
            dtoModel.PublicationType = (PublicationType)value;

            var result = _validator.TestValidate(dtoModel);

            result.ShouldHaveAnyValidationError();
        }

        [Theory]
        [MemberData(nameof(GetValidRequestDtos))]
        public void Validate_WithValidDto_ReturnsSuccess(CreatePublicationRequestDto requestDto)
        {
            var result = _validator.TestValidate(requestDto);

            result.ShouldNotHaveAnyValidationErrors();
        }

        public static IEnumerable<object[]> GetValidRequestDtos()
        {
            yield return new object[]
            {
                CreateFromDataCreateRegisterUserRequestDto("notEmpty", "notEmpty", "notEmpty",
                    DateTime.Now.AddDays(-1), "notEmpty", PublicationType.FoundSubject)
            };

            yield return new object[]
            {
                CreateFromDataCreateRegisterUserRequestDto("notEmpty", "notEmpty", "notEmpty",
                    DateTime.Now.AddDays(-1), "notEmpty", PublicationType.LostSubject)
            };
        }

        private static CreatePublicationRequestDto CreateFromDataCreateRegisterUserRequestDto(string title,
            string description, string address, DateTime date, string category, PublicationType type)
        {
            return new CreatePublicationRequestDto()
            {
                Title = title,
                Description = description,
                IncidentAddress = address,
                IncidentDate = date,
                SubjectCategoryId = category,
                PublicationType = type,
            };
        }

        private CreatePublicationRequestDto GetValidCreatePublicationRequestDto()
        {
            return new CreatePublicationRequestDto()
            {
                Title = "notEmpty",
                Description = "notEmpty",
                IncidentAddress = "notEmpty",
                IncidentDate = _utcDateNowForTests.AddDays(-1),
                SubjectCategoryId = "notEmpty",
                PublicationType = PublicationType.FoundSubject,
            };
        }
    }
}
