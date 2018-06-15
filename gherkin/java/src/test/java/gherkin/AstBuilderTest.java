package gherkin;

import gherkin.ast.GherkinDocument;
import gherkin.ast.Node;
import gherkin.pickles.Compiler;
import gherkin.pickles.Pickle;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;

public class AstBuilderTest {
    @Test
    public void is_reusable() {
        Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());
        TokenMatcher matcher = new TokenMatcher();

        GherkinDocument d1 = parser.parse("Feature: 1", matcher);
        GherkinDocument d2 = parser.parse("Feature: 2", matcher);

        assertEquals("1", d1.getFeature().getName());
        assertEquals("2", d2.getFeature().getName());
    }

    @Test
    public void parses_rules() {
        Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());
        GherkinDocument doc = parser.parse("" +
                "Feature: Some rules\n" +
                "\n" +
                "  Rule: A\n" +
                "\n" +
                "    Example: Example A\n" +
                "      Given a\n" +
                "\n" +
                "  Rule: B\n" +
                "\n" +
                "    Example: Example B\n" +
                "      Given b");

        List<Node> children = doc.getFeature().getChildren();
        assertEquals(2, children.size());

        Compiler compiler = new Compiler();
        List<Pickle> pickles = compiler.compile(doc);
        assertEquals(2, pickles.size());
    }

}
