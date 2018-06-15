using System.Diagnostics;
using System.IO;
using Gherkin.CLI;
using Xunit;

namespace Gherkin.Specs
{
    public class TokenizationTests
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulTokenMatching(string testFeatureFile)
        {
            var featureFileFolder = Path.GetDirectoryName(testFeatureFile);
            Debug.Assert(featureFileFolder != null);
            var expectedTokensFile = testFeatureFile + ".tokens";

            var tokensText = TokensGenerator.TokensGenerator.GenerateTokens(testFeatureFile);
            var expectedTokensText = LineEndingHelper.NormalizeLineEndings(File.ReadAllText(expectedTokensFile));

            Assert.Equal(expectedTokensText, tokensText);
        }
    }
}
