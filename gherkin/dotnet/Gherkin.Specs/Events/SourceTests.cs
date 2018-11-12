using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using FluentAssertions;
using Gherkin.Events;
using Gherkin.Stream;
using Xunit;

namespace Gherkin.Specs.Events
{
    public class SourceTests
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulAstBuilding(string testFeatureFile)
        {
            var fullPathToTestFeatureFile = Path.Combine(TestFileProvider.GetTestFileFolder("good"), testFeatureFile);

            var featureFileFolder = Path.GetDirectoryName(fullPathToTestFeatureFile);
            Debug.Assert(featureFileFolder != null);
            var expectedAstFile = fullPathToTestFeatureFile + ".source.ndjson";

            var expectedPicklesContent = File.ReadAllText(expectedAstFile, Encoding.UTF8);
            
            var expectedPickleEvents = NDJsonParser.Deserialize<SourceEvent>(expectedPicklesContent);


            var raisedEvents = new List<IEvent>();

            SourceEvents sourceEvents = new SourceEvents(new List<string>() { fullPathToTestFeatureFile });
            GherkinEvents gherkinEvents = new GherkinEvents(true, false, false);
            foreach (var sourceEventEvent in sourceEvents)
            {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent))
                {
                    raisedEvents.Add(evt);
                }
            }

            raisedEvents.Should().AllBeOfType<SourceEvent>();

            raisedEvents.Should().BeEquivalentTo(expectedPickleEvents, config => config.Excluding(ghe => ghe.SourceEventArgs.Uri).
                Using<string>(ctx =>
                {
                    ctx.Subject.Should().Be(ctx.Expectation?.Replace(Environment.NewLine, "\n")?.Replace("\n", Environment.NewLine));
                }).WhenTypeIs<string>(), $"{testFeatureFile} is not generating the same content as {expectedAstFile}");
        }
    }
}
