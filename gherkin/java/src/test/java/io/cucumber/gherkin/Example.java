package io.cucumber.gherkin;

import io.cucumber.messages.types.Envelope;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Example {

    @Test
    void test(){
        String feature = "Feature: Feature 2\n" +
                "  # some comment\n" +
                "  some description\n" +
                "\n" +
                "  Scenario: Scenario 1\n" +
                "    * Wait 3s";

        GherkinParser parser = GherkinParser.builder().build();

        Stream<Envelope> parse = parser.parse("example.feature", feature.getBytes(StandardCharsets.UTF_8));

        parse.forEach(System.out::println);

    }
}
