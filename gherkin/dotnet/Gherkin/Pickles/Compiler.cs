using System;
using System.Collections.Generic;
using System.Linq;
using Gherkin.Ast;
using System.Globalization;
// ReSharper disable PossibleMultipleEnumeration

namespace Gherkin.Pickles
{
    public class Compiler
    {
        public List<Pickle> Compile(GherkinDocument gherkinDocument)
        {
            var pickles = new List<Pickle>();
            Feature feature = gherkinDocument.Feature;
            if (feature == null)
            {
                return pickles;
            }

            var featureTags = feature.Tags;
            var backgroundSteps = new PickleStep[0];

            foreach (var stepsContainer in feature.Children)
            {
                if (stepsContainer is Background)
                {
                    backgroundSteps = PickleSteps(stepsContainer);
                }
                else {
                    var scenario = (Scenario)stepsContainer;
                    if(!scenario.Examples.Any()) {
                        CompileScenario(pickles, backgroundSteps, scenario, featureTags, feature.Language);
                    } else {
                        CompileScenarioOutline(pickles, backgroundSteps, scenario, featureTags, feature.Language);
                    }
                }
            }
            return pickles;
        }

        protected virtual void CompileScenario(List<Pickle> pickles, IEnumerable<PickleStep> backgroundSteps, Scenario scenario, IEnumerable<Tag> featureTags, string language)
        {
            var steps = new List<PickleStep>();
            if (scenario.Steps.Any())
                steps.AddRange(backgroundSteps);

            var scenarioTags = new List<Tag>();
            scenarioTags.AddRange(featureTags);
            scenarioTags.AddRange(scenario.Tags);

            steps.AddRange(PickleSteps(scenario));

            Pickle pickle = new Pickle(
                    scenario.Name,
                    language,
                    steps,
                    PickleTags(scenarioTags),
                    SingletonList(PickleLocation(scenario.Location))
            );
            pickles.Add(pickle);
        }

        protected virtual IEnumerable<T> SingletonList<T>(T item)
        {
            return new[] { item };
        }

        protected virtual void CompileScenarioOutline(List<Pickle> pickles, IEnumerable<PickleStep> backgroundSteps, Scenario scenarioOutline, IEnumerable<Tag> featureTags, string language)
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
                        steps.AddRange(backgroundSteps);

                    var tags = new List<Tag>();
                    tags.AddRange(featureTags);
                    tags.AddRange(scenarioOutline.Tags);
                    tags.AddRange(examples.Tags);

                    foreach(var scenarioOutlineStep in scenarioOutline.Steps)
                    {
                        string stepText = Interpolate(scenarioOutlineStep.Text, variableCells, valueCells);

                        // TODO: Use an Array of location in DataTable/DocString as well.
                        // If the Gherkin AST classes supported
                        // a list of locations, we could just reuse the same classes

                        PickleStep pickleStep = CreatePickleStep(
                                scenarioOutlineStep,
                                stepText,
                                CreatePickleArguments(scenarioOutlineStep.Argument, variableCells, valueCells),
                                new[] {
                                        PickleLocation(values.Location),
                                        PickleStepLocation(scenarioOutlineStep)
                                }
                        );
                        steps.Add(pickleStep);
                    }

                    Pickle pickle = new Pickle(
                            Interpolate(scenarioOutline.Name, variableCells, valueCells),
                            language, 
                            steps,
                            PickleTags(tags),
                            new[] {
                                    PickleLocation(values.Location),
                                    PickleLocation(scenarioOutline.Location)
                            }
                    );

                    pickles.Add(pickle);
                }
            }
        }

        protected virtual PickleStep CreatePickleStep(Step step, string text, IEnumerable<Argument> arguments, IEnumerable<PickleLocation> locations)
        {
            return new PickleStep(text, arguments, locations);
        }

        protected virtual List<Argument> CreatePickleArguments(StepArgument argument)
        {
            var noCells = Enumerable.Empty<TableCell>();
            return CreatePickleArguments(argument, noCells, noCells);
        }

        protected virtual List<Argument> CreatePickleArguments(StepArgument argument, IEnumerable<TableCell> variableCells, IEnumerable<TableCell> valueCells)
        {
            var result = new List<Argument>();
            if (argument == null) return result;
            if (argument is DataTable) {
                DataTable t = (DataTable)argument;
                var rows = t.Rows;
                var newRows = new List<PickleRow>(rows.Count());
                foreach(var row in rows)
                {
                    var cells = row.Cells;
                    var newCells = new List<PickleCell>();
                    foreach(var cell in cells)
                    {
                        newCells.Add(
                                new PickleCell(
                                        PickleLocation(cell.Location),
                                        Interpolate(cell.Value, variableCells, valueCells)
                                )
                        );
                    }
                    newRows.Add(new PickleRow(newCells));
                }
                result.Add(new PickleTable(newRows));
            } else if (argument is DocString) {
                DocString ds = (DocString)argument;
                result.Add(
                        new PickleString(
                                PickleLocation(ds.Location),
                                Interpolate(ds.Content, variableCells, valueCells),
                                ds.ContentType == null ? null : Interpolate(ds.ContentType, variableCells, valueCells)
                        )
                );
            } else {
                throw new InvalidOperationException("Unexpected argument type: " + argument);
            }
            return result;
        }

        protected virtual PickleStep[] PickleSteps(StepsContainer scenarioDefinition)
        {
            var result = new List<PickleStep>();
            foreach(var step in scenarioDefinition.Steps)
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
                    CreatePickleArguments(step.Argument),
                    SingletonList(PickleStepLocation(step))
            );
        }

        protected virtual string Interpolate(string name, IEnumerable<TableCell> variableCells, IEnumerable<TableCell> valueCells)
        {
            int col = 0;
            foreach (var variableCell in variableCells)
            {
                TableCell valueCell = valueCells.ElementAt(col++);
                string header = variableCell.Value;
                string value = valueCell.Value;
                name = name.Replace("<" + header + ">", value);
            }
            return name;
        }

        protected virtual PickleLocation PickleStepLocation(Step step)
        {
            int stepLength = new StringInfo(step.Keyword).LengthInTextElements;
            return new PickleLocation(
                    step.Location.Line,
                    step.Location.Column + stepLength
            );
        }

        protected virtual PickleLocation PickleLocation(Location location)
        {
            return new PickleLocation(location.Line, location.Column);
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
            return new PickleTag(PickleLocation(tag.Location), tag.Name);
        }
    }
}
