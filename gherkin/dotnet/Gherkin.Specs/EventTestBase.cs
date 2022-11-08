using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using FluentAssertions;
using Gherkin.CucumberMessages;
using Gherkin.CucumberMessages.Types;
using Gherkin.Specs.EventStubs;
using Gherkin.Specs.Helper;

namespace Gherkin.Specs
{
    public class EventTestBase
    {
        protected readonly IncrementingIdGenerator idGenerator = new IncrementingIdGenerator();
        
        protected void AssertEvents(string testFeatureFile, List<Envelope> actualGherkinDocumentEvent, List<Envelope> expectedGherkinDocumentEvent, TestFile testFile)
        {
            actualGherkinDocumentEvent.Should().BeEquivalentTo(expectedGherkinDocumentEvent,
               config => config
                   .AllowingInfiniteRecursion()
                   .IgnoringCyclicReferences()
                   .Excluding(ghe => ghe.Path.EndsWith("Uri"))
                   .Using<string>(ctx =>
                                    {
                                        var replacedSubject = NormalizeNewLines(ctx.Subject);
                                        var expectedSubject = NormalizeNewLines(ctx.Expectation);
                                        replacedSubject.Should().Be(expectedSubject);
                                    })
                   .WhenTypeIs<string>(),
               $"{testFeatureFile} is not generating the same content as {testFile.ExpectedFileFullPath}");
        }

        private string NormalizeNewLines(string value)
        {
            return value?.Replace("\r\n", "\n").Replace("\n", Environment.NewLine);
        }

        protected class TestFile
        {
            public string FullPath { get; set; }
            public string ExpectedFileFullPath { get; set; }
        }

        protected TestFile GetFullPathToTestFeatureFile(string testFeatureFile, string category, string filePostfix)
        {
            var fullPathToTestFeatureFile = Path.Combine(TestFileProvider.GetTestFileFolder(category), testFeatureFile);

            var featureFileFolder = Path.GetDirectoryName(fullPathToTestFeatureFile);
            Debug.Assert(featureFileFolder != null);
            var expectedAstFile = fullPathToTestFeatureFile + filePostfix;
            return new TestFile()
            {
                FullPath = fullPathToTestFeatureFile,
                ExpectedFileFullPath = expectedAstFile
            };
        }

        protected List<Envelope> ProcessGherkinEvents(string fullPathToTestFeatureFile, bool printSource, bool printAst, bool printPickles)
        {
            var raisedEvents = new List<Envelope>();

            var sourceProvider = new SourceProvider();
            var sources = sourceProvider.GetSources(new List<string> {fullPathToTestFeatureFile});
            var gherkinEventsProvider = new GherkinEventsProvider(printSource, printAst, printPickles, idGenerator);
            foreach (var source in sources)
            {
                foreach (var evt in gherkinEventsProvider.GetEvents(source))
                {
                    raisedEvents.Add(evt);
                }
            }

            return raisedEvents;
        }

        protected string GetExpectedContent(string expectedAstFile)
        {
            return File.ReadAllText(expectedAstFile, Encoding.UTF8);
        }
    }
}