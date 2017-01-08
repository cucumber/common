using System.Diagnostics;
using System.IO;
using Gherkin.CLI;
using NUnit.Framework;

namespace Gherkin.Specs
{
    [TestFixture]
    public class TokenizationTests
    {
        [Test, TestCaseSource(typeof(TestFileProvider), "GetValidTestFiles")]
        public void TestSuccessfulTokenMatching(string testFeatureFile)
        {
            var featureFileFolder = Path.GetDirectoryName(testFeatureFile);
            Debug.Assert(featureFileFolder != null);
            var expectedTokensFile = testFeatureFile + ".tokens";

            var tokensText = TokensGenerator.TokensGenerator.GenerateTokens(testFeatureFile);
            var expectedTokensText = LineEndingHelper.NormalizeLineEndings(File.ReadAllText(expectedTokensFile));

            Assert.AreEqual(expectedTokensText, tokensText);
        }
    }
}
