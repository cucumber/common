using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gherkin.Ast;
using NUnit.Framework;

namespace Gherkin.Specs
{
    [TestFixture]
    public class GherkinDialectTests
    {
        [Test, ExpectedException(typeof(NoSuchLanguageException))]
        public void ShouldThrowNoSuchLanguageExceptionForInvalidLanguage()
        {
            var x = new GherkinDialectProvider();
            x.GetDialect("nosuchlang", new Location(1, 2));
        }

        [Test, ExpectedException(typeof(NoSuchLanguageException))]
        public void ShouldThrowNoSuchLanguageExceptionForInvalidDefaultLanguage()
        {
            var x = new GherkinDialectProvider("nosuchlang");
            var defaultDialect = x.DefaultDialect;
        }

        [Test, ExpectedException(typeof(NoSuchLanguageException))]
        public void ShouldThrowNoSuchLanguageExceptionForInvalidLanguageWithoutLocation()
        {
            var x = new GherkinDialectProvider();
            x.GetDialect("nosuchlang", null);
        }
    }
}
