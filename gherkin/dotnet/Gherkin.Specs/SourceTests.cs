using System.Linq;
using FluentAssertions;
using Gherkin.CucumberMessages.Types;
using Gherkin.Specs.Helper;
using Xunit;

namespace Gherkin.Specs
{
    public class SourceTests : EventTestBase
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSourceMessage(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "good", ".source.ndjson");

            var expectedAstContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedGherkinDocumentEvent = NDJsonParser.Deserialize<Envelope>(expectedAstContent);

            var raisedEvents = ProcessGherkinEvents(testFile.FullPath, true, false, false);

            raisedEvents.Should().Match(list => list.All(e => e.Source != null));
            AssertEvents(testFeatureFile, raisedEvents, expectedGherkinDocumentEvent, testFile);
        }
    }
}
