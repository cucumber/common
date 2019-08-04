package io.cucumber.cucumberexpressions;

import org.junit.Test;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.Assert.assertEquals;

public class NumberParserTest {

    private final NumberParser english = new NumberParser(Locale.ENGLISH);
    private final NumberParser german = new NumberParser(Locale.GERMAN);

    @Test
    public void can_parse_float() {
        assertEquals(1042.2f, english.parseFloat("1,042.2"), 0);
        assertEquals(1042.2f, german.parseFloat("1.042,2"), 0);
    }

    @Test
    public void can_parse_double() {
        assertEquals(1042.000000000000002, english.parseDouble("1,042.000000000000002"), 0);
        assertEquals(1042.000000000000002, german.parseDouble("1.042,000000000000002"), 0);
    }

    @Test
    public void can_parse_big_decimals() {
        assertEquals(new BigDecimal("1042.0000000000000000000002"), english.parseBigDecimal("1,042.0000000000000000000002"));
        assertEquals(new BigDecimal("1042.0000000000000000000002"), german.parseBigDecimal("1.042,0000000000000000000002"));
    }
}
