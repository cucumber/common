using System;
using System.Collections.Generic;
using System.Linq;
using Gherkin.CucumberMessages.Types;

// ReSharper disable PossibleMultipleEnumeration

namespace Gherkin.CucumberMessages.Pickles
{
    public class PickleCompiler
    {
        private readonly IIdGenerator _idGenerator;

        public PickleCompiler(IIdGenerator idGenerator)
        {
            _idGenerator = idGenerator;
        }

        public List<Pickle> Compile(GherkinDocument gherkinDocument)
        {
            var pickles = new List<Pickle>();
            var feature = gherkinDocument.Feature;
            if (feature == null)
            {
                return pickles;
            }

            var language = feature.Language;
            var tags = feature.Tags;

            BuildFeature(pickles, language, tags, Enumerable.Empty<PickleStep>, feature.Children, gherkinDocument.Uri);

            return pickles;
        }

        protected virtual void BuildFeature(List<Pickle> pickles, string language, IEnumerable<Tag> tags,
            Func<IEnumerable<PickleStep>> backgroundStepsFactory, IEnumerable<FeatureChild> children,
            string gherkinDocumentUri) 
        {
            if (children == null)
                return;

            foreach (var child in children)
            {
                if (child.Background != null)
                {
                    backgroundStepsFactory = BuildBackground(child.Background, backgroundStepsFactory);
                }
                else if (child.Rule != null)
                {
                    var mergedRuleTags = tags.Concat(child.Rule.Tags);
                    BuildRule(pickles, language, mergedRuleTags, backgroundStepsFactory, child.Rule.Children, gherkinDocumentUri);
                }
                else if (child.Scenario != null)
                {
                    BuildScenario(pickles, language, tags, backgroundStepsFactory, gherkinDocumentUri, child.Scenario);
                }
            }
        }

        protected virtual void BuildRule(List<Pickle> pickles, string language, IEnumerable<Tag> tags,
            Func<IEnumerable<PickleStep>> backgroundStepsFactory, IEnumerable<RuleChild> children,
            string gherkinDocumentUri) 
        {
            if (children == null)
                return;

            foreach (var child in children)
            {
                if (child.Background != null)
                {
                    backgroundStepsFactory = BuildBackground(child.Background, backgroundStepsFactory);
                }
                else if (child.Scenario != null)
                {
                    BuildScenario(pickles, language, tags, backgroundStepsFactory, gherkinDocumentUri, child.Scenario);
                }
            }
        }

        private Func<IEnumerable<PickleStep>> BuildBackground(Background background, Func<IEnumerable<PickleStep>> backgroundStepsFactory)
        {
            var previousFactory = backgroundStepsFactory;
            backgroundStepsFactory = () => previousFactory().Concat(PickleSteps(background.Steps));
            return backgroundStepsFactory;
        }

        private void BuildScenario(List<Pickle> pickles, string language, IEnumerable<Tag> tags, Func<IEnumerable<PickleStep>> backgroundStepsFactory, string gherkinDocumentUri, Scenario scenario)
        {
            if (!scenario.Examples.Any())
            {
                CompileScenario(pickles, backgroundStepsFactory, scenario, tags, language, gherkinDocumentUri);
            }
            else
            {
                CompileScenarioOutline(pickles, backgroundStepsFactory, scenario, tags, language, gherkinDocumentUri);
            }
        }

        protected virtual void CompileScenario(List<Pickle> pickles,
            Func<IEnumerable<PickleStep>> backgroundStepsFactory, Scenario scenario, IEnumerable<Tag> featureTags,
            string language, string gherkinDocumentUri)
        {
            var steps = new List<PickleStep>();
            if (scenario.Steps.Any())
                steps.AddRange(backgroundStepsFactory());

            var scenarioTags = new List<Tag>();
            scenarioTags.AddRange(featureTags);
            scenarioTags.AddRange(scenario.Tags);

            steps.AddRange(PickleSteps(scenario.Steps));

            Pickle pickle = new Pickle(
                    _idGenerator.GetNewId(),
                    gherkinDocumentUri,
                    scenario.Name,
                    language,
                    steps,
                    PickleTags(scenarioTags),
                    new []{ scenario.Id }
            );
            pickles.Add(pickle);
        }

