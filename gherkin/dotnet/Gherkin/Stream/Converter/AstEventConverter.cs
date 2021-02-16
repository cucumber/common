using System;
using System.Collections.Generic;
using System.Linq;
using Gherkin.Ast;
using Gherkin.Events.Args.Ast;
using Comment = Gherkin.Events.Args.Ast.Comment;
using Examples = Gherkin.Events.Args.Ast.Examples;
using Feature = Gherkin.Events.Args.Ast.Feature;
using Location = Gherkin.Events.Args.Ast.Location;
using Rule = Gherkin.Events.Args.Ast.Rule;
using Step = Gherkin.Events.Args.Ast.Step;
using StepsContainer = Gherkin.Events.Args.Ast.StepsContainer;

namespace Gherkin.Stream.Converter
{
    public class AstEventConverter
    {
        public GherkinDocumentEventArgs ConvertGherkinDocumentToEventArgs(GherkinDocument gherkinDocument, string sourceEventUri)
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

            return new Feature()
            {
                Name = feature.Name == string.Empty ? null : feature.Name,
                Description = feature.Description == string.Empty ? null : feature.Description,
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
                    var backgroundSteps = background.Steps.Select(s => ConvertStep(s)).ToList();
                    return new Children()
                    {
                        Background = new StepsContainer()
                        {
                            Location = ConvertLocation(background.Location),
                            Name = background.Name == string.Empty ? null : background.Name,
                            Keyword = background.Keyword,
                            Steps = backgroundSteps
                        }
                    };
                case Scenario scenario:
                    var steps = scenario.Steps.Select(s => ConvertStep(s)).ToList();
                    var examples = scenario.Examples.Select(ConvertExamples).ToReadOnlyCollection();
                    return new Children()
                    {
                        Scenario = new StepsContainer()
                        {
                            Keyword = scenario.Keyword,
                            Location = ConvertLocation(scenario.Location),
                            Name = scenario.Name == string.Empty ? null : scenario.Name,
                            Steps = steps,
                            Examples = examples,
                        }
                    };
                case Ast.Rule rule:
                    {
                        var ruleChildren = rule.Children.Select(ConvertToChildren).ToReadOnlyCollection();
                        return new Children()
                        {
                            Rule = new Rule()
                            {
                                Name = rule.Name == string.Empty ? null : rule.Name,
                                Keyword = rule.Keyword,
                                Children = ruleChildren,
                                Location = ConvertLocation(rule.Location)
                            }
                        };
                    }



                default:
                    throw new NotImplementedException();
            }

        }

        private Examples ConvertExamples(Ast.Examples examples)
        {
            var header = ConvertTableHeader(examples);
            var body = ConvertToTableBody(examples);
            return new Examples()
            {
                Name = examples.Name == string.Empty ? null : examples.Name,
                Keyword = examples.Keyword,
                Description = examples.Description,
                Location = ConvertLocation(examples.Location),
                TableHeader = header,
                TableBody = body
            };
        }

        private IReadOnlyCollection<TableBody> ConvertToTableBody(Ast.Examples examples)
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

        private TableHeader ConvertTableHeader(Ast.Examples examples)
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
    }
}