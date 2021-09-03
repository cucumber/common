package org.gherkin.util;


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

public interface GherkinDocumentHandlers<Acc> {
    default Acc handleBackground(Background background, Acc content) {
        return content;
    }

    default Acc handleComment(Comment comment, Acc content)  {
        return content;
    }

    default Acc handleDataTable(DataTable dataTable, Acc content)  {
        return content;
    }

    default Acc handleDocString(DocString docString, Acc content)  {
        return content;
    }

    default Acc handleExamples(Examples examples, Acc content)  {
        return content;
    }

    default Acc handleFeature(Feature feature, Acc content)  {
        return content;
    }

    default Acc handleRule(Rule rule, Acc content)  {
        return content;
    }

    default Acc handleScenario(Scenario scenario, Acc content)  {
        return content;
    }

    default Acc handleStep(Step step, Acc content)  {
        return content;
    }

    default Acc handleTableCell(TableCell tableCell, Acc content)  {
        return content;
    }

    default Acc handleTableRow(TableRow tableRow, Acc content)  {
        return content;
    }

    default Acc handleTag(Tag tag, Acc content)  {
        return content;
    }
}
