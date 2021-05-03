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
using DataTable = Gherkin.Events.Args.Ast.DataTable;
using DocString = Gherkin.Events.Args.Ast.DocString;
using Tag = Gherkin.Events.Args.Ast.Tag;

namespace Gherkin.Stream.Converter
{
    public class AstEventConverter
    {
        private const string DefaultDescription = "";
        private const string DefaultName = "";
        private const string DefaultCellValue = "";

        private string UseDefault(string value, string defaultValue)
        {
            return string.IsNullOrEmpty(value) ? defaultValue : value;
        }
        
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

            var children = feature.Children.Select(ConvertToChildren).ToReadOnlyCollection();
            var tags = feature.Tags.Select(ConvertTag).ToReadOnlyCollection();

            return new Feature()
            {
                Name = UseDefault(feature.Name, DefaultName),
                Description = UseDefault(feature.Description, DefaultDescription),
                Keyword = feature.Keyword,
                Language = feature.Language,
                Location = ConvertLocation(feature.Location),
                Children = children,
                Tags = tags
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
                    var backgroundSteps = background.Steps.Select(ConvertStep).ToList();
                    return new Children()
                    {
                        Background = new StepsContainer()
                        {
                            Location = ConvertLocation(background.Location),
                            Name = UseDefault(background.Name, DefaultName),
                            Description = UseDefault(background.Description, DefaultDescription),
                            Keyword = background.Keyword,
                            Steps = backgroundSteps,
                            Examples = null,
                            Tags = null
                        }
                    };
                case Scenario scenario:
                    var steps = scenario.Steps.Select(ConvertStep).ToList();
                    var examples = scenario.Examples.Select(ConvertExamples).ToReadOnlyCollection();
                    var tags = scenario.Tags.Select(ConvertTag).ToReadOnlyCollection();
                    return new Children()
                    {
                        Scenario = new StepsContainer()
                        {
                            Keyword = scenario.Keyword,
                            Location = ConvertLocation(scenario.Location),
                            Name = UseDefault(scenario.Name, DefaultName),
                            Description = UseDefault(scenario.Description, DefaultDescription),
                            Steps = steps,
                            Examples = examples,
                            Tags = tags
                        }
                    };
                case Ast.Rule rule:
                    {
                        var ruleChildren = rule.Children.Select(ConvertToChildren).ToReadOnlyCollection();
                        var ruleTags = rule.Tags.Select(ConvertTag).ToReadOnlyCollection();
                        return new Children()
                        {
                            Rule = new Rule()
                            {
                                Name = UseDefault(rule.Name, DefaultName),
                                Description = UseDefault(rule.Description, DefaultDescription),
                                Keyword = rule.Keyword,
                                Children = ruleChildren,
                                Location = ConvertLocation(rule.Location),
                                Tags = ruleTags
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
            var tags = examples.Tags.Select(ConvertTag).ToReadOnlyCollection();
            return new Examples()
            {
                Name = UseDefault(examples.Name, DefaultName),
                Keyword = examples.Keyword,
                Description = UseDefault(examples.Description, DefaultDescription),
                Location = ConvertLocation(examples.Location),
                TableHeader = header,
                TableBody = body,
                Tags = tags
            };
        }

        private IReadOnlyCollection<TableBody> ConvertToTableBody(Ast.Examples examples)
        {
            if (examples.TableBody == null)
                return new List<TableBody>();

            return ConvertToTableRow(examples.TableBody);
        }

        private IReadOnlyCollection<TableBody> ConvertToTableRow(IEnumerable<TableRow> rows)
        {
            return rows.Select(b =>
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

        private Tag ConvertTag(Ast.Tag tag)
        {
            return new Tag()
            {
                Location = ConvertLocation(tag.Location),
                Name = tag.Name
            };
        }

        private Cell ConvertCell(TableCell c)
        {
            return new Cell()
            {
                Value = UseDefault(c.Value, DefaultCellValue),
                Location = ConvertLocation(c.Location)
            };
        }

        private Step ConvertStep(Ast.Step step)
        {
            DataTable dataTable = null;
            if (step.Argument is Gherkin.Ast.DataTable astDataTable) 
            {
                var rows = ConvertToTableRow(astDataTable.Rows);
                dataTable = new DataTable
                {
                    Rows = rows,
                    Location = ConvertLocation(astDataTable.Location)
                };
            }

            DocString docString = null;
           if (step.Argument is Gherkin.Ast.DocString astDocString) 
            {
                docString = new DocString
                {
                    Content = astDocString.Content,
                    MediaType = astDocString.ContentType,
                    Delimiter = astDocString.Delimiter ?? "\"\"\"", //TODO: store DocString delimiter in Gherkin AST
                    Location = ConvertLocation(astDocString.Location)
                };
            }

            return new Step()
            {
                Keyword = step.Keyword,
                Text = step.Text,
                DataTable = dataTable,
                DocString = docString,
                Location = ConvertLocation(step.Location)
            };
        }
    }
}