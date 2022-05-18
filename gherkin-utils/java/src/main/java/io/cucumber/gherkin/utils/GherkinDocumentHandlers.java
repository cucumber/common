package io.cucumber.gherkin.utils;

import io.cucumber.gherkin.utils.Accumulator;
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

public interface GherkinDocumentHandlers<Acc extends Accumulator> {
    Acc handleBackground(Background background, Acc acc);

    Acc handleDataTable(DataTable dataTable, Acc acc);

    Acc handleDocString(DocString docString, Acc acc);

    Acc handleExamples(Examples examples, Acc acc);

    Acc handleFeature(Feature feature, Acc acc);

    Acc handleRule(Rule rule, Acc acc);

    Acc handleScenario(Scenario scenario, Acc acc);

    Acc handleStep(Step step, Acc acc);

    Acc handleTableCell(TableCell tableCell, Acc acc);

    Acc handleTableRow(TableRow tableRow, Acc acc);

    Acc handleTag(Tag tag, Acc acc);

    Acc handleComment(Comment comment, Acc acc);
}
