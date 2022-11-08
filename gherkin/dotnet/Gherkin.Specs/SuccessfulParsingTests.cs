using System.IO;
using Gherkin.Specs.Helper;
using Xunit;

namespace Gherkin.Specs
{
    public class SuccessfulParsingTests
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulParsing(string testFeatureFile)
        {
            var fullPathToTestFeatureFile = Path.Combine(TestFileProvider.GetTestFileFolder("good"), testFeatureFile);

            var parser = new Parser();
            var parsingResult = parser.Parse(fullPathToTestFeatureFile);
            Assert.NotNull(parsingResult);
        }
    }
}
