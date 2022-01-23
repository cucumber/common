package io.cucumber.gherkin;

import io.cucumber.messages.Messages;
import io.cucumber.messages.Messages.ParseError;
import io.cucumber.messages.Messages.Source;
import io.cucumber.messages.Messages.SourceReference;
import org.junit.Test;

import java.util.Optional;

import static io.cucumber.messages.Messages.Envelope;
import static io.cucumber.messages.Messages.Feature;
import static io.cucumber.messages.Messages.GherkinDocument;
import static io.cucumber.messages.Messages.Pickle;
import static io.cucumber.messages.Messages.PickleStep;
import static io.cucumber.messages.Messages.Scenario;
import static io.cucumber.messages.Messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class GherkinParserTest {
    final Envelope envelope = Envelope.of(new Source("minimal.feature",
            "Feature: Minimal\n" +
                    "\n" +
                    "  Scenario: minimalistic\n" +
                    "    Given the minimalism\n",
            TEXT_X_CUCUMBER_GHERKIN_PLAIN));

    @Test
    public void use_this_in_readme() {
        String name = GherkinParser.builder()
                .includeSource(false)
                .build()
                .parse(envelope)
                .filter(envelope -> envelope.getPickle().isPresent())
                .findFirst().get()
                .getPickle().get()
                .getName();
        assertEquals("minimalistic", name);
    }

    @Test
    public void provides_access_to_the_ast() {
        // Get the AST
        GherkinDocument gherkinDocument = GherkinParser.builder()
                .includeSource(false)
                .includePickles(false)
                .build()
                .parse(envelope)
                .findFirst().get()
                .getGherkinDocument().get();

        // Get the Feature node of the AST
        Feature feature = gherkinDocument.getFeature().get();
        assertEquals("Minimal", feature.getName());

        // Get the first Scenario node of the Feature node
        Scenario scenario = feature.getChildren().get(0).getScenario().get();
        assertEquals("minimalistic", scenario.getName());
    }

    @Test
    public void provides_access_to_pickles_which_are_compiled_from_the_ast() {
        // Get the first pickle
        Pickle pickle = GherkinParser.builder()
                .includeSource(false)
                .includeGherkinDocument(false)
                .build()
                .parse(envelope)
                .findFirst().get()
                .getPickle().get();

        // Get the first step of the pickle
        PickleStep step = pickle.getSteps().get(0);
        assertEquals("the minimalism", step.getText());
    }

    @Test
    public void parses_supplied_source() {
        GherkinDocument gherkinDocument = GherkinParser.builder()
                .includeSource(false)
                .includePickles(false)
                .build()
                .parse(envelope)
                .findFirst().get()
                .getGherkinDocument().get();

        Feature feature = gherkinDocument.getFeature().get();
        assertEquals("Minimal", feature.getName());
    }

    @Test
    public void parser_always_includes_errors() {
        Envelope singleParseError = Envelope.of(new Source("single_parser_error.feature",
                "\n" +
                        "invalid line here\n" +
                        "\n" +
                        "Feature: Single parser error\n" +
                        "\n" +
                        "  Scenario: minimalistic\n" +
                        "    Given the minimalism\n",
                TEXT_X_CUCUMBER_GHERKIN_PLAIN));
        Optional<ParseError> parseError = GherkinParser.builder()
                .includeSource(false)
                .includePickles(false)
                .includeGherkinDocument(false)
                .build()
                .parse(singleParseError)
                .findFirst().get()
                .getParseError();

        assertTrue(parseError.isPresent());
    }
}
