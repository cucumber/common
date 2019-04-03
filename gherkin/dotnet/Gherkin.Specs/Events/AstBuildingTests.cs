using System.Linq;
using FluentAssertions;
using Gherkin.Events;
using Gherkin.Specs.Helper;
using Xunit;

namespace Gherkin.Specs.Events
{
    public class AstBuildingTests : EventTestBase
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulAstBuilding(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "good", ".ast.ndjson");

            var expectedAstContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedGherkinDocumentEvent = NDJsonParser.Deserialize<GherkinDocumentEvent>(expectedAstContent);

            var raisedEvents = StartGherkinEventQueue(testFile.FullPath, false, true, false);

            raisedEvents.Should().AllBeOfType<GherkinDocumentEvent>();

            AssertEvents(testFeatureFile, raisedEvents.Cast<GherkinDocumentEvent>().ToList(), expectedGherkinDocumentEvent, testFile);
        }

        [Theory, MemberData(nameof(TestFileProvider.GetInvalidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestFailedAstBuilding(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "bad", ".errors.ndjson");

            var expectedAstContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedGherkinDocumentEvent = NDJsonParser.Deserialize<AttachmentEvent>(expectedAstContent);

            var raisedEvents = StartGherkinEventQueue(testFile.FullPath, false, true, false);

            raisedEvents.Should().AllBeOfType<AttachmentEvent>();

            AssertEvents(testFeatureFile, raisedEvents.Cast<AttachmentEvent>().ToList(), expectedGherkinDocumentEvent, testFile);
        }
    }
}
