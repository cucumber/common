package io.cucumber.gherkin.utils;

import java.util.List;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Comment;
import io.cucumber.messages.types.DataTable;
import io.cucumber.messages.types.DocString;
import io.cucumber.messages.types.Examples;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.Location;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;
import io.cucumber.messages.types.TableCell;
import io.cucumber.messages.types.TableRow;
import io.cucumber.messages.types.Tag;

public interface GherkinDocumentHandlers<Acc> {
    default Acc handleBackground(Background background, Acc content, List<Comment> comments,
                                 Location deepestLocation) {
        deepestLocation.setLine(background.getLocation().getLine());
        return content;
    }

    default Acc handleDataTable(DataTable dataTable, Acc content, List<Comment> comments,
                                Location deepestLocation) {
        deepestLocation.setLine(dataTable.getLocation().getLine());
        return content;
    }

    default Acc handleDocString(DocString docString, Acc content, List<Comment> comments,
                                Location deepestLocation) {
        deepestLocation.setLine(docString.getLocation().getLine());
        return content;
    }

    default Acc handleExamples(Examples examples, Acc content, List<Comment> comments,
                               Location deepestLocation) {
        deepestLocation.setLine(examples.getLocation().getLine());
        return content;
    }

    default Acc handleFeature(Feature feature, Acc content, List<Comment> comments,
                              Location deepestLocation) {
        deepestLocation.setLine(feature.getLocation().getLine());
        return content;
    }

    default Acc handleRule(Rule rule, Acc content, List<Comment> comments,
                           Location deepestLocation) {
        deepestLocation.setLine(rule.getLocation().getLine());
        return content;
    }

    default Acc handleScenario(Scenario scenario, Acc content, List<Comment> comments,
                               Location deepestLocation) {
        deepestLocation.setLine(scenario.getLocation().getLine());
        return content;
    }

    default Acc handleStep(Step step, Acc content, List<Comment> comments,
                           Location deepestLocation) {
        return content;
    }

    default Acc handleTableCell(TableCell tableCell, Acc content, List<Comment> comments,
                                Location deepestLocation) {
        deepestLocation.setLine(tableCell.getLocation().getLine());
        return content;
    }

    default Acc handleTableRow(TableRow tableRow, Acc content, List<Comment> comments,
                               Location deepestLocation) {
        deepestLocation.setLine(tableRow.getLocation().getLine());
        return content;
    }

    default Acc handleTag(Tag tag, Acc content, List<Comment> comments,
                          Location deepestLocation) {
        deepestLocation.setLine(tag.getLocation().getLine());
        return content;
    }

    default Acc handleStandaloneComment(Comment comment, Acc content) {
        return content;
    }
}