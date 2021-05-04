using System.Linq;
using FluentAssertions;
using Gherkin.Events;
using Gherkin.Specs.Helper;
using Xunit;

namespace Gherkin.Specs.Events
{
    public class PicklesTests : EventTestBase
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulAstBuilding(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "good", ".pickles.ndjson");

            var expectedContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedEvents = NDJsonParser.Deserialize<PickleEvent>(expectedContent);

            var raisedEvents = ProcessGherkinEvents(testFile.FullPath, false, false, true);

            raisedEvents.Should().AllBeOfType<PickleEvent>();

            AssertEvents(testFeatureFile, raisedEvents.Cast<PickleEvent>().ToList(), expectedEvents, testFile);
        }
    }
}
