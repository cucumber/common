package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.AstNode.Alternation;
import io.cucumber.cucumberexpressions.AstNode.Optional;
import io.cucumber.cucumberexpressions.AstNode.Parameter;
import io.cucumber.cucumberexpressions.AstNode.Text;
import io.cucumber.cucumberexpressions.AstNode.Token;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeDiagnosingMatcher;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.empty;

class CucumberExpressionParserTest {

    private final CucumberExpressionParser parser = new CucumberExpressionParser();

    @Test
    void emptyString() {
        assertThat(astOf(""), empty());
    }

    @Test
    void phrase() {
        assertThat(astOf("three blind mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("blind", Text.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void optional() {
        assertThat(astOf("(blind)"), contains(
                node("blind", Optional.class)
        ));
    }

    @Test
    void parameter() {
        assertThat(astOf("{string}"), contains(
                node("string", Parameter.class)
        ));
    }

    @Test
    void anonymousParameter() {
        assertThat(astOf("{}"), contains(
                node("", Parameter.class)
        ));
    }

    @Test
    void optionalPhrase() {
        assertThat(astOf("three (blind) mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("blind", Optional.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void slash() {
        assertThat(astOf("\\"), contains(
                node("\\", Text.class)
        ));
    }

    @Test
    void brace() {
        assertThat(astOf("{"), contains(
                node("{", Text.class)
        ));
    }

    @Test
    void openingParenthesis() {
        assertThat(astOf("("), contains(
                node("(", Text.class)
        ));
    }

    @Test
    void escapedOpeningParenthesis() {
        assertThat(astOf("\\("), contains(
                node("(", Text.class)
        ));
    }

    @Test
    void escapedOptional() {
        assertThat(astOf("\\(blind)"), contains(
                node("(", Text.class),
                node("blind", Text.class),
                node(")", Text.class)
        ));
    }

    @Test
    void escapedOptionalPhrase() {
        assertThat(astOf("three \\(blind) mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("(", Text.class),
                node("blind", Text.class),
                node(")", Text.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void escapedOptionalFollowedByOptional() {
        assertThat(astOf("three \\((very) blind) mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("(", Text.class),
                node("very", Optional.class),
                node(" ", Text.class),
                node("blind", Text.class),
                node(")", Text.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void optionalContainingEscapedOptional() {
        assertThat(astOf("three ((very\\) blind) mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("(very) blind", Optional.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }


    @Test
    void alternation() {
        assertThat(astOf("mice/rats"), contains(
                node("mice - rats", Alternation.class)
        ));
    }

    @Test
    void escapedAlternation() {
        assertThat(astOf("mice\\/rats"), contains(
                node("mice", Text.class),
                node("/", Text.class),
                node("rats", Text.class)
        ));
    }


    @Test
    void alternationPhrase() {
        assertThat(astOf("three hungry/blind mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("hungry - blind", Alternation.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void alternationWithWhiteSpace() {
        assertThat(astOf("\\ three\\ hungry/blind\\ mice\\ "), contains(
                node(" three hungry - blind mice ", Alternation.class)
        ));
    }

    @Test
    void alternationWithUnusedEndOptional() {
        assertThat(astOf("three )blind\\ mice/rats"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node(")blind mice - rats", Alternation.class)
        ));
    }

    @Test
    void alternationWithUnusedStartOptional() {
        assertThat(astOf("three blind\\ mice/rats("), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("blind mice - rats(", Alternation.class)
        ));
    }

    @Test
    void alternationFollowedByOptional() {
        assertThat(astOf("three blind\\ rat/cat(s)"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("blind rat - cats", Alternation.class)
        ));
    }

    private List<AstNode> astOf(String expression) {
        return parser.parse(expression).getNodes();
    }

    private static Matcher<AstNode> node(String expectedExpression, Class<?> type) {
        return new TypeSafeDiagnosingMatcher<AstNode>() {
            @Override
            public void describeTo(Description description) {
                description.appendText("(");
                description.appendValue(expectedExpression);
                description.appendText(",");
                description.appendValue(type.getSimpleName());
                description.appendText(")");
            }

            @Override
            protected boolean matchesSafely(AstNode node, Description description) {
                description.appendText("(");
                String expression = node.toString();
                description.appendValue(expression);
                description.appendText(",");
                description.appendValue(node.getClass().getSimpleName());
                description.appendText(")");
                return expectedExpression.equals(expression) && type.equals(node.getClass());
            }
        };
    }

}
