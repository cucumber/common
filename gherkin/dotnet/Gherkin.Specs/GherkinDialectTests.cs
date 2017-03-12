using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gherkin.Ast;
using Xunit;
using Xunit.Sdk;

namespace Gherkin.Specs
{
    public class GherkinDialectTests
    {
        [Fact]
        public void ShouldThrowNoSuchLanguageExceptionForInvalidLanguage()
        {
            var x = new GherkinDialectProvider();
            
            Assert.Throws<NoSuchLanguageException>(() => x.GetDialect("nosuchlang", new Location(1, 2)));            
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
