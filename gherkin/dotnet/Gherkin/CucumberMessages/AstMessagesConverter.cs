using System;
using System.Collections.Generic;
using System.Linq;
using Gherkin.Ast;
using Gherkin.CucumberMessages.Types;
using Background = Gherkin.CucumberMessages.Types.Background;
using Comment = Gherkin.CucumberMessages.Types.Comment;
using Examples = Gherkin.CucumberMessages.Types.Examples;
using Feature = Gherkin.CucumberMessages.Types.Feature;
using Location = Gherkin.CucumberMessages.Types.Location;
using Rule = Gherkin.CucumberMessages.Types.Rule;
using Step = Gherkin.CucumberMessages.Types.Step;
using DataTable = Gherkin.CucumberMessages.Types.DataTable;
using DocString = Gherkin.CucumberMessages.Types.DocString;
using GherkinDocument = Gherkin.CucumberMessages.Types.GherkinDocument;
using Scenario = Gherkin.CucumberMessages.Types.Scenario;
using TableCell = Gherkin.CucumberMessages.Types.TableCell;
using TableRow = Gherkin.CucumberMessages.Types.TableRow;
using Tag = Gherkin.CucumberMessages.Types.Tag;

namespace Gherkin.CucumberMessages
{
    public class AstMessagesConverter
    {
        private readonly IIdGenerator _idGenerator;

        public AstMessagesConverter(IIdGenerator idGenerator)
        {
            _idGenerator = idGenerator;
        }

        public GherkinDocument ConvertGherkinDocumentToEventArgs(Ast.GherkinDocument gherkinDocument, string sourceEventUri)
        {
            return new GherkinDocument()
            {
                Uri = sourceEventUri,
                Feature = ConvertFeature(gherkinDocument),
                Comments = ConvertComments(gherkinDocument)
            };
        }

        private IReadOnlyCollection<Comment> ConvertComments(Ast.GherkinDocument gherkinDocument)
        {
            return gherkinDocument.Comments.Select(c =>
                new Comment()
                {
                    Text = c.Text,
                    Location = ConvertLocation(c.Location)
                }).ToReadOnlyCollection();
        }

