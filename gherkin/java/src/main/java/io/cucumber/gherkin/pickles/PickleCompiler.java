package io.cucumber.gherkin.pickles;

import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.types.DataTable;
import io.cucumber.messages.types.DocString;
import io.cucumber.messages.types.Examples;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.FeatureChild;
import io.cucumber.messages.types.GherkinDocument;
import io.cucumber.messages.types.Pickle;
import io.cucumber.messages.types.PickleDocString;
import io.cucumber.messages.types.PickleStep;
import io.cucumber.messages.types.PickleStepArgument;
import io.cucumber.messages.types.PickleTable;
import io.cucumber.messages.types.PickleTableCell;
import io.cucumber.messages.types.PickleTableRow;
import io.cucumber.messages.types.PickleTag;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.RuleChild;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;
import io.cucumber.messages.types.TableCell;
import io.cucumber.messages.types.TableRow;
import io.cucumber.messages.types.Tag;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.Collections.unmodifiableList;

public class PickleCompiler {

    private final IdGenerator idGenerator;

    public PickleCompiler(IdGenerator idGenerator) {
        this.idGenerator = idGenerator;
    }

    public List<Pickle> compile(GherkinDocument gherkinDocument, String uri) {
        List<Pickle> pickles = new ArrayList<>();
        Feature feature = gherkinDocument.getFeature();
        if (feature == null) {
            return pickles;
        }

        String language = feature.getLanguage();

        compileFeature(pickles, feature, language, uri);
        return pickles;
    }

    private void compileFeature(List<Pickle> pickles, Feature feature, String language, String uri) {
        List<Tag> tags = feature.getTags();
        List<Step> featureBackgroundSteps = new ArrayList<>();
        for (FeatureChild featureChild : feature.getChildren()) {
            if (featureChild.getBackground() != null) {
                featureBackgroundSteps.addAll(featureChild.getBackground().getSteps());
            } else if (featureChild.getRule() != null) {
                compileRule(pickles, featureChild.getRule(), tags, featureBackgroundSteps, language, uri);
            } else {
                Scenario scenario = featureChild.getScenario();
                if (scenario.getExamples().isEmpty()) {
                    compileScenario(pickles, scenario, tags, featureBackgroundSteps, language, uri);
                } else {
                    compileScenarioOutline(pickles, scenario, tags, featureBackgroundSteps, language, uri);
                }
            }
        }
    }

    private void compileRule(List<Pickle> pickles, Rule rule, List<Tag> parentTags, List<Step> featureBackgroundSteps, String language, String uri) {
        List<Step> ruleBackgroundSteps = new ArrayList<>(featureBackgroundSteps);

        List<Tag> ruleTags = new ArrayList<>();
        ruleTags.addAll(parentTags);
        ruleTags.addAll(rule.getTags());

        for (RuleChild ruleChild : rule.getChildren()) {
            if (ruleChild.getBackground() != null) {
                ruleBackgroundSteps.addAll(ruleChild.getBackground().getSteps());
            } else {
                Scenario scenario = ruleChild.getScenario();
                if (scenario.getExamples().isEmpty()) {
                    compileScenario(pickles, scenario, ruleTags, ruleBackgroundSteps, language, uri);
                } else {
                    compileScenarioOutline(pickles, scenario, ruleTags, ruleBackgroundSteps, language, uri);
                }
            }
        }
    }

    private void compileScenario(List<Pickle> pickles, Scenario scenario, List<Tag> parentTags, List<Step> backgroundSteps, String language, String uri) {
        List<PickleStep> steps = new ArrayList<>();
        if (!scenario.getSteps().isEmpty())
            steps.addAll(pickleSteps(backgroundSteps));

        steps.addAll(pickleSteps(scenario.getSteps()));

        List<Tag> scenarioTags = new ArrayList<>();
        scenarioTags.addAll(parentTags);
        scenarioTags.addAll(scenario.getTags());

        List<String> sourceIds = singletonList(scenario.getId());

        Pickle pickle = new Pickle(
                idGenerator.newId(),
                uri,
                scenario.getName(),
                language,
                steps,
                pickleTags(scenarioTags),
                sourceIds
        );
        pickles.add(pickle);
    }

