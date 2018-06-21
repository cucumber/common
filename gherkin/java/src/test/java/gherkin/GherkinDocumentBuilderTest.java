package gherkin;

import cucumber.messages.Gherkin;
import cucumber.messages.Gherkin.FeatureChild;
import cucumber.messages.Gherkin.GherkinDocument;
import cucumber.messages.Pickles;
import cucumber.messages.Pickles.Pickle;
import gherkin.pickles.PickleCompiler;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;

public class GherkinDocumentBuilderTest {
    @Test
    public void is_reusable() {
        Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
        TokenMatcher matcher = new TokenMatcher();

        GherkinDocument d1 = parser.parse("Feature: 1", matcher).build();
        GherkinDocument d2 = parser.parse("Feature: 2", matcher).build();

        assertEquals("1", d1.getFeature().getName());
        assertEquals("2", d2.getFeature().getName());
    }

    @Test
    public void parses_rules() {
        Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
        GherkinDocument doc = parser.parse("" +
                "Feature: Some rules\n" +
                "\n" +
                "  Background:\n" +
                "    Given fb\n" +
                "\n" +
                "  Rule: A\n" +
                "    The rule A description\n" +
                "\n" +
                "    Background:\n" +
                "      Given ab\n" +
                "\n" +
                "    Example: Example A\n" +
                "      Given a\n" +
                "\n" +
                "  Rule: B\n" +
                "    The rule B description\n" +
                "\n" +
                "    Example: Example B\n" +
                "      Given b").build();

        List<FeatureChild> children = doc.getFeature().getChildrenList();
        assertEquals(3, children.size());

        PickleCompiler pickleCompiler = new PickleCompiler();
        List<Pickle> pickles = pickleCompiler.compile(doc, "hello.feature");
        assertEquals(2, pickles.size());

        assertEquals(3, pickles.get(0).getStepsList().size());

        assertEquals(2, pickles.get(1).getStepsList().size());
    }

    @Test
    public void parses_just_comments() {
        Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
        GherkinDocument doc = parser.parse("" +
                "# Just a comment").build();
        List<Gherkin.Comment> children = doc.getCommentsList();
        assertEquals(1, children.size());
    }

    @Test
    public void sets_empty_table_cells() {
        Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
        GherkinDocument doc = parser.parse("" +
                "Feature:\n  Scenario:\n    Given a table\n      |a||b|").build();
        Gherkin.TableRow row = doc.getFeature().getChildren(0).getScenario().getSteps(0).getDataTable().getRows(0);
        assertEquals("a", row.getCells(0).getValue());
        assertEquals("", row.getCells(1).getValue());
        assertEquals("b", row.getCells(2).getValue());
    }

    @Test
    public void reports_step_text_column() {
        Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
        GherkinDocument doc = parser.parse("" +
                "Feature:\n  Scenario:\n    Given a step").build();
        PickleCompiler pickleCompiler = new PickleCompiler();
        List<Pickle> pickles = pickleCompiler.compile(doc, "hello.feature");

        Pickles.PickleStep step = pickles.get(0).getSteps(0);
        assertEquals(11, step.getLocations(0).getColumn());

    }

}
