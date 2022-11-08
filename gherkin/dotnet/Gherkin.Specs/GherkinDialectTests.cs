﻿using FluentAssertions;
using Xunit;

namespace Gherkin.Specs
{
    public class GherkinDialectTests
    {
        [Fact]
        public void ShouldParseSpecialCharacters()
        {
            var dialectProvider = new GherkinDialectProvider();
            var dialect = dialectProvider.GetDialect("hu", new Ast.Location(1, 2));

            dialect.FeatureKeywords.Should().Contain("Jellemző");
        }

        [Fact]
        public void ShouldThrowNoSuchLanguageExceptionForInvalidLanguage()
        {
            var x = new GherkinDialectProvider();
            
            Assert.Throws<NoSuchLanguageException>(() => x.GetDialect("nosuchlang", new Ast.Location(1, 2)));            
        }

        [Fact]
        public void ShouldThrowNoSuchLanguageExceptionForInvalidDefaultLanguage()
        {
            var x = new GherkinDialectProvider("nosuchlang");
            
            Assert.Throws<NoSuchLanguageException>(() => { var dialect =  x.DefaultDialect;});
        }

        [Fact]
        public void ShouldThrowNoSuchLanguageExceptionForInvalidLanguageWithoutLocation()
        {
            var x = new GherkinDialectProvider();
            Assert.Throws<NoSuchLanguageException>(() => x.GetDialect("nosuchlang", null));            
        }
    }
}
