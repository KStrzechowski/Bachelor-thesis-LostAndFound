using LostAndFound.AuthService.DataAccess.Context.Interfaces;
using LostAndFound.AuthService.DataAccess.Entities;
using MongoDB.Driver;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace LostAndFound.AuthService.UnitTests.DataAccess.Repositories
{
    public class AccountsRepositoryTests
    {
        private Mock<IMongoCollection<Account>> _accountsCollection;
        private readonly Mock<IMongoAuthServiceDbContext> _mongoAuthServiceDbContext;

        private List<Account> _accountList;

        public AccountsRepositoryTests()
        {
            _accountsCollection = new Mock<IMongoCollection<Account>>();
            _mongoAuthServiceDbContext = new Mock<IMongoAuthServiceDbContext>();



            _accountList = new List<Account>();
        }


        [Fact]
        public void IsEmailInUse_WithAvailableEmail_ReturnsFalse()
        {

        }


        [Fact]
        public void IsEmailInUse_WithAvailableEmail_ReturnsTrue()
        {

        }

        [Fact]
        public void IsUsernameInUse_WithAvailableUsername_ReturnsFalse()
        {

        }


        [Fact]
        public void IsUsernameInUse_WithAvailableEmail_ReturnsTrue()
        {

        }
    }
}
