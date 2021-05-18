package io.cucumber.createmeta;

import org.junit.jupiter.api.Test;

import java.util.HashMap;

import static io.cucumber.createmeta.VariableExpression.evaluate;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class VariableExpressionTest {
    @Test
    public void it_returns_null_when_a_variable_is_undefined() {
        String expression = "hello-${SOME_VAR}";
        String result = evaluate(expression, new HashMap<>());
        assertNull(result);
    }

    @Test
    public void it_gets_a_value_without_replacement() {
        String expression = "${SOME_VAR}";
        String result = evaluate(expression, new HashMap<String, String>() {{
            put("SOME_VAR", "some_value");
        }});
        assertEquals("some_value", result);
    }

    @Test
    public void it_captures_a_group() {
        String expression = "${SOME_REF/refs\\/heads\\/(.*)/\\1}";
        String result = evaluate(expression, new HashMap<String, String>() {{
            put("SOME_REF", "refs/heads/main");
        }});
        assertEquals("main", result);
    }

    @Test
    public void it_works_with_star_wildcard_in_var() {
        String expression = "${GO_SCM_*_PR_BRANCH/.*:(.*)/\\1}";
        String result = evaluate(expression, new HashMap<String, String>() {{
            put("GO_SCM_MY_MATERIAL_PR_BRANCH", "ashwankthkumar:feature-1");
        }});
        assertEquals("feature-1", result);
    }

    @Test
    public void it_evaluates_a_complex_expression() {
        String expression = "hello-${VAR1}-${VAR2/(.*) (.*)/\\2-\\1}-world";
        String result = evaluate(expression, new HashMap<String, String>() {{
            put("VAR1", "amazing");
            put("VAR2", "gorgeous beautiful");
        }});
        assertEquals("hello-amazing-beautiful-gorgeous-world", result);
    }
}
