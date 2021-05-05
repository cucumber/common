using System;
using FluentAssertions;
using Gherkin.Specs.Helper;
using Gherkin.Stream;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using Gherkin.CucumberMessages;
using Gherkin.Events;

namespace Gherkin.Specs.Events
{
    public class EventTestBase
    {
        protected readonly IncrementingIdGenerator idGenerator = new IncrementingIdGenerator();
        
        protected void AssertEvents<T>(string testFeatureFile, List<T> actualGherkinDocumentEvent, List<T> expectedGherkinDocumentEvent, TestFile testFile) where T : IEvent
        {
            actualGherkinDocumentEvent.Should().BeEquivalentTo(expectedGherkinDocumentEvent,
               config => config
                   .AllowingInfiniteRecursion()
                   .IgnoringCyclicReferences()
                   .Excluding(ghe => ghe.SelectedMemberPath.EndsWith("Uri"))
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

        protected List<IEvent> ProcessGherkinEvents(string fullPathToTestFeatureFile, bool printSource, bool printAst, bool printPickles)
        {
            var raisedEvents = new List<IEvent>();

            SourceEvents sourceEvents = new SourceEvents(new List<string> { fullPathToTestFeatureFile });
            GherkinEvents gherkinEvents = new GherkinEvents(printSource, printAst, printPickles, idGenerator);
            foreach (var sourceEventEvent in sourceEvents)
            {
                foreach (IEvent evt in gherkinEvents.Iterable(sourceEventEvent))
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