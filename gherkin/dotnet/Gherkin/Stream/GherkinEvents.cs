using Gherkin.Ast;
using Gherkin.Events;
using Gherkin.Events.Args;
using Gherkin.Pickles;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using Background = Gherkin.Ast.Background;
using Comment = Gherkin.Events.Args.Comment;
using Examples = Gherkin.Ast.Examples;
using Feature = Gherkin.Events.Args.Feature;
using Location = Gherkin.Events.Args.Location;
using Scenario = Gherkin.Ast.Scenario;
using Step = Gherkin.Events.Args.Step;

namespace Gherkin
{
    public class GherkinEvents
    {
        private readonly Parser parser = new Parser();
        private readonly Compiler compiler = new Compiler();

        bool printAst;
        bool printPickles;
        bool printSource;

        public GherkinEvents(bool printSource, bool printAst, bool printPickles)
        {
            this.printSource = printSource;
            this.printAst = printAst;
            this.printPickles = printPickles;
        }

        public IEnumerable<IEvent> Iterable(SourceEvent sourceEvent)
        {
            List<IEvent> events = new List<IEvent>();

            try
            {
                GherkinDocument gherkinDocument = parser.Parse(new StringReader(sourceEvent.data));

                if (printSource)
                {
                    events.Add(sourceEvent);
                }
                if (printAst)
                {
                    events.Add(new GherkinDocumentEvent(ConvertGherkinDocumentToEventArgs(gherkinDocument, sourceEvent.uri)));
                }
                if (printPickles)
                {
                    List<Pickle> pickles = compiler.Compile(gherkinDocument);
                    foreach (Pickle pickle in pickles)
                    {
                        events.Add(new PickleEvent(sourceEvent.uri, pickle));
                    }
                }
            }
            catch (CompositeParserException e)
            {
                foreach (ParserException error in e.Errors)
                {
                    addErrorAttachment(events, error, sourceEvent.uri);
                }
            }
            catch (ParserException e)
            {
                addErrorAttachment(events, e, sourceEvent.uri);
            }
            return events;
        }

        private GherkinDocumentEventArgs ConvertGherkinDocumentToEventArgs(GherkinDocument gherkinDocument, string sourceEventUri)
        {
            return new GherkinDocumentEventArgs()
            {
                Uri = sourceEventUri,
                Feature = ConvertFeature(gherkinDocument),
                Comments = ConvertComments(gherkinDocument)
            };
        }

        private IReadOnlyCollection<Comment> ConvertComments(GherkinDocument gherkinDocument)
        {
            return gherkinDocument.Comments.Select(c =>
                new Comment()
                {
                    Text = c.Text,
                    Location = ConvertLocation(c.Location)
                }).ToReadOnlyCollection();
        }

        private Feature ConvertFeature(GherkinDocument gherkinDocument)
        {
            var feature = gherkinDocument.Feature;
            if (feature == null)
            {
                return null;
            }

            return new Events.Args.Feature()
            {
                Name = feature.Name == string.Empty ? null : feature.Name,
                Keyword = feature.Keyword,
                Language = feature.Language,
                Location = ConvertLocation(feature.Location),
                Children = feature.Children.Select(ConvertToChildren).ToReadOnlyCollection()
            };
        }

        private static Location ConvertLocation(Ast.Location location)
        {
            return new Location(location.Column, location.Line);
        }


        private Children ConvertToChildren(IHasLocation hasLocation)
        {
            switch (hasLocation)
            {
                case Background background:
                    return new Children()
                    {
                        Background = new Events.Args.StepsContainer()
                        {
                            Location = ConvertLocation(background.Location),
                            Name = background.Name == string.Empty ? null : background.Name,
                            Keyword = background.Keyword,
                            Steps = background.Steps.Select(s => ConvertStep(s)).ToList()
                        }
                    };
                case Scenario scenario:
                    return new Children()
                    {
                        Scenario = new Events.Args.StepsContainer()
                        {
                            Keyword = scenario.Keyword,
                            Location = ConvertLocation(scenario.Location),
                            Name = scenario.Name == string.Empty ? null : scenario.Name,
                            Steps = scenario.Steps.Select(s => ConvertStep(s)).ToList(),
                            Examples = scenario.Examples.Select(ConvertExamples).ToReadOnlyCollection(),
                        }
                    };
                case Ast.Rule rule:
                    {
                        return new Children()
                        {
                            Rule = new Events.Args.Rule()
                            {
                                Name = rule.Name == string.Empty ? null : rule.Name,
                                Keyword = rule.Keyword,
                                Children = rule.Children.Select(ConvertToChildren).ToReadOnlyCollection(),
                                Location = ConvertLocation(rule.Location)
                            }
                        };
                    }



                default:
                    throw new NotImplementedException();
            }

        }

        private Events.Args.Examples ConvertExamples(Examples examples)
        {
            return new Events.Args.Examples()
            {
                Name = examples.Name == string.Empty ? null : examples.Name,
                Keyword = examples.Keyword,
                Description = examples.Description,
                Location = ConvertLocation(examples.Location),
                TableHeader = ConvertTableHeader(examples),
                TableBody = ConvertToTableBody(examples)

            };
        }

        private IReadOnlyCollection<TableBody> ConvertToTableBody(Examples examples)
        {
            if (examples.TableBody == null)
                return new List<TableBody>();

            return examples.TableBody.Select(b =>
                new TableBody()
                {
                    Location = ConvertLocation(b.Location),
                    Cells = b.Cells.Select(ConvertCell).ToReadOnlyCollection()
                }).ToReadOnlyCollection();
        }

        private TableHeader ConvertTableHeader(Examples examples)
        {
            if (examples.TableHeader == null)
                return null;

            return new TableHeader()
            {
                Location = ConvertLocation(examples.TableHeader.Location),
                Cells = examples.TableHeader.Cells.Select(ConvertCell).ToReadOnlyCollection()
            };
        }

        private Cell ConvertCell(TableCell c)
        {
            return new Cell()
            {
                Value = c.Value,
                Location = ConvertLocation(c.Location)
            };
        }

        private Step ConvertStep(Ast.Step step)
        {
            return new Step()
            {
                Keyword = step.Keyword,
                Text = step.Text,
                Location = ConvertLocation(step.Location)
            };
        }

        private void addErrorAttachment(List<IEvent> events, ParserException e, String uri)
        {
            events.Add(new AttachmentEvent(
                    new AttachmentEvent.SourceRef(
                            uri,
                            new AttachmentEvent.Location(
                                    e.Location.Line,
                                    e.Location.Column
                            )
                    ),
                    e.Message
            ));

        }
    }

    public static class IEnumerableExtensions
    {
        public static ReadOnlyCollection<T> ToReadOnlyCollection<T>(this IEnumerable<T> enumerable)
        {
            return new ReadOnlyCollection<T>(enumerable.ToList());
        }
    }
}
