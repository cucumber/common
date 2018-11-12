using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using FluentAssertions;
using Gherkin.Events;
using Gherkin.Stream;
using Utf8Json;
using Xunit;

namespace Gherkin.Specs.Events
{
    public class AstBuildingTests
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulAstBuilding(string testFeatureFile)
        {
            var fullPathToTestFeatureFile = Path.Combine(TestFileProvider.GetTestFileFolder("good"), testFeatureFile);

            var featureFileFolder = Path.GetDirectoryName(fullPathToTestFeatureFile);
            Debug.Assert(featureFileFolder != null);
            var expectedAstFile = fullPathToTestFeatureFile + ".ast.ndjson";

            var expectedAstContent = File.ReadAllText(expectedAstFile, Encoding.UTF8);

            var expectedGherkinDocumentEvent = JsonSerializer.Deserialize<GherkinDocumentEvent>(expectedAstContent);


            var raisedEvents = new List<IEvent>();

            SourceEvents sourceEvents = new SourceEvents(new List<string>() { fullPathToTestFeatureFile });
            GherkinEvents gherkinEvents = new GherkinEvents(false, true, false);
            foreach (var sourceEventEvent in sourceEvents)
            {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent))
                {
                    raisedEvents.Add(evt);
                }
            }

            raisedEvents.Count.Should().Be(1);

            var onlyEvent = raisedEvents.Single();
            var actualGherkinDocumentEvent = (onlyEvent as GherkinDocumentEvent);

            actualGherkinDocumentEvent.Should().BeEquivalentTo(expectedGherkinDocumentEvent, config => config.Excluding(ghe => ghe.SelectedMemberPath.EndsWith("Uri")), $"{testFeatureFile} is not generating the same content as {expectedAstFile}");
        }

        [Theory, MemberData(nameof(TestFileProvider.GetInvalidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestFailedAstBuilding(string testFeatureFile)
        {
            var fullPathToTestFeatureFile = Path.Combine(TestFileProvider.GetTestFileFolder("bad"), testFeatureFile);

            var featureFileFolder = Path.GetDirectoryName(fullPathToTestFeatureFile);
            Debug.Assert(featureFileFolder != null);
            var expectedAstFile = fullPathToTestFeatureFile + ".errors.ndjson";

            var expectedPicklesContent = File.ReadAllText(expectedAstFile, Encoding.UTF8);

            var expectedPickleEvents = NDJsonParser.Deserialize<AttachmentEvent>(expectedPicklesContent);


            var raisedEvents = new List<IEvent>();

            SourceEvents sourceEvents = new SourceEvents(new List<string>() { fullPathToTestFeatureFile });
            GherkinEvents gherkinEvents = new GherkinEvents(false, true, false);
            foreach (var sourceEventEvent in sourceEvents)
            {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent))
                {
                    raisedEvents.Add(evt);
                }
            }


            raisedEvents.Should().AllBeOfType<AttachmentEvent>();

            raisedEvents.Should().BeEquivalentTo(expectedPickleEvents, config => config.Excluding(ghe => ghe.Args.Source.Uri).
                Using<string>(ctx =>
                {
                    ctx.Subject.Should().Be(ctx.Expectation?.Replace("\n", Environment.NewLine));
                }).WhenTypeIs<string>(), $"{testFeatureFile} is not generating the same content as {expectedAstFile}");
        }
    }
}
