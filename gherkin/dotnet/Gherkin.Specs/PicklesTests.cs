using System.Linq;
using FluentAssertions;
using Gherkin.CucumberMessages.Types;
using Gherkin.Specs.Helper;
using Xunit;

namespace Gherkin.Specs
{
    public class PicklesTests : EventTestBase
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestPickleCompilation(string testFeatureFile)
        {
            var testFile = GetFullPathToTestFeatureFile(testFeatureFile, "good", ".pickles.ndjson");

            var expectedContent = GetExpectedContent(testFile.ExpectedFileFullPath);

            var expectedEvents = NDJsonParser.Deserialize<Envelope>(expectedContent);

            var raisedEvents = ProcessGherkinEvents(testFile.FullPath, false, false, true);

            raisedEvents.Should().Match(list => list.All(e => e.Pickle != null));
            AssertEvents(testFeatureFile, raisedEvents, expectedEvents, testFile);
        }
    }
}
