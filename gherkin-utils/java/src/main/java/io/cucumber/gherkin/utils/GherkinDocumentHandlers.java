package io.cucumber.gherkin.utils;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Comment;
import io.cucumber.messages.types.DataTable;
import io.cucumber.messages.types.DocString;
import io.cucumber.messages.types.Examples;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;
import io.cucumber.messages.types.TableCell;
import io.cucumber.messages.types.TableRow;
import io.cucumber.messages.types.Tag;

import java.util.List;

public interface GherkinDocumentHandlers<Acc extends Accumulator> {
    Acc handleBackground(Background background, Acc acc, List<Comment> comments);

    Acc handleDataTable(DataTable dataTable, Acc acc, List<Comment> comments);

    Acc handleDocString(DocString docString, Acc acc, List<Comment> comments);

    Acc handleExamples(Examples examples, Acc acc, List<Comment> comments);

    Acc handleFeature(Feature feature, Acc acc, List<Comment> comments);

    Acc handleRule(Rule rule, Acc acc, List<Comment> comments);

    Acc handleScenario(Scenario scenario, Acc acc, List<Comment> comments);

    Acc handleStep(Step step, Acc acc, List<Comment> comments);

    Acc handleTableCell(TableCell tableCell, Acc acc, List<Comment> comments);

    Acc handleTableRow(TableRow tableRow, Acc acc, List<Comment> comments);

    Acc handleTag(Tag tag, Acc acc, List<Comment> comments);

    Acc handleComment(Comment comment, Acc acc);
}
