package io.cucumber.gherkin.util;

import java.util.Collections;
import java.util.List;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Comment;
import io.cucumber.messages.types.Examples;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.FeatureChild;
import io.cucumber.messages.types.GherkinDocument;
import io.cucumber.messages.types.Location;
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
     * @param gherkinDocument The gherkin document we want to walk
     * @param initialValue    the initial value of the traversal
     * @param h               handlers for each node type, which may return a new value
     * @return result the final value
     */
    public static <Acc> Acc walkGherkinDocument(
            GherkinDocument gherkinDocument,
            Acc initialValue,
            GherkinDocumentHandlers<Acc> h) {
        List<Comment> comments = gherkinDocument.getComments();
        Acc acc = initialValue;
        Feature feature = gherkinDocument.getFeature();
        if (feature == null) {
            return acc;
        }
        Location deepestLocation = feature.getLocation();

        acc = walkTags(feature.getTags() == null ? Collections.emptyList() : feature.getTags(), h, acc, comments,
                deepestLocation);
        acc = h.handleFeature(feature, acc, comments, deepestLocation);

        for (FeatureChild child : feature.getChildren()) {
            if (child.getBackground() != null) {
                acc = walkBackground(child.getBackground(), h, acc, comments, deepestLocation);
            } else if (child.getScenario() != null) {
                acc = walkScenario(child.getScenario(), h, acc, comments, deepestLocation);
            } else if (child.getRule() != null) {
                acc = walkTags(child.getRule().getTags() != null ? child.getRule().getTags() : Collections.emptyList(),
                        h, acc, comments, deepestLocation);
                acc = h.handleRule(child.getRule(), acc, comments, deepestLocation);
                for (RuleChild ruleChild : child.getRule().getChildren()) {
                    if (ruleChild.getBackground() != null) {
                        acc = walkBackground(ruleChild.getBackground(), h, acc, comments, deepestLocation);
                    } else if (ruleChild.getScenario() != null) {
                        acc = walkScenario(ruleChild.getScenario(), h, acc, comments, deepestLocation);
                    }
                }
            }
        }

        for (Comment comment : comments) {
            if (deepestLocation.getLine() < comment.getLocation().getLine()) {
                acc = h.handleStandaloneComment(comment, acc);
            }
        }

        return acc;
    }

    public static <Acc> Acc walkTags(List<Tag> tags, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments,
                                     Location deepestLocation) {
        for (Tag tag : tags) {
            acc = h.handleTag(tag, acc, comments, deepestLocation);
        }
        return acc;
    }

    public static <Acc> Acc walkSteps(List<Step> steps, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments,
                                      Location deepestLocation) {
        for (Step step : steps) {
            acc = walkStep(step, h, acc, comments, deepestLocation);
        }
        return acc;
    }

    public static <Acc> Acc walkStep(Step step, GherkinDocumentHandlers<Acc> h, Acc acc, List<Comment> comments,
                                     Location deepestLocation) {
        deepestLocation.setLine(step.getLocation().getLine());
        acc = h.handleStep(step, acc, comments, deepestLocation);
        if (step.getDocString() != null) {
            acc = h.handleDocString(step.getDocString(), acc, comments, deepestLocation);
        }
        if (step.getDataTable() != null) {
            acc = h.handleDataTable(step.getDataTable(), acc, comments, deepestLocation);
            acc = walkTableRows(step.getDataTable().getRows(), h, acc, comments, deepestLocation);
        }
        return acc;
    }

    public static <Acc> Acc walkTableRows(List<TableRow> tableRows, GherkinDocumentHandlers<Acc> h, Acc acc,
                                          List<Comment> comments, Location deepestLocation) {
        for (TableRow tableRow : tableRows) {
            acc = walkTableRow(tableRow, h, acc, comments, deepestLocation);
        }
        return acc;
    }

    public static <Acc> Acc walkTableRow(TableRow tableRow, GherkinDocumentHandlers<Acc> h, Acc acc,
                                         List<Comment> comments, Location deepestLocation) {
        acc = h.handleTableRow(tableRow, acc, comments, deepestLocation);
        for (TableCell tableCell : tableRow.getCells()) {
            acc = h.handleTableCell(tableCell, acc, comments, deepestLocation);
        }
        return acc;
    }

    public static <Acc> Acc walkScenario(Scenario scenario, GherkinDocumentHandlers<Acc> h, Acc acc,
                                         List<Comment> comments, Location deepestLocation) {
        deepestLocation.setLine(scenario.getLocation().getLine());
        acc = walkTags(scenario.getTags() != null ? scenario.getTags() : Collections.emptyList(), h, acc, comments,
                deepestLocation);
        acc = h.handleScenario(scenario, acc, comments, deepestLocation);
        acc = walkSteps(scenario.getSteps(), h, acc, comments, deepestLocation);

        if (scenario.getExamples() != null) {
            for (Examples examples : scenario.getExamples()) {
                deepestLocation.setLine(examples.getLocation().getLine());
                acc = walkTags(examples.getTags() != null ? examples.getTags() : Collections.emptyList(), h, acc,
                        comments,
                        deepestLocation);
                acc = h.handleExamples(examples, acc, comments, deepestLocation);
                if (examples.getTableHeader() != null) {
                    acc = walkTableRow(examples.getTableHeader(), h, acc, comments, deepestLocation);
                    acc = walkTableRows(
                            examples.getTableBody() != null ? examples.getTableBody() : Collections.emptyList(), h,
                            acc, comments, deepestLocation);
                }
            }
        }
        return acc;
    }

    public static <Acc> Acc walkBackground(Background background, GherkinDocumentHandlers<Acc> h, Acc acc,
                                           List<Comment> comments, Location deepestLocation) {
        deepestLocation.setLine(background.getLocation().getLine());
        acc = h.handleBackground(background, acc, comments, deepestLocation);
        return walkSteps(background.getSteps(), h, acc, comments, deepestLocation);
    }


}