    private void compileScenarioOutline(List<Pickle> pickles, Scenario scenario, List<Tag> featureTags, List<Step> backgroundSteps, String language, String uri) {
        for (final Examples examples : scenario.getExamples()) {
            if (examples.getTableHeader() == null) continue;
            List<TableCell> variableCells = examples.getTableHeader().getCells();
            for (final TableRow valuesRow : examples.getTableBody()) {
                List<TableCell> valueCells = valuesRow.getCells();

                List<PickleStep> steps = new ArrayList<>();

                if (!scenario.getSteps().isEmpty())
                    steps.addAll(pickleSteps(backgroundSteps));


                List<Tag> tags = new ArrayList<>();
                tags.addAll(featureTags);
                tags.addAll(scenario.getTags());
                tags.addAll(examples.getTags());

                for (Step scenarioOutlineStep : scenario.getSteps()) {
                    PickleStep pickleStep = pickleStep(scenarioOutlineStep, variableCells, valuesRow);

                    steps.add(pickleStep);
                }

                List<String> sourceIds = asList(scenario.getId(), valuesRow.getId());
                Pickle pickle = new Pickle(
                        idGenerator.newId(),
                        uri,
                        interpolate(scenario.getName(), variableCells, valueCells),
                        language,
                        steps,
                        pickleTags(tags),
                        sourceIds
                );

                pickles.add(pickle);
            }
        }
    }

    private PickleTable pickleDataTable(DataTable dataTable, List<TableCell> variableCells, List<TableCell> valueCells) {
        List<TableRow> rows = dataTable.getRows();
        List<PickleTableRow> newRows = new ArrayList<>(rows.size());
        for (TableRow row : rows) {
            List<TableCell> cells = row.getCells();
            List<PickleTableCell> newCells = new ArrayList<>();
            for (TableCell cell : cells) {
                newCells.add(new PickleTableCell(interpolate(cell.getValue(), variableCells, valueCells)));
            }
            newRows.add(new PickleTableRow(newCells));
        }
        return new PickleTable(newRows);
    }

    private PickleDocString pickleDocString(DocString docString, List<TableCell> variableCells, List<TableCell> valueCells) {
        return new PickleDocString(
                docString.getMediaType() == null ? null : interpolate(docString.getMediaType(), variableCells, valueCells),
                interpolate(docString.getContent(), variableCells, valueCells)
        );
    }

    private PickleStep pickleStep(Step step, List<TableCell> variableCells, TableRow valuesRow) {
        List<TableCell> valueCells = valuesRow == null ? Collections.emptyList() : valuesRow.getCells();
        String stepText = interpolate(step.getText(), variableCells, valueCells);

        PickleStep pickleStep = new PickleStep();
        pickleStep.setId(idGenerator.newId());
        pickleStep.setAstNodeIds(singletonList(step.getId()));
        pickleStep.setText(stepText);
        if (valuesRow != null) {
            List<String> astNodeIds = Stream.of(pickleStep.getAstNodeIds(), singletonList(valuesRow.getId()))
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());
            pickleStep.setAstNodeIds(astNodeIds);
        }

        if (step.getDataTable() != null) {
            pickleStep.setArgument(new PickleStepArgument(null, pickleDataTable(step.getDataTable(), variableCells, valueCells)));
        }

        if (step.getDocString() != null) {
            pickleStep.setArgument(new PickleStepArgument(pickleDocString(step.getDocString(), variableCells, valueCells), null));
        }
        return pickleStep;
    }

    private List<PickleStep> pickleSteps(List<Step> steps) {
        List<PickleStep> result = new ArrayList<>();
        for (Step step : steps) {
            result.add(pickleStep(step));
        }
        return unmodifiableList(result);
    }

    private PickleStep pickleStep(Step step) {
        return pickleStep(step, Collections.emptyList(), null);
    }

    private String interpolate(String name, List<TableCell> variableCells, List<TableCell> valueCells) {
        int col = 0;
        for (TableCell variableCell : variableCells) {
            TableCell valueCell = valueCells.get(col++);
            String header = variableCell.getValue();
            String value = valueCell.getValue();
            name = name.replace("<" + header + ">", value);
        }
        return name;
    }

    private List<PickleTag> pickleTags(List<Tag> tags) {
        List<PickleTag> result = new ArrayList<>();
        for (Tag tag : tags) {
            result.add(pickleTag(tag));
        }
        return result;
    }

    private PickleTag pickleTag(Tag tag) {
        return new PickleTag(tag.getName(), tag.getId());
    }

}
