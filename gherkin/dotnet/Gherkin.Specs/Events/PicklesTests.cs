using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using FluentAssertions;
using Gherkin.Events;
using Utf8Json;
using Xunit;

namespace Gherkin.Specs.Events
{
    public class PicklesTests
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulAstBuilding(string testFeatureFile)
        {
            var fullPathToTestFeatureFile = Path.Combine(TestFileProvider.GetTestFileFolder("good"), testFeatureFile);

            var featureFileFolder = Path.GetDirectoryName(fullPathToTestFeatureFile);
            Debug.Assert(featureFileFolder != null);
            var expectedAstFile = fullPathToTestFeatureFile + ".pickles.ndjson";

            var expectedAstContent = File.ReadAllText(expectedAstFile, Encoding.UTF8);

            //var expectedGherkinDocumentEvent = JsonSerializer.Deserialize<GherkinDocumentEvent>(expectedAstContent);


            var raisedEvents = new List<IEvent>();

            SourceEvents sourceEvents = new SourceEvents(new List<string>() { fullPathToTestFeatureFile });
            GherkinEvents gherkinEvents = new GherkinEvents(false, false, true);
            foreach (SourceEvent sourceEventEvent in sourceEvents)
            {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent))
                {
                    raisedEvents.Add(evt);
                }
            }

            raisedEvents.Count.Should().Be(1);

            
        }

        [Theory, MemberData(nameof(TestFileProvider.GetInvalidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestFailedAstBuilding(string testFeatureFile)
        {
            var fullPathToTestFeatureFile = Path.Combine(TestFileProvider.GetTestFileFolder("bad"), testFeatureFile);

            var featureFileFolder = Path.GetDirectoryName(fullPathToTestFeatureFile);
            Debug.Assert(featureFileFolder != null);

            var raisedEvents = new List<IEvent>();

            SourceEvents sourceEvents = new SourceEvents(new List<string>() { fullPathToTestFeatureFile });
            GherkinEvents gherkinEvents = new GherkinEvents(false, false, true);
            foreach (SourceEvent sourceEventEvent in sourceEvents)
            {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent))
                {
                    raisedEvents.Add(evt);
                }
            }

            raisedEvents.Should().AllBeOfType<AttachmentEvent>();
        }
    }
}
