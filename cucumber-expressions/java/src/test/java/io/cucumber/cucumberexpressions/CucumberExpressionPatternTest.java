package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.util.Locale;

import static org.junit.Assert.assertEquals;

/**
 * This test verifies that the regular expression generated
 * from the cucumber expression is as expected.
 */
public class CucumberExpressionPatternTest {
    @Test
    public void translates_no_args() {
        assertPattern(
                "hello",
                "^hello$"
        );
    }

    @Test
    public void translates_alternation() {
        assertPattern(
                "I had/have a great/nice/charming friend",
                "^I (?:had|have) a (?:great|nice|charming) friend$"
        );
    }

    @Test
    public void translates_alternation_with_non_alpha() {
        assertPattern(
                "I said Alpha1/Beta1",
                "^I said (?:Alpha1|Beta1)$"
        );
    }

    @Test
    public void translates_parameters() {
        assertPattern(
                "I have {float} cukes at {int} o'clock",
                "^I have (" +
                        "(?=.*\\d.*)" +
                        "[-+]?" +
                        "(?:\\d+(?:[,]?\\d+)*)*" +
                        "(?:[.](?=\\d.*))?\\d*" +
                        "(?:\\d+[E]-?\\d+)?) cukes at ((?:-?\\d+)|(?:\\d+)) o'clock$"
        );
    }

    @Test
    public void translates_parenthesis_to_non_capturing_optional_capture_group() {
        assertPattern(
                "I have many big(ish) cukes",
                "^I have many big(?:ish)? cukes$"
        );
    }

    @Test
    public void translates_parenthesis_with_alpha_unicode() {
        assertPattern(
                "Привет, Мир(ы)!",
                "^Привет, Мир(?:ы)?!$");
    }

    private void assertPattern(String expr, String expectedRegexp) {
        CucumberExpression cucumberExpression = new CucumberExpression(expr, new ParameterTypeRegistry(Locale.ENGLISH));
        assertEquals(expectedRegexp, cucumberExpression.getRegexp().pattern());
    }
}
