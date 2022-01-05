package io.cucumber.gherkin.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.cucumber.gherkin.GherkinDocumentBuilder;
import io.cucumber.gherkin.Parser;
import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.types.GherkinDocument;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PrettyPrintGherkinDocumentTest {

    Parser<GherkinDocument> parser;

    @BeforeEach
    public void beforeEach() {
        IdGenerator idGen = new IdGenerator.Incrementing();
        parser = new Parser<>(new GherkinDocumentBuilder(idGen));
    }

    @Test
    public void emptyFile() {
        GherkinDocument gherkinDocument = parser.parse("");
        assertEquals("", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void scenarioOutlineWithExamples() {
        GherkinDocument gherkinDocument = parser.parse("    Feature: Overdue tasks\n" +
                "  Let users know when tasks are overdue, even when using other\n" +
                "  features of the app\n\n\n" +
                "\n\n\n\n" +
                "      Scenario Outline: eating\n" +
                "  Given there are <start> cucumbers\n" +
                "          When I eat <eat> cucumbers\n" +
                " Then I should have <left> cucumbers\n" +
                "\n" +
                "     Examples: \n" +
                "    | start | eat |left|\n" +
                "      |12 |    5 |             7 |\n" +
                "   |20|   5 |                             15 |\n");
        assertEquals("Feature: Overdue tasks\n" +
                "  Let users know when tasks are overdue, even when using other\n" +
                "  features of the app\n" +
                "\n" +
                "  Scenario Outline: eating\n" +
                "    Given there are <start> cucumbers\n" +
                "    When I eat <eat> cucumbers\n" +
                "    Then I should have <left> cucumbers\n" +
                "\n" +
                "    Examples:\n" +
                "      | start | eat | left |\n" +
                "      | 12    | 5   | 7    |\n" +
                "      | 20    | 5   | 15   |\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void languageHeaderIsNotEn() {
        GherkinDocument gherkinDocument = parser.parse("# language: no\n" +
                "Egenskap: hallo");
        assertEquals("# language: no\n" +
                "Egenskap: hallo\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void emptyScenarios() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "\n" +
                "  Scenario: Two");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "\n" +
                "  Scenario: Two\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void twoScenarios() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "    Given hello\n" +
                "\n" +
                "  Scenario: two\n" +
                "    Given world");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "    Given hello\n" +
                "\n" +
                "  Scenario: two\n" +
                "    Given world\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void twoScenariosInRule() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  Rule: ok\n" +
                "\n" +
                "    Scenario: one\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      Given world\n");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Rule: ok\n" +
                "\n" +
                "    Scenario: one\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      Given world\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void featureWithBackgroundAndScenario() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  Background: bbb\n" +
                "    Given hello\n" +
                "\n" +
                "  Scenario: two\n" +
                "    Given world");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Background: bbb\n" +
                "    Given hello\n" +
                "\n" +
                "  Scenario: two\n" +
                "    Given world\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void ruleWithBackgroundAndScenario() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  Rule: machin\n" +
                "\n" +
                "    Background: bbb\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      Given world\n");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Rule: machin\n" +
                "\n" +
                "    Background: bbb\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      Given world\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void tags() {
        GherkinDocument gherkinDocument = parser.parse("@featureTag\n" +
                "Feature: hello\n" +
                "\n" +
                "  Rule: machin\n" +
                "\n" +
                "    Background: bbb\n" +
                "      Given hello\n" +
                "\n" +
                "    @scenarioTag @secondTag\n" +
                "    Scenario: two\n" +
                "      Given world\n");
        assertEquals("@featureTag\n" +
                "Feature: hello\n" +
                "\n" +
                "  Rule: machin\n" +
                "\n" +
                "    Background: bbb\n" +
                "      Given hello\n" +
                "\n" +
                "    @scenarioTag @secondTag\n" +
                "    Scenario: two\n" +
                "      Given world\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void exampleTables() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  # i am tag hear me roar\n" +
                "  Scenario: one\n" +
                "    #some comment in the scenario\n" +
                "    Given a a <text> and a <number>\n" +
                "\n" +
                "    # comment1 is here   \n  " +
                "    Examples: some data\n" +
                " # comment2 is here     \n" +
                "      | text | number |\n" +
                "      | a    |      1 |\n" +
                "      | ab   |     10 |\n" +
                "      | abc  |    100 |\n");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  # i am tag hear me roar\n" +
                "  Scenario: one\n" +
                "    # some comment in the scenario\n" +
                "    Given a a <text> and a <number>\n" +
                "\n" +
                "    # comment1 is here\n" +
                "    Examples: some data\n" +
                "      # comment2 is here\n" +
                "      | text | number |\n" +
                "      | a    | 1      |\n" +
                "      | ab   | 10     |\n" +
                "      | abc  | 100    |\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void dataTables() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "    Given a data table:\n" +
                "      | text | numbers |\n" +
                "      | a    |       1 |\n" +
                "      | ab   |      10 |\n" +
                "      | abc  |     100 |\n");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "    Given a data table:\n" +
                "      | text | numbers |\n" +
                "      | a    | 1       |\n" +
                "      | ab   | 10      |\n" +
                "      | abc  | 100     |\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void docString() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "    Given a data table:\n" +
                "      | text | numbers |\n" +
                "      | a    |       1 |\n" +
                "      | ab   |      10 |\n" +
                "      | abc  |     100 |\n");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "    Given a data table:\n" +
                "      | text | numbers |\n" +
                "      | a    | 1       |\n" +
                "      | ab   | 10      |\n" +
                "      | abc  | 100     |\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void description() {
        GherkinDocument gherkinDocument = parser.parse("Feature: hello\n" +
                "  So this is a feature\n" +
                "\n" +
                "  Rule: machin\n" +
                "    The first rule of the feature states things\n" +
                "\n" +
                "    Background: bbb\n" +
                "      We can have some explications for the background\n" +
                "\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      This scenario will do things, maybe\n" +
                "\n" +
                "      Given world\n");
        assertEquals("Feature: hello\n" +
                "  So this is a feature\n" +
                "\n" +
                "  Rule: machin\n" +
                "    The first rule of the feature states things\n" +
                "\n" +
                "    Background: bbb\n" +
                "      We can have some explications for the background\n" +
                "\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      This scenario will do things, maybe\n" +
                "\n" +
                "      Given world\n", PrettyPrintGherkinDocument.prettyPrint(gherkinDocument, Syntax.gherkin));
    }
}