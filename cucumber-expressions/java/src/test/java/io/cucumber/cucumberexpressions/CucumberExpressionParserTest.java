package io.cucumber.cucumberexpressions;

import io.cucumber.cucumberexpressions.CucumberExpressionParser.Alternation;
import io.cucumber.cucumberexpressions.CucumberExpressionParser.Node;
import io.cucumber.cucumberexpressions.CucumberExpressionParser.Optional;
import io.cucumber.cucumberexpressions.CucumberExpressionParser.Parameter;
import io.cucumber.cucumberexpressions.CucumberExpressionParser.Text;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeDiagnosingMatcher;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.empty;

class CucumberExpressionParserTest {

    private CucumberExpressionParser parser = new CucumberExpressionParser();

    @Test
    void emptyString() {
        assertThat(parser.parse(""), empty());
    }

    @Test
    void phrase() {
        assertThat(parser.parse("three blind mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("blind", Text.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void optional() {
        assertThat(parser.parse("(blind)"), contains(
                node("(blind)", Optional.class)
        ));
    }

    @Test
    void parameter() {
        assertThat(parser.parse("{string}"), contains(
                node("string", Parameter.class)
        ));
    }

    @Test
    void anonymousParameter() {
        assertThat(parser.parse("{}"), contains(
                node("", Parameter.class)
        ));
    }

    @Test
    void optionalPhrase() {
        assertThat(parser.parse("three (blind) mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("(blind)", Optional.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void slash() {
        assertThat(parser.parse("\\"), contains(
                node("\\", Text.class)
        ));
    }

    @Test
    void openingParenthesis() {
        assertThat(parser.parse("("), contains(
                node("(", Text.class)
        ));
    }

    @Test
    void escapedOpeningParenthesis() {
        assertThat(parser.parse("\\("), contains(
                node("(", Text.class)
        ));
    }

    @Test
    void escapedOptional() {
        assertThat(parser.parse("\\(blind)"), contains(
                node("(", Text.class),
                node("blind", Text.class),
                node(")", Text.class)
        ));
    }

    @Test
    void escapedOptionalPhrase() {
        assertThat(parser.parse("three \\(blind) mice"), contains(
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
        assertThat(parser.parse("three \\((very) blind) mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("(", Text.class),
                node("(very)", Optional.class),
                node(" ", Text.class),
                node("blind", Text.class),
                node(")", Text.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void optionalContainingEscapedOptional() {
        assertThat(parser.parse("three ((very\\) blind) mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("((very) blind)", Optional.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }


    @Test
    void alternation() {
        assertThat(parser.parse("mice/rats"), contains(
                node("mice - rats", Alternation.class)
        ));
    }

    @Test
    void escapedAlternation() {
        assertThat(parser.parse("mice\\/rats"), contains(
                node("mice", Text.class),
                node("/", Text.class),
                node("rats", Text.class)
        ));
    }


    @Test
    void alternationPhrase() {
        assertThat(parser.parse("three hungry/blind mice"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("hungry - blind", Alternation.class),
                node(" ", Text.class),
                node("mice", Text.class)
        ));
    }

    @Test
    void alternationWithWhiteSpace() {
        assertThat(parser.parse("\\ three\\ hungry/blind\\ mice\\ "), contains(
                node(" three hungry - blind mice ", Alternation.class)
        ));
    }

    @Test
    void alternationWithUnusedEndOptional() {
        assertThat(parser.parse("three )blind\\ mice/rats"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node(")blind mice - rats", Alternation.class)
        ));
    }

    @Test
    void alternationWithUnusedStartOptional() {
        assertThat(parser.parse("three blind\\ mice/rats("), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("blind mice - rats(", Alternation.class)
        ));
    }

    @Test
    void alternationFollowedByOptional() {
        assertThat(parser.parse("three blind\\ rat/cat(s)"), contains(
                node("three", Text.class),
                node(" ", Text.class),
                node("blind rat - cat(s)", Alternation.class)
        ));
    }

    private static Matcher<Node> node(String expectedExpression, Class<?> type) {
        return new TypeSafeDiagnosingMatcher<Node>() {
            @Override
            public void describeTo(Description description) {
                description.appendText("(");
                description.appendValue(expectedExpression);
                description.appendText(",");
                description.appendValue(type.getSimpleName());
                description.appendText(")");
            }

            @Override
            protected boolean matchesSafely(Node node, Description description) {
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
