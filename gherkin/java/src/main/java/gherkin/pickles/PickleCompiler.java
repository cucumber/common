package gherkin.pickles;

import gherkin.SymbolCounter;
import io.cucumber.messages.Messages.DataTable;
import io.cucumber.messages.Messages.DocString;
import io.cucumber.messages.Messages.Examples;
import io.cucumber.messages.Messages.Feature;
import io.cucumber.messages.Messages.FeatureChild;
import io.cucumber.messages.Messages.GherkinDocument;
import io.cucumber.messages.Messages.Location;
import io.cucumber.messages.Messages.Pickle;
import io.cucumber.messages.Messages.PickleDocString;
import io.cucumber.messages.Messages.PickleStep;
import io.cucumber.messages.Messages.PickleTable;
import io.cucumber.messages.Messages.PickleTableCell;
import io.cucumber.messages.Messages.PickleTableRow;
import io.cucumber.messages.Messages.PickleTag;
import io.cucumber.messages.Messages.Rule;
import io.cucumber.messages.Messages.RuleChild;
import io.cucumber.messages.Messages.Scenario;
import io.cucumber.messages.Messages.Step;
import io.cucumber.messages.Messages.TableCell;
import io.cucumber.messages.Messages.TableRow;
import io.cucumber.messages.Messages.Tag;

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
        List<Tag> tags = feature.getTagsList();

        compileFeature(pickles, language, tags, feature, uri);
        return pickles;
    }

    private void compileFeature(List<Pickle> pickles, String language, List<Tag> tags, Feature feature, String uri) {
        List<PickleStep> backgroundSteps = new ArrayList<>();
        for (FeatureChild child : feature.getChildrenList()) {
            if (child.hasBackground()) {
                backgroundSteps.addAll(pickleSteps(child.getBackground().getStepsList()));
            } else if (child.hasRule()) {
                compileRule(pickles, language, tags, backgroundSteps, child.getRule(), uri);
            } else {
                Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, backgroundSteps, scenario, tags, language, uri);
                } else {
                    compileScenarioOutline(pickles, backgroundSteps, scenario, tags, language, uri);
                }
            }
        }
    }

    private void compileRule(List<Pickle> pickles, String language, List<Tag> tags, List<PickleStep> featureBackgroundSteps, Rule rule, String uri) {
        List<PickleStep> backgroundSteps = new ArrayList<>(featureBackgroundSteps);
        for (RuleChild child : rule.getChildrenList()) {
            if (child.hasBackground()) {
                backgroundSteps.addAll(pickleSteps(child.getBackground().getStepsList()));
            } else {
                Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, backgroundSteps, scenario, tags, language, uri);
                } else {
                    compileScenarioOutline(pickles, backgroundSteps, scenario, tags, language, uri);
                }
            }
        }
    }

    private void compileScenario(List<Pickle> pickles, List<PickleStep> backgroundSteps, Scenario scenario, List<Tag> parentTags, String language, String uri) {
        List<PickleStep> steps = new ArrayList<>();
        if (!scenario.getStepsList().isEmpty())
            steps.addAll(backgroundSteps);

        steps.addAll(pickleSteps(scenario.getStepsList()));

        List<Tag> scenarioTags = new ArrayList<>();
        scenarioTags.addAll(parentTags);
        scenarioTags.addAll(scenario.getTagsList());

        List<PickleTag> pickleTags = pickleTags(scenarioTags);

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

    private void compileScenarioOutline(List<Pickle> pickles, List<PickleStep> backgroundSteps, Scenario scenario, List<Tag> featureTags, String language, String uri) {
        for (final Examples examples : scenario.getExamplesList()) {
            if (examples.getTableHeader() == null) continue;
            List<TableCell> variableCells = examples.getTableHeader().getCellsList();
            for (final TableRow values : examples.getTableBodyList()) {
                List<TableCell> valueCells = values.getCellsList();

                List<PickleStep> steps = new ArrayList<>();

                if (!scenario.getStepsList().isEmpty())
                    steps.addAll(backgroundSteps);

                List<Tag> tags = new ArrayList<>();
                tags.addAll(featureTags);
                tags.addAll(scenario.getTagsList());
                tags.addAll(examples.getTagsList());

                for (Step scenarioOutlineStep : scenario.getStepsList()) {
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

    private PickleTable pickleDataTable(DataTable dataTable, List<TableCell> variableCells, List<TableCell> valueCells) {
        List<TableRow> rows = dataTable.getRowsList();
        List<PickleTableRow> newRows = new ArrayList<>(rows.size());
        for (TableRow row : rows) {
            List<TableCell> cells = row.getCellsList();
            List<PickleTableCell> newCells = new ArrayList<>();
            for (TableCell cell : cells) {
                newCells.add(
                        PickleTableCell.newBuilder()
                                .setLocation(cell.getLocation())
                                .setValue(interpolate(cell.getValue(), variableCells, valueCells))
                                .build()
                );
            }
            newRows.add(PickleTableRow.newBuilder().addAllCells(newCells).build());
        }
        return PickleTable.newBuilder().addAllRows(newRows).build();
    }

    private PickleDocString pickleDocString(DocString docString, List<TableCell> variableCells, List<TableCell> valueCells) {
        return PickleDocString.newBuilder()
                .setLocation(docString.getLocation())
                .setContent(interpolate(docString.getContent(), variableCells, valueCells))
                .setContentType(Objects.requireNonNull(docString.getContentType() == null ? null : interpolate(docString.getContentType(), variableCells, valueCells)))
                .build();
    }

    private PickleStep.Builder pickleStepBuilder(Step step, List<TableCell> variableCells, List<TableCell> valueCells) {
        String stepText = interpolate(step.getText(), variableCells, valueCells);

        PickleStep.Builder pickleStepBuilder = PickleStep.newBuilder()
                .setText(stepText)
                .addLocations(pickleStepLocation(step));

        if (step.hasDataTable()) {
            pickleStepBuilder.setDataTable(pickleDataTable(step.getDataTable(), variableCells, valueCells));
        }

        if (step.hasDocString()) {
            pickleStepBuilder.setDocString(pickleDocString(step.getDocString(), variableCells, valueCells));
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

    private Location pickleStepLocation(Step step) {
        return Location.newBuilder()
                .setLine(step.getLocation().getLine())
                .setColumn(step.getLocation().getColumn() + (step.getKeyword() != null ? SymbolCounter.countSymbols(step.getKeyword()) : 0))
                .build();
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
                .setLocation(tag.getLocation())
                .setName(tag.getName())
                .build();
    }
}
