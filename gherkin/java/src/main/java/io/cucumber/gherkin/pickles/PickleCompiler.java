package io.cucumber.gherkin.pickles;

import io.cucumber.gherkin.GherkinException;
import io.cucumber.gherkin.StringUtils;
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
import io.cucumber.messages.Messages.Location;
import io.cucumber.messages.Messages.Pickle;
import io.cucumber.messages.Messages.Pickle.PickleStep;
import io.cucumber.messages.Messages.Pickle.PickleTag;
import io.cucumber.messages.Messages.PickleStepArgument.PickleDocString;
import io.cucumber.messages.Messages.PickleStepArgument.PickleTable;
import io.cucumber.messages.Messages.PickleStepArgument.PickleTable.PickleTableRow;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.Collections.unmodifiableList;

public class PickleCompiler {

    public List<Pickle> compile(GherkinDocument gherkinDocument, String uri, String data) {
        List<Pickle> pickles = new ArrayList<>();
        Feature feature = gherkinDocument.getFeature();
        if (feature == null) {
            return pickles;
        }

        String language = feature.getLanguage();

        compileFeature(pickles, feature, language, uri, data);
        return pickles;
    }

    private void compileFeature(List<Pickle> pickles, Feature feature, String language, String uri, String data) {
        List<Tag> tags = feature.getTagsList();
        List<PickleStep> backgroundSteps = new ArrayList<>();
        for (FeatureChild child : feature.getChildrenList()) {
            if (child.hasBackground()) {
                backgroundSteps.addAll(pickleSteps(child.getBackground().getStepsList()));
            } else if (child.hasRule()) {
                compileRule(pickles, child.getRule(), tags, backgroundSteps, language, uri, data);
            } else {
                Feature.Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, scenario, tags, backgroundSteps, language, uri, data);
                } else {
                    compileScenarioOutline(pickles, scenario, tags, backgroundSteps, language, uri, data);
                }
            }
        }
    }

    private void compileRule(List<Pickle> pickles, Rule rule, List<Tag> tags, List<PickleStep> featureBackgroundSteps, String language, String uri, String data) {
        List<PickleStep> backgroundSteps = new ArrayList<>(featureBackgroundSteps);
        for (FeatureChild.RuleChild child : rule.getChildrenList()) {
            if (child.hasBackground()) {
                backgroundSteps.addAll(pickleSteps(child.getBackground().getStepsList()));
            } else {
                Feature.Scenario scenario = child.getScenario();
                if (scenario.getExamplesList().isEmpty()) {
                    compileScenario(pickles, scenario, tags, backgroundSteps, language, uri, data);
                } else {
                    compileScenarioOutline(pickles, scenario, tags, backgroundSteps, language, uri, data);
                }
            }
        }
    }

    private void compileScenario(List<Pickle> pickles, Feature.Scenario scenario, List<Tag> parentTags, List<PickleStep> backgroundSteps, String language, String uri, String data) {
        List<PickleStep> steps = new ArrayList<>();
        if (!scenario.getStepsList().isEmpty())
            steps.addAll(backgroundSteps);

        steps.addAll(pickleSteps(scenario.getStepsList()));

        List<Tag> scenarioTags = new ArrayList<>();
        scenarioTags.addAll(parentTags);
        scenarioTags.addAll(scenario.getTagsList());

        List<PickleTag> pickleTags = pickleTags(scenarioTags);

        List<Location> locations = singletonList(scenario.getLocation());
        Pickle pickle = Pickle.newBuilder()
                .setId(makeId(data, locations))
                .setUri(uri)
                .setName(scenario.getName())
                .setLanguage(language)
                .addAllSteps(steps)
                .addAllTags(pickleTags)
                .addAllLocations(locations)
                .build();
        pickles.add(pickle);
    }

    private void compileScenarioOutline(List<Pickle> pickles, Feature.Scenario scenario, List<Tag> featureTags, List<PickleStep> backgroundSteps, String language, String uri, String data) {
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

                List<Location> locations = asList(scenario.getLocation(), values.getLocation());
                Pickle pickle = Pickle.newBuilder()
                        .setId(makeId(data, locations))
                        .setUri(uri)
                        .setName(interpolate(scenario.getName(), variableCells, valueCells))
                        .setLanguage(language)
                        .addAllSteps(steps)
                        .addAllTags(pickleTags(tags))
                        .addAllLocations(locations)
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
                                .setLocation(cell.getLocation())
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
        PickleStep.Builder pickleStepBuilder = pickleStepBuilder(step, Collections.emptyList(), Collections.emptyList());
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
                .setColumn(step.getLocation().getColumn() + (step.getKeyword() != null ? StringUtils.symbolCount(step.getKeyword()) : 0))
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

    private String makeId(String data, List<Location> locations) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            digest.reset();
            digest.update(data.getBytes(StandardCharsets.UTF_8));
            for (Location location : locations) {
                digest.update(intToInt32LEbytes(location.getLine()));
                digest.update(intToInt32LEbytes(location.getColumn()));
            }
            return String.format("%040x", new BigInteger(1, digest.digest()));
        } catch (NoSuchAlgorithmException e) {
            throw new GherkinException("Could not create pickle ID", e);
        }
    }

    private byte[] intToInt32LEbytes(int line) {
        ByteBuffer buffer = ByteBuffer.allocate(4);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        return buffer.putInt(line).array();
    }
}
