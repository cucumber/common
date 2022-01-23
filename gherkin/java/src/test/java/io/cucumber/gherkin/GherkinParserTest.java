package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Source;
import org.junit.Test;

import java.util.List;
import java.util.stream.Collectors;

import static io.cucumber.messages.Messages.Envelope;
import static io.cucumber.messages.Messages.Feature;
import static io.cucumber.messages.Messages.GherkinDocument;
import static io.cucumber.messages.Messages.Pickle;
import static io.cucumber.messages.Messages.PickleStep;
import static io.cucumber.messages.Messages.Scenario;
import static io.cucumber.messages.Messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN;
import static org.junit.Assert.assertEquals;

public class GherkinParserTest {
    final Envelope envelope = Envelope.of(new Source("test.feature",
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
        List<Envelope> envelopes = GherkinParser.builder()
                .includeSource(false)
                .includePickles(false)
                .build()
                .parse(envelope)
                .collect(Collectors.toList());

        // Get the AST
        GherkinDocument gherkinDocument = envelopes.get(0).getGherkinDocument().get();

        // Get the Feature node of the AST
        Feature feature = gherkinDocument.getFeature().get();
        assertEquals("Minimal", feature.getName());

        // Get the first Scenario node of the Feature node
        Scenario scenario = feature.getChildren().get(0).getScenario().get();
        assertEquals("minimalistic", scenario.getName());
    }

    @Test
    public void provides_access_to_pickles_which_are_compiled_from_the_ast() {
        List<Envelope> envelopes = GherkinParser.builder()
                .includeSource(false)
                .includeGherkinDocument(false)
                .build()
                .parse(envelope)
                .collect(Collectors.toList());

        // Get the first pickle
        Pickle pickle = envelopes.get(0).getPickle().get();

        // Get the first step of the pickle
        PickleStep step = pickle.getSteps().get(0);
        assertEquals("the minimalism", step.getText());
    }

    @Test
    public void parses_supplied_source() {
        List<Envelope> envelopes = GherkinParser.builder()
                .includeSource(false)
                .includePickles(false)
                .build()
                .parse(envelope)
                .collect(Collectors.toList());

        GherkinDocument gherkinDocument = envelopes.get(0).getGherkinDocument().get();
        Feature feature = gherkinDocument.getFeature().get();
        assertEquals("Minimal", feature.getName());
    }
}
