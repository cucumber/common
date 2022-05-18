package io.cucumber.gherkin.utils.pretty;

import io.cucumber.gherkin.GherkinParser;
import io.cucumber.messages.types.Envelope;
import io.cucumber.messages.types.GherkinDocument;
import io.cucumber.messages.types.Source;
import io.cucumber.messages.types.SourceMediaType;
import org.junit.jupiter.api.Test;

import static io.cucumber.gherkin.utils.pretty.Pretty.prettyPrint;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class PrettyTest {
    @Test
    public void emptyFile() {
        String gherkin = "";
        GherkinDocument gherkinDocument = parse(gherkin);
        assertEquals("", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void scenarioOutlineWithExamples() {
        GherkinDocument gherkinDocument = parse("    Feature: Overdue tasks\n" +
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
                        "      | 20    | 5   | 15   |\n",
                prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void languageHeaderIsNotEn() {
        GherkinDocument gherkinDocument = parse("# language: no\n" +
                "Egenskap: hallo");
        assertEquals("# language: no\n" +
                "Egenskap: hallo\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void emptyScenarios() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "\n" +
                "  Scenario: Two");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "\n" +
                "  Scenario: Two\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void twoScenarios() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
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
                "    Given world\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void twoScenariosInRule() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
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
                "      Given world\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void featureWithBackgroundAndScenario() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
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
                "    Given world\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void ruleWithBackgroundAndScenario() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
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
                "      Given world\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void tags() {
        GherkinDocument gherkinDocument = parse("@featureTag\n" +
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
                "      Given world\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void exampleTables() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
                "\n" +
                "  # i am tag hear me roar\n" +
                "  Scenario: one\n" +
                "    #some comment in the scenario\n" +
                "    #another line in the comment in the scenario\n" +
                "    Given a a <text> and a <number>\n" +
                "\n" +
                "    # comment1 is here   \n  " +
                "    Examples: some data\n" +
                " # comment2 is here     \n" +
                "      | text | number |\n" +
                " # comment3 is here     \n" +
                " # comment4 is here     \n" +
                "      | a    |      1 |\n" +
                "      | ab   |     10 |\n" +
                " # comment5 is here     \n" +
                " # comment6 is here     \n" +
                "      | abc  |    100 |\n");
        assertEquals("Feature: hello\n" +
                "\n" +
                "  # i am tag hear me roar\n" +
                "  Scenario: one\n" +
                "    # some comment in the scenario\n" +
                "    # another line in the comment in the scenario\n" +
                "    Given a a <text> and a <number>\n" +
                "\n" +
                "    # comment1 is here\n" +
                "    Examples: some data\n" +
                "      # comment2 is here\n" +
                "      | text | number |\n" +
                "      # comment3 is here\n" +
                "      # comment4 is here\n" +
                "      | a    | 1      |\n" +
                "      | ab   | 10     |\n" +
                "      # comment5 is here\n" +
                "      # comment6 is here\n" +
                "      | abc  | 100    |\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void dataTables() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
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
                "      | abc  | 100     |\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void docString() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
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
                "      | abc  | 100     |\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void description() {
        GherkinDocument gherkinDocument = parse("Feature: hello\n" +
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
                "      Given world\n", prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    @Test
    public void commentAtStartAndEndOfFile() {
        GherkinDocument gherkinDocument = parse("#   i am comment at start of file \n" +
                "Feature: hello\n" +
                "\n" +
                "  # i am tag hear me roar\n" +
                "  Scenario: one\n" +
                "    #some comment in the scenario\n" +
                "    #another line in the comment in the scenario\n" +
                "    Given a a <text> and a <number>\n" +
                "# i am a comment at the end of the file.");
        assertEquals("# i am comment at start of file\n" +
                        "Feature: hello\n" +
                        "\n" +
                        "  # i am tag hear me roar\n" +
                        "  Scenario: one\n" +
                        "    # some comment in the scenario\n" +
                        "    # another line in the comment in the scenario\n" +
                        "    Given a a <text> and a <number>\n" +
                        "# i am a comment at the end of the file.\n",
                prettyPrint(gherkinDocument, Syntax.gherkin));
    }

    private GherkinDocument parse(String gherkin) {
        GherkinParser parser = GherkinParser
                .builder()
                .includeGherkinDocument(true)
                .includeSource(false)
                .includePickles(false)
                .build();
        return parser.parse(Envelope.of(new Source("test.feature", gherkin, SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN)))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No envelope"))
                .getGherkinDocument()
                .orElseThrow(() -> new RuntimeException("No gherkin document"));
    }
}
