package gherkin.pickles;

import gherkin.SymbolCounter;
import io.cucumber.messages.Messages;
import io.cucumber.messages.Messages.GherkinDocument;
import io.cucumber.messages.Messages.GherkinDocument.Feature;
import io.cucumber.messages.Messages.GherkinDocument.Feature.FeatureChild;
import io.cucumber.messages.Messages.GherkinDocument.Feature.FeatureChild.Rule;
import io.cucumber.messages.Messages.GherkinDocument.Feature.TableRow.TableCell;
import io.cucumber.messages.Messages.GherkinDocument.Feature.Tag;
import io.cucumber.messages.Messages.Location;
import io.cucumber.messages.Messages.Pickle;
import io.cucumber.messages.Messages.Pickle.PickleStep;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import static java.util.Collections.unmodifiableList;

public class PickleCompiler {

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
        List<PickleStep> backgroundSteps = new ArrayList<>();
        for (FeatureChild child : feature.getChildrenList()) {
            if (child.hasBackground()) {
                backgroundSteps.addAll(pickleSteps(child.getBackground().getStepsList()));
            } else if (child.hasRule()) {
                compileRule(pickles, child.getRule(), tags, backgroundSteps, language, uri);
            } else {
                Feature.Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, scenario, tags, backgroundSteps, language, uri);
                } else {
                    compileScenarioOutline(pickles, scenario, tags, backgroundSteps, language, uri);
                }
            }
        }
    }

    private void compileRule(List<Pickle> pickles, Rule rule, List<Tag> tags, List<PickleStep> featureBackgroundSteps, String language, String uri) {
        List<PickleStep> backgroundSteps = new ArrayList<>(featureBackgroundSteps);
        for (FeatureChild.RuleChild child : rule.getChildrenList()) {
            if (child.hasBackground()) {
                backgroundSteps.addAll(pickleSteps(child.getBackground().getStepsList()));
            } else {
                Feature.Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, scenario, tags, backgroundSteps, language, uri);
                } else {
                    compileScenarioOutline(pickles, scenario, tags, backgroundSteps, language, uri);
                }
            }
        }
    }

    private void compileScenario(List<Pickle> pickles, Feature.Scenario scenario, List<Tag> parentTags, List<PickleStep> backgroundSteps, String language, String uri) {
        List<PickleStep> steps = new ArrayList<>();
        if (!scenario.getStepsList().isEmpty())
            steps.addAll(backgroundSteps);

        steps.addAll(pickleSteps(scenario.getStepsList()));

        List<Tag> scenarioTags = new ArrayList<>();
        scenarioTags.addAll(parentTags);
        scenarioTags.addAll(scenario.getTagsList());

        List<Pickle.PickleTag> pickleTags = pickleTags(scenarioTags);

        Pickle pickle = Pickle.newBuilder()
                .setUri(uri)
                .setName(scenario.getName())
                .setLanguage(language)
                .addAllSteps(steps)
                .addAllTags(pickleTags)
                .addLocations(scenario.getLocation())
                .build();
        pickles.add(pickle);
    }

    private void compileScenarioOutline(List<Pickle> pickles, Feature.Scenario scenario, List<Tag> featureTags, List<PickleStep> backgroundSteps, String language, String uri) {
        for (final Feature.Scenario.Examples examples : scenario.getExamplesList()) {
            if (examples.getTableHeader() == null) continue;
            List<TableCell> variableCells = examples.getTableHeader().getCellsList();
            for (final Feature.TableRow values : examples.getTableBodyList()) {
                List<TableCell> valueCells = values.getCellsList();

                List<PickleStep> steps = new ArrayList<>();

                if (!scenario.getStepsList().isEmpty())
                    steps.addAll(backgroundSteps);

                List<Tag> tags = new ArrayList<>();
                tags.addAll(featureTags);
                tags.addAll(scenario.getTagsList());
                tags.addAll(examples.getTagsList());

                for (Feature.Step scenarioOutlineStep : scenario.getStepsList()) {
                    PickleStep.Builder pickleStepBuilder = pickleStepBuilder(scenarioOutlineStep, variableCells, valueCells);

                    pickleStepBuilder.addLocations(values.getLocation());

                    steps.add(pickleStepBuilder.build());
                }

                Pickle pickle = Pickle.newBuilder()
                        .setUri(uri)
                        .setName(interpolate(scenario.getName(), variableCells, valueCells))
                        .setLanguage(language)
                        .addAllSteps(steps)
                        .addAllTags(pickleTags(tags))
                        .addLocations(scenario.getLocation())
                        .addLocations(values.getLocation())
                        .build();

                pickles.add(pickle);
            }
        }
    }

    private Messages.PickleStepArgument.PickleTable pickleDataTable(Feature.Step.DataTable dataTable, List<TableCell> variableCells, List<TableCell> valueCells) {
        List<Feature.TableRow> rows = dataTable.getRowsList();
        List<Messages.PickleStepArgument.PickleTable.PickleTableRow> newRows = new ArrayList<>(rows.size());
        for (Feature.TableRow row : rows) {
            List<TableCell> cells = row.getCellsList();
            List<Messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell> newCells = new ArrayList<>();
            for (TableCell cell : cells) {
                newCells.add(
                        Messages.PickleStepArgument.PickleTable.PickleTableRow.PickleTableCell.newBuilder()
                                .setLocation(cell.getLocation())
                                .setValue(interpolate(cell.getValue(), variableCells, valueCells))
                                .build()
                );
            }
            newRows.add(Messages.PickleStepArgument.PickleTable.PickleTableRow.newBuilder().addAllCells(newCells).build());
        }
        return Messages.PickleStepArgument.PickleTable.newBuilder().addAllRows(newRows).build();
    }

    private Messages.PickleStepArgument.PickleDocString pickleDocString(Feature.Step.DocString docString, List<TableCell> variableCells, List<TableCell> valueCells) {
        return Messages.PickleStepArgument.PickleDocString.newBuilder()
                .setLocation(docString.getLocation())
                .setContent(interpolate(docString.getContent(), variableCells, valueCells))
                .setContentType(Objects.requireNonNull(docString.getContentType() == null ? null : interpolate(docString.getContentType(), variableCells, valueCells)))
                .build();
    }

    private PickleStep.Builder pickleStepBuilder(Feature.Step step, List<TableCell> variableCells, List<TableCell> valueCells) {
        String stepText = interpolate(step.getText(), variableCells, valueCells);

        PickleStep.Builder pickleStepBuilder = PickleStep.newBuilder()
                .setText(stepText)
                .addLocations(pickleStepLocation(step));

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

    private List<PickleStep> pickleSteps(List<Feature.Step> steps) {
        List<PickleStep> result = new ArrayList<>();
        for (Feature.Step step : steps) {
            result.add(pickleStep(step));
        }
        return unmodifiableList(result);
    }

    private PickleStep pickleStep(Feature.Step step) {
        PickleStep.Builder pickleStepBuilder = pickleStepBuilder(step, Collections.<TableCell>emptyList(), Collections.<TableCell>emptyList());
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

    private Location pickleStepLocation(Feature.Step step) {
        return Location.newBuilder()
                .setLine(step.getLocation().getLine())
                .setColumn(step.getLocation().getColumn() + (step.getKeyword() != null ? SymbolCounter.countSymbols(step.getKeyword()) : 0))
                .build();
    }

    private List<Pickle.PickleTag> pickleTags(List<Tag> tags) {
        List<Pickle.PickleTag> result = new ArrayList<>();
        for (Tag tag : tags) {
            result.add(pickleTag(tag));
        }
        return result;
    }

    private Pickle.PickleTag pickleTag(Tag tag) {
        return Pickle.PickleTag.newBuilder()
                .setLocation(tag.getLocation())
                .setName(tag.getName())
                .build();
    }
}
