package io.cucumber.gherkin.pickles;

import io.cucumber.gherkin.IdGenerator;
import io.cucumber.messages.Messages;
import io.cucumber.messages.Messages.GherkinDocument;
import io.cucumber.messages.Messages.GherkinDocument.Feature;
import io.cucumber.messages.Messages.GherkinDocument.Feature.FeatureChild;
import io.cucumber.messages.Messages.GherkinDocument.Feature.FeatureChild.Rule;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Scenario.Examples;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Step;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Step.DataTable;
import io.cucumber.messages.Messages.GherkinDocument.Feature.TableRow;
import io.cucumber.messages.Messages.GherkinDocument.Feature.TableRow.TableCell;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Tag;
import io.cucumber.messages.Messages.Pickle;
import io.cucumber.messages.Messages.Pickle.PickleStep;
import io.cucumber.messages.Messages.Pickle.PickleTag;
import io.cucumber.messages.Messages.PickleStepArgument.PickleDocString;
import io.cucumber.messages.Messages.PickleStepArgument.PickleTable;
import io.cucumber.messages.Messages.PickleStepArgument.PickleTable.PickleTableRow;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

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
        List<Tag> tags = feature.getTagsList();
        List<Step> featureBackgroundSteps = new ArrayList<>();
        for (FeatureChild child : feature.getChildrenList()) {
            if (child.hasBackground()) {
                featureBackgroundSteps.addAll(child.getBackground().getStepsList());
            } else if (child.hasRule()) {
                compileRule(pickles, child.getRule(), tags, featureBackgroundSteps, language, uri);
            } else {
                Feature.Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, scenario, tags, featureBackgroundSteps, language, uri);
                } else {
                    compileScenarioOutline(pickles, scenario, tags, featureBackgroundSteps, language, uri);
                }
            }
        }
    }

    private void compileRule(List<Pickle> pickles, Rule rule, List<Tag> tags, List<Step> featureBackgroundSteps, String language, String uri) {
        List<Step> ruleBackgroundSteps = new ArrayList<>(featureBackgroundSteps);
        for (FeatureChild.RuleChild child : rule.getChildrenList()) {
            if (child.hasBackground()) {
                ruleBackgroundSteps.addAll(child.getBackground().getStepsList());
            } else {
                Feature.Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, scenario, tags, ruleBackgroundSteps, language, uri);
                } else {
                    compileScenarioOutline(pickles, scenario, tags, ruleBackgroundSteps, language, uri);
                }
            }
        }
    }

    private void compileScenario(List<Pickle> pickles, Feature.Scenario scenario, List<Tag> parentTags, List<Step> backgroundSteps, String language, String uri) {
        List<PickleStep> steps = new ArrayList<>();
        if (!scenario.getStepsList().isEmpty())
            steps.addAll(pickleSteps(backgroundSteps));

        steps.addAll(pickleSteps(scenario.getStepsList()));

        List<Tag> scenarioTags = new ArrayList<>();
        scenarioTags.addAll(parentTags);
        scenarioTags.addAll(scenario.getTagsList());

        List<PickleTag> pickleTags = pickleTags(scenarioTags);

        List<String> sourceIds = singletonList(scenario.getId());
        Pickle pickle = Pickle.newBuilder()
                .setId(idGenerator.newId())
                .setUri(uri)
                .setName(scenario.getName())
                .setLanguage(language)
                .addAllSteps(steps)
                .addAllTags(pickleTags)
                .addAllAstNodeIds(sourceIds)
                .build();
        pickles.add(pickle);
    }

    private void compileScenarioOutline(List<Pickle> pickles, Feature.Scenario scenario, List<Tag> featureTags, List<Step> backgroundSteps, String language, String uri) {
        for (final Examples examples : scenario.getExamplesList()) {
            if (examples.getTableHeader() == null) continue;
            List<TableCell> variableCells = examples.getTableHeader().getCellsList();
            for (final TableRow valuesRow : examples.getTableBodyList()) {
                List<TableCell> valueCells = valuesRow.getCellsList();

                List<PickleStep> steps = new ArrayList<>();

                if (!scenario.getStepsList().isEmpty())
                    steps.addAll(pickleSteps(backgroundSteps));


                List<Tag> tags = new ArrayList<>();
                tags.addAll(featureTags);
                tags.addAll(scenario.getTagsList());
                tags.addAll(examples.getTagsList());

                for (Step scenarioOutlineStep : scenario.getStepsList()) {
                    PickleStep.Builder pickleStepBuilder = pickleStepBuilder(scenarioOutlineStep, variableCells, valuesRow);

                    steps.add(pickleStepBuilder.build());
                }

                List<String> sourceIds = asList(scenario.getId(), valuesRow.getId());
                Pickle pickle = Pickle.newBuilder()
                        .setId(idGenerator.newId())
                        .setUri(uri)
                        .setName(interpolate(scenario.getName(), variableCells, valueCells))
                        .setLanguage(language)
                        .addAllSteps(steps)
                        .addAllTags(pickleTags(tags))
                        .addAllAstNodeIds(sourceIds)
                        .build();

                pickles.add(pickle);
            }
        }
    }

    private PickleTable pickleDataTable(DataTable dataTable, List<TableCell> variableCells, List<TableCell> valueCells) {
        List<TableRow> rows = dataTable.getRowsList();
        List<PickleTableRow> newRows = new ArrayList<>(rows.size());
        for (TableRow row : rows) {
            List<TableCell> cells = row.getCellsList();
            List<PickleTableRow.PickleTableCell> newCells = new ArrayList<>();
            for (TableCell cell : cells) {
                newCells.add(
                        PickleTableRow.PickleTableCell.newBuilder()
                                .setValue(interpolate(cell.getValue(), variableCells, valueCells))
                                .build()
                );
            }
            newRows.add(PickleTableRow.newBuilder().addAllCells(newCells).build());
        }
        return PickleTable.newBuilder().addAllRows(newRows).build();
    }

    private PickleDocString pickleDocString(Step.DocString docString, List<TableCell> variableCells, List<TableCell> valueCells) {
        return PickleDocString.newBuilder()
                .setContent(interpolate(docString.getContent(), variableCells, valueCells))
                .setContentType(Objects.requireNonNull(docString.getContentType() == null ? null : interpolate(docString.getContentType(), variableCells, valueCells)))
                .build();
    }

    private PickleStep.Builder pickleStepBuilder(Step step, List<TableCell> variableCells, TableRow valuesRow) {
        List<TableCell> valueCells = valuesRow == null ? Collections.emptyList() : valuesRow.getCellsList();
        String stepText = interpolate(step.getText(), variableCells, valueCells);

        PickleStep.Builder pickleStepBuilder = PickleStep.newBuilder()
                .setId(idGenerator.newId())
                .addAstNodeIds(step.getId())
                .setText(stepText);
        if(valuesRow != null) {
            pickleStepBuilder.addAstNodeIds(valuesRow.getId());
        }

        if (step.hasDataTable()) {
            Messages.PickleStepArgument.Builder argument = Messages.PickleStepArgument.newBuilder();
            argument.setDataTable(pickleDataTable(step.getDataTable(), variableCells, valueCells));
            pickleStepBuilder.setArgument(argument);
        }

        if (step.hasDocString()) {
            Messages.PickleStepArgument.Builder argument = Messages.PickleStepArgument.newBuilder();
            argument.setDocString(pickleDocString(step.getDocString(), variableCells, valueCells));
            pickleStepBuilder.setArgument(argument);
        }
        return pickleStepBuilder;
    }

    private List<PickleStep> pickleSteps(List<Step> steps) {
        List<PickleStep> result = new ArrayList<>();
        for (Step step : steps) {
            result.add(pickleStep(step));
        }
        return unmodifiableList(result);
    }

    private PickleStep pickleStep(Step step) {
        PickleStep.Builder pickleStepBuilder = pickleStepBuilder(step, Collections.emptyList(), null);
        return pickleStepBuilder.build();
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
        return PickleTag.newBuilder()
                .setName(tag.getName())
                .setAstNodeId(tag.getId())
                .build();
    }

}
