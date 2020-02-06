package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class UndefinedParameterTypeExpressionTest {
    @Test
    public void it_matches_nothing() {
        Expression expression = new UndefinedParameterTypeExpression("{x}", Collections.singleton("x"));
        assertFalse(expression.getRegexp().matcher("").find());
    }
}