        protected virtual void CompileScenarioOutline(List<Pickle> pickles,
            Func<IEnumerable<PickleStep>> backgroundStepsFactory, Scenario scenarioOutline,
            IEnumerable<Tag> featureTags, string language, string gherkinDocumentUri)
        {
            foreach (var examples in scenarioOutline.Examples)
            {
                if (examples.TableHeader == null) continue;
                var variableCells = examples.TableHeader.Cells;
                foreach (var values in examples.TableBody)
                {
                    var valueCells = values.Cells;

                    var steps = new List<PickleStep>();
                    if (scenarioOutline.Steps.Any())
                        steps.AddRange(backgroundStepsFactory());

                    var tags = new List<Tag>();
                    tags.AddRange(featureTags);
                    tags.AddRange(scenarioOutline.Tags);
                    tags.AddRange(examples.Tags);

                    foreach(var scenarioOutlineStep in scenarioOutline.Steps)
                    {
                        string stepText = Interpolate(scenarioOutlineStep.Text, variableCells, valueCells);

                        PickleStep pickleStep = CreatePickleStep(
                                scenarioOutlineStep,
                                stepText,
                                CreatePickleArgument(scenarioOutlineStep, variableCells, valueCells),
                                new[] { scenarioOutlineStep.Id, values.Id }
                        );
                        steps.Add(pickleStep);
                    }

                    Pickle pickle = new Pickle(
                            _idGenerator.GetNewId(),
                            gherkinDocumentUri,
                            Interpolate(scenarioOutline.Name, variableCells, valueCells),
                            language, 
                            steps,
                            PickleTags(tags),
                            new[] { scenarioOutline.Id, values.Id }
                    );

                    pickles.Add(pickle);
                }
            }
        }

        protected virtual PickleStep CreatePickleStep(Step step, string text, PickleStepArgument argument, IEnumerable<string> astNodeIds)
        {
            return new PickleStep(argument, astNodeIds, _idGenerator.GetNewId(), text);
        }

        protected virtual PickleStepArgument CreatePickleArgument(Step argument)
        {
            var noCells = Enumerable.Empty<TableCell>();
            return CreatePickleArgument(argument, noCells, noCells);
        }

        protected virtual PickleStepArgument CreatePickleArgument(Step step, IEnumerable<TableCell> variableCells, IEnumerable<TableCell> valueCells)
        {
            if (step.DataTable != null) {
                var t = step.DataTable;
                var rows = t.Rows;
                var newRows = new List<PickleTableRow>(rows.Count());
                foreach(var row in rows)
                {
                    var cells = row.Cells;
                    var newCells = new List<PickleTableCell>();
                    foreach(var cell in cells)
                    {
                        newCells.Add(
                                new PickleTableCell(
                                        Interpolate(cell.Value, variableCells, valueCells)
                                )
                        );
                    }
                    newRows.Add(new PickleTableRow(newCells));
                }
                return new PickleStepArgument
                    {
                        DataTable = new PickleTable(newRows)
                    };
            }

            if (step.DocString != null) {
                var ds = step.DocString;
                return
                    new PickleStepArgument
                    {
                        DocString = new PickleDocString(
                            Interpolate(ds.Content, variableCells, valueCells),
                            ds.MediaType == null ? null : Interpolate(ds.MediaType, variableCells, valueCells))
                    };
            } 
            
            return null;
        }

        protected virtual PickleStep[] PickleSteps(IEnumerable<Step> steps)
        {
            var result = new List<PickleStep>();
            foreach(var step in steps)
            {
                result.Add(PickleStep(step));
            }
            return result.ToArray();
        }

        protected virtual PickleStep PickleStep(Step step)
        {
            return CreatePickleStep(
                    step,
                    step.Text,
                    CreatePickleArgument(step),
                    new []{ step.Id }
            );
        }

        protected virtual string Interpolate(string name, IEnumerable<TableCell> variableCells, IEnumerable<TableCell> valueCells)
        {
            int col = 0;
            foreach (var variableCell in variableCells)
            {
                var valueCell = valueCells.ElementAt(col++);
                string header = variableCell.Value;
                string value = valueCell.Value;
                name = name.Replace("<" + header + ">", value);
            }
            return name;
        }

        protected virtual List<PickleTag> PickleTags(List<Tag> tags)
        {
            var result = new List<PickleTag>();
            foreach(var tag in tags)
            {
                result.Add(PickleTag(tag));
            }
            return result;
        }

        protected virtual PickleTag PickleTag(Tag tag)
        {
            return new PickleTag(tag.Name, tag.Id);
        }
    }
}
