package io.cucumber.gherkin.utils;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Comment;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class WalkGherkinDocument<Acc extends Accumulator> {
    /**
     * Walks a Gherkin Document, visiting each node depth first (in the order they appear in the source)
     *
     * @param gherkinDocument The gherkin document we want to walk
     * @param initialValue    the initial value of the traversal
     * @param h               handlers for each node type, which may return a new value
     * @return result the final value
     */
    public Acc walkGherkinDocument(
            GherkinDocument gherkinDocument,
            Acc initialValue,
            GherkinDocumentHandlers<Acc> h) {
        List<Comment> comments = new ArrayList<>(gherkinDocument.getComments());
        Acc acc = initialValue;
        if (!gherkinDocument.getFeature().isPresent()) {
            return acc;
        }
        Feature feature = gherkinDocument.getFeature().get();

        acc = walkFeature(feature, h, acc, comments);

        for (Comment comment : comments) {
            acc = walkComment(comment, h, acc);
        }

        return acc;
    }

    private Acc walkComment(Comment comment, GherkinDocumentHandlers<Acc> h, Acc acc) {
        if (acc.getDeepestLine() < comment.getLocation().getLine()) {
            acc = h.handleComment(comment, acc);
        }
        return acc;
    }

    private Acc walkFeature(Feature feature, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        acc.setDeepestLine(feature.getLocation().getLine());
        acc = walkTags(feature.getTags() == null ? Collections.emptyList() : feature.getTags(), h, acc, comments);
        acc = h.handleFeature(feature, acc);

        for (FeatureChild child : feature.getChildren()) {
            if (child.getBackground().isPresent()) {
                acc = walkBackground(child.getBackground().get(), h, acc, comments);
            } else if (child.getScenario().isPresent()) {
                acc = walkScenario(child.getScenario().get(), h, acc, comments);
            } else if (child.getRule().isPresent()) {
                acc = walkTags(child.getRule().get().getTags(), h, acc, comments);
                acc = h.handleRule(child.getRule().get(), acc);
                for (RuleChild ruleChild : child.getRule().get().getChildren()) {
                    if (ruleChild.getBackground().isPresent()) {
                        acc = walkBackground(ruleChild.getBackground().get(), h, acc, comments);
                    } else if (ruleChild.getScenario().isPresent()) {
                        acc = walkScenario(ruleChild.getScenario().get(), h, acc, comments);
                    }
                }
            }
        }
        return acc;
    }

    private Acc walkTags(List<Tag> tags, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        for (Tag tag : tags) {
            acc = walkTag(tag, h, acc, comments);
        }
        return acc;
    }

    private Acc walkTag(Tag tag, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        acc.setDeepestLine(tag.getLocation().getLine());
        acc = h.handleTag(tag, acc);
        return acc;
    }

    private Acc walkSteps(List<Step> steps, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        for (Step step : steps) {
            acc = walkStep(step, h, acc, comments);
        }
        return acc;
    }

    private Acc walkStep(Step step, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        acc.setDeepestLine(step.getLocation().getLine());
        acc = h.handleStep(step, acc);
        if (step.getDocString().isPresent()) {
            acc = h.handleDocString(step.getDocString().get(), acc);
        }
        if (step.getDataTable().isPresent()) {
            acc = h.handleDataTable(step.getDataTable().get(), acc);
            acc = walkTableRows(step.getDataTable().get().getRows(), h, acc, comments);
        }
        return acc;
    }

    private Acc walkTableRows(List<TableRow> tableRows, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        for (TableRow tableRow : tableRows) {
            acc = walkTableRow(tableRow, h, acc, comments);
        }
        return acc;
    }

    private Acc walkTableRow(TableRow tableRow, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        acc.setDeepestLine(tableRow.getLocation().getLine());
        acc = h.handleTableRow(tableRow, acc);
        for (TableCell tableCell : tableRow.getCells()) {
            acc = h.handleTableCell(tableCell, acc);
        }
        return acc;
    }

    private Acc walkScenario(Scenario scenario, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        acc.setDeepestLine(scenario.getLocation().getLine());
        acc = walkTags(scenario.getTags() != null ? scenario.getTags() : Collections.emptyList(), h, acc, comments);
        acc = h.handleScenario(scenario, acc);
        acc = walkSteps(scenario.getSteps(), h, acc, comments);

        if (scenario.getExamples() != null) {
            for (Examples examples : scenario.getExamples()) {
                acc = walkExamples(examples, h, acc, comments);
            }
        }
        return acc;
    }

    private Acc walkExamples(Examples examples, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        acc.setDeepestLine(examples.getLocation().getLine());
        acc = walkTags(examples.getTags() != null ? examples.getTags() : Collections.emptyList(), h, acc, comments);
        acc = h.handleExamples(examples, acc);
        if (examples.getTableHeader().isPresent()) {
            acc = walkTableRow(examples.getTableHeader().get(), h, acc, comments);
            acc = walkTableRows(examples.getTableBody(), h, acc, comments);
        }
        return acc;
    }

    private Acc walkBackground(Background background, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments) {
        acc.setDeepestLine(background.getLocation().getLine());
        acc = h.handleBackground(background, acc);
        return walkSteps(background.getSteps(), h, acc, comments);
    }
}
