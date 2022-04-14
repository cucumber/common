using System.Linq;
using FluentAssertions;
using Gherkin.CucumberMessages.Types;
using Gherkin.Specs.Helper;
using Xunit;

namespace Gherkin.Specs
{
    public class AstBuildingTests : EventTestBase
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulAstBuilding(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "good", ".ast.ndjson");
            var expectedAstContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedGherkinDocumentEvent = NDJsonParser.Deserialize<Envelope>(expectedAstContent);

            var raisedEvents = ProcessGherkinEvents(testFile.FullPath, false, true, false);

            raisedEvents.Should().Match(list => list.All(e => e.GherkinDocument != null));
            AssertEvents(testFeatureFile, raisedEvents, expectedGherkinDocumentEvent, testFile);
        }

        [Theory, MemberData(nameof(TestFileProvider.GetInvalidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestFailedAstBuilding(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "bad", ".errors.ndjson");
            var expectedAstContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedGherkinDocumentEvent = NDJsonParser.Deserialize<Envelope>(expectedAstContent);

            var raisedEvents = ProcessGherkinEvents(testFile.FullPath, false, true, false);

            raisedEvents.Should().Match(list => list.All(e => e.ParseError != null));
            AssertEvents(testFeatureFile, raisedEvents, expectedGherkinDocumentEvent, testFile);
        }
    }
}