        private Feature ConvertFeature(Ast.GherkinDocument gherkinDocument)
        {
            var feature = gherkinDocument.Feature;
            if (feature == null)
            {
                return null;
            }

            var children = feature.Children.Select(ConvertToFeatureChild).ToReadOnlyCollection();
            var tags = feature.Tags.Select(ConvertTag).ToReadOnlyCollection();

            return new Feature()
            {
                Name = CucumberMessagesDefaults.UseDefault(feature.Name, CucumberMessagesDefaults.DefaultName),
                Description = CucumberMessagesDefaults.UseDefault(feature.Description, CucumberMessagesDefaults.DefaultDescription),
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

        private FeatureChild ConvertToFeatureChild(IHasLocation hasLocation)
        {
            var tuple = ConvertToChild(hasLocation);
            return new FeatureChild(tuple.Item3, tuple.Item1, tuple.Item2);
        }
        
        private RuleChild ConvertToRuleChild(IHasLocation hasLocation)
        {
            var tuple = ConvertToChild(hasLocation);
            return new RuleChild(tuple.Item1, tuple.Item3);
        }
        
        private Tuple<Background, Rule, Scenario> ConvertToChild(IHasLocation hasLocation)
        {
            switch (hasLocation)
            {
                case Gherkin.Ast.Background background:
                    var backgroundSteps = background.Steps.Select(ConvertStep).ToList();
                    return new Tuple<Background, Rule, Scenario>(new Background
                        {
                            Id = _idGenerator.GetNewId(),
                            Location = ConvertLocation(background.Location),
                            Name = CucumberMessagesDefaults.UseDefault(background.Name, CucumberMessagesDefaults.DefaultName),
                            Description = CucumberMessagesDefaults.UseDefault(background.Description, CucumberMessagesDefaults.DefaultDescription),
                            Keyword = background.Keyword,
                            Steps = backgroundSteps
                        }, null, null);
                case Ast.Scenario scenario:
                    var steps = scenario.Steps.Select(ConvertStep).ToList();
                    var examples = scenario.Examples.Select(ConvertExamples).ToReadOnlyCollection();
                    var tags = scenario.Tags.Select(ConvertTag).ToReadOnlyCollection();
                    return new Tuple<Background, Rule, Scenario>(null, null, new Scenario()
                        {
                            Id = _idGenerator.GetNewId(),
                            Keyword = scenario.Keyword,
                            Location = ConvertLocation(scenario.Location),
                            Name = CucumberMessagesDefaults.UseDefault(scenario.Name, CucumberMessagesDefaults.DefaultName),
                            Description = CucumberMessagesDefaults.UseDefault(scenario.Description, CucumberMessagesDefaults.DefaultDescription),
                            Steps = steps,
                            Examples = examples,
                            Tags = tags
                        });
                case Ast.Rule rule:
                    {
                        var ruleChildren = rule.Children.Select(ConvertToRuleChild).ToReadOnlyCollection();
                        var ruleTags = rule.Tags.Select(ConvertTag).ToReadOnlyCollection();
                        return new Tuple<Background, Rule, Scenario>(null, new Rule
                            {
                                Id = _idGenerator.GetNewId(),
                                Name = CucumberMessagesDefaults.UseDefault(rule.Name, CucumberMessagesDefaults.DefaultName),
                                Description = CucumberMessagesDefaults.UseDefault(rule.Description, CucumberMessagesDefaults.DefaultDescription),
                                Keyword = rule.Keyword,
                                Children = ruleChildren,
                                Location = ConvertLocation(rule.Location),
                                Tags = ruleTags
                            }, null);
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
                Id = _idGenerator.GetNewId(),
                Name = CucumberMessagesDefaults.UseDefault(examples.Name, CucumberMessagesDefaults.DefaultName),
                Keyword = examples.Keyword,
                Description = CucumberMessagesDefaults.UseDefault(examples.Description, CucumberMessagesDefaults.DefaultDescription),
                Location = ConvertLocation(examples.Location),
                TableHeader = header,
                TableBody = body,
                Tags = tags
            };
        }

        private IReadOnlyCollection<TableRow> ConvertToTableBody(Ast.Examples examples)
        {
            if (examples.TableBody == null)
                return new List<TableRow>();

            return ConvertToTableRow(examples.TableBody);
        }

        private IReadOnlyCollection<TableRow> ConvertToTableRow(IEnumerable<Gherkin.Ast.TableRow> rows)
        {
            return rows.Select(b =>
                new TableRow
                {
                    Id = _idGenerator.GetNewId(),
                    Location = ConvertLocation(b.Location),
                    Cells = b.Cells.Select(ConvertCell).ToReadOnlyCollection()
                }).ToReadOnlyCollection();
        }

        private TableRow ConvertTableHeader(Ast.Examples examples)
        {
            if (examples.TableHeader == null)
                return null;

            return new TableRow
            {
                Id = _idGenerator.GetNewId(),
                Location = ConvertLocation(examples.TableHeader.Location),
                Cells = examples.TableHeader.Cells.Select(ConvertCell).ToReadOnlyCollection()
            };
        }

        private Tag ConvertTag(Ast.Tag tag)
        {
            return new Tag
            {
                Id = _idGenerator.GetNewId(),
                Location = ConvertLocation(tag.Location),
                Name = tag.Name
            };
        }

        private TableCell ConvertCell(Ast.TableCell c)
        {
            return new TableCell()
            {
                Value = CucumberMessagesDefaults.UseDefault(c.Value, CucumberMessagesDefaults.DefaultCellValue),
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
                Id = _idGenerator.GetNewId(),
                Keyword = step.Keyword,
                Text = step.Text,
                DataTable = dataTable,
                DocString = docString,
                Location = ConvertLocation(step.Location)
            };
        }
    }
}