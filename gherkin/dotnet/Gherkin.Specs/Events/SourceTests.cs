using System.Linq;
using FluentAssertions;
using Gherkin.Events;
using Gherkin.Specs.Helper;
using Xunit;

namespace Gherkin.Specs.Events
{
    public class SourceTests : EventTestBase
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulAstBuilding(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "good", ".source.ndjson");

            var expectedAstContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedGherkinDocumentEvent = NDJsonParser.Deserialize<SourceEvent>(expectedAstContent);

            var raisedEvents = StartGherkinEventQueue(testFile.FullPath, true, false, false);

            raisedEvents.Should().AllBeOfType<SourceEvent>();

            AssertEvents(testFeatureFile, raisedEvents.Cast<SourceEvent>().ToList(), expectedGherkinDocumentEvent, testFile);
        }
    }
}
