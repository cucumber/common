package io.cucumber.cucumberexpressions;

import org.junit.Test;

import static org.junit.Assert.*;

public class LetterCaseTest {

    @Test
    public void java_converts_to_camel_case() {
        assertEquals("fooBarZap", LetterCase.LOWER_CAMEL_CASE.convert("FOO-Bar_zap"));
        assertEquals("x", LetterCase.LOWER_CAMEL_CASE.convert("X"));
    }
}