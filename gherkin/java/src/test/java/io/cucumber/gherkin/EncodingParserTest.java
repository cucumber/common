package io.cucumber.gherkin;

import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;

import static io.cucumber.gherkin.EncodingParser.readWithEncodingFromSource;
import static org.junit.jupiter.api.Assertions.assertEquals;

class EncodingParserTest {

    @Test
    void empty() throws RuntimeException {
        String feature = "\n";
        String parsed = readWithEncodingFromSource(utf_8(feature));
        assertEquals(feature, parsed);
    }
    @Test
    void nearly_empty() throws RuntimeException {
        String feature = "\n";
        String parsed = readWithEncodingFromSource(utf_8(feature));
        assertEquals(feature, parsed);
    }
    @Test
    void only_comment() throws RuntimeException {
        String feature = "#Sample comment\n";
        String parsed = readWithEncodingFromSource(utf_8(feature));
        assertEquals(feature, parsed);
    }

    @Test
    void removes_utf8_bom() throws RuntimeException {
        String feature = "#Sample comment\n";
        String parsed = readWithEncodingFromSource(utf_8("\uFEFF" + feature));
        assertEquals(feature, parsed);
    }

    @Test
    void single_scenario() throws RuntimeException {
        String feature = "" +
                "Feature: Example\n" +
                "\n" +
                "  Scenario: Nothing special\n" +
                "    Given a single scenario\n";
        String parsed = readWithEncodingFromSource(utf_8(feature));
        assertEquals(feature, parsed);
    }
    @Test
    void reads_with_encoding_from_pragma() throws RuntimeException {
        String feature = "" +
                "# language: fr\n" +
                "# encoding: ISO-8859-1\n" +
                "Fonctionnalité: Concombres dans ISO-8859-1\n" +
                "\n" +
                "  Scénario: dans la ventre\n" +
                "    Étant donné j'ai 5 concombres\n";
        String parsed = readWithEncodingFromSource(iso_8859_1(feature));
        assertEquals(feature, parsed);
    }

    private static byte[] utf_8(String x) {
        return x.getBytes(StandardCharsets.UTF_8);
    }

    private static byte[] iso_8859_1(String x) {
        return x.getBytes(StandardCharsets.ISO_8859_1);
    }

}
