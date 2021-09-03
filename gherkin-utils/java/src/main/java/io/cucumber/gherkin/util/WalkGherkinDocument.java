package io.cucumber.gherkin.util;

import java.util.Collections;
import java.util.List;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Examples;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.FeatureChild;
import io.cucumber.messages.types.GherkinDocument;
import io.cucumber.messages.types.RuleChild;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;
import io.cucumber.messages.types.TableCell;
import io.cucumber.messages.types.TableRow;
import io.cucumber.messages.types.Tag;

public class WalkGherkinDocument {
    /**
     * Walks a Gherkin Document, visiting each node depth first (in the order they appear in the source)
     *
     * @param gherkinDocument
     * @param initialValue    the initial value of the traversal
     * @param h               handlers for each node type, which may return a new value
     * @return result the final value
     */
    public static <Acc> Acc walkGherkinDocument(
            GherkinDocument gherkinDocument,
            Acc initialValue,
            GherkinDocumentHandlers<Acc> h) {
        Acc acc = initialValue;
        Feature feature = gherkinDocument.getFeature();
        if (feature == null) {
            return acc;
        }
        acc = walkTags(feature.getTags() == null ? Collections.emptyList() : feature.getTags(), h, acc);
        acc = h.handleFeature(feature, acc);

        for (FeatureChild child : feature.getChildren()) {
            if (child.getBackground() != null) {
                acc = walkBackground(child.getBackground(), h, acc);
            } else if (child.getScenario() != null) {
                acc = walkScenario(child.getScenario(), h, acc);
            } else if (child.getRule() != null) {
                acc = walkTags(child.getRule().getTags() != null ? child.getRule().getTags() : Collections.emptyList(),
                        h, acc);
                acc = h.handleRule(child.getRule(), acc);
                for (RuleChild ruleChild : child.getRule().getChildren()) {
                    if (ruleChild.getBackground() != null) {
                        acc = walkBackground(ruleChild.getBackground(), h, acc);
                    } else if (ruleChild.getScenario() != null) {
                        acc = walkScenario(ruleChild.getScenario(), h, acc);
                    }
                }
            }
        }
        return acc;
    }

    public static <Acc> Acc walkTags(List<Tag> tags, GherkinDocumentHandlers<Acc> h, Acc acc) {
        for (Tag tag : tags) {
            acc = h.handleTag(tag, acc);
        }
        return acc;
    }

    public static <Acc> Acc walkSteps(List<Step> steps, GherkinDocumentHandlers<Acc> h, Acc acc) {
        for (Step step : steps) {
            acc = walkStep(step, h, acc);
        }
        return acc;
    }

    public static <Acc> Acc walkStep(Step step, GherkinDocumentHandlers<Acc> h, Acc acc) {
        acc = h.handleStep(step, acc);
        if (step.getDocString() != null) {
            acc = h.handleDocString(step.getDocString(), acc);
        }
        if (step.getDataTable() != null) {
            acc = h.handleDataTable(step.getDataTable(), acc);
            acc = walkTableRows(step.getDataTable().getRows(), h, acc);
        }
        return acc;
    }

    public static <Acc> Acc walkTableRows(List<TableRow> tableRows, GherkinDocumentHandlers<Acc> h, Acc acc) {
        for (TableRow tableRow : tableRows) {
            acc = walkTableRow(tableRow, h, acc);
        }
        return acc;
    }

    public static <Acc> Acc walkTableRow(TableRow tableRow, GherkinDocumentHandlers<Acc> h, Acc acc) {
        acc = h.handleTableRow(tableRow, acc);
        for (TableCell tableCell : tableRow.getCells()) {
            acc = h.handleTableCell(tableCell, acc);
        }
        return acc;
    }

    public static <Acc> Acc walkScenario(Scenario scenario, GherkinDocumentHandlers<Acc> h, Acc acc) {
        acc = walkTags(scenario.getTags() != null ? scenario.getTags() : Collections.emptyList(), h, acc);
        acc = h.handleScenario(scenario, acc);
        acc = walkSteps(scenario.getSteps(), h, acc);

        if (scenario.getExamples() != null) {
            for (Examples examples : scenario.getExamples()) {
                acc = walkTags(examples.getTags() != null ? examples.getTags() : Collections.emptyList(), h, acc);
                acc = h.handleExamples(examples, acc);
                if (examples.getTableHeader() != null) {
                    acc = walkTableRow(examples.getTableHeader(), h, acc);
                    acc = walkTableRows(
                            examples.getTableBody() != null ? examples.getTableBody() : Collections.emptyList(), h,
                            acc);
                }
            }
        }
        return acc;
    }

    public static <Acc> Acc walkBackground(Background background, GherkinDocumentHandlers<Acc> h, Acc acc) {
        acc = h.handleBackground(background, acc);
        return walkSteps(background.getSteps(), h, acc);
    }
}
