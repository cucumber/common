package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;
import org.junit.Test;

import java.util.List;
import java.util.stream.Collectors;

import static io.cucumber.gherkin.Gherkin.makeSourceEnvelope;
import static io.cucumber.messages.Messages.Envelope;
import static io.cucumber.messages.Messages.Feature;
import static io.cucumber.messages.Messages.GherkinDocument;
import static io.cucumber.messages.Messages.Pickle;
import static io.cucumber.messages.Messages.PickleStep;
import static io.cucumber.messages.Messages.Scenario;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class GherkinTest {
    private final IdGenerator idGenerator = new IdGenerator.Incrementing();

    @Test
    public void use_this_in_readme() {
        List<String> paths = singletonList("testdata/good/minimal.feature");
        boolean includeSource = false;
        boolean includeAst = true;
        boolean includePickles = true;
        String name = Gherkin.fromPaths(paths, includeSource, includeAst, includePickles, idGenerator)
                .filter(envelope -> envelope.getPickle().isPresent())
                .findFirst().get()
                .getPickle().get()
                .getName();
        assertEquals("minimalistic", name);
    }


    @Test
    public void provides_access_to_the_ast() {
        List<String> paths = singletonList("testdata/good/minimal.feature");
        boolean includeSource = false;
        boolean includeAst = true;
        boolean includePickles = false;
        List<Envelope> envelopes = Gherkin.fromPaths(paths, includeSource, includeAst, includePickles, idGenerator).collect(Collectors.toList());

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
        List<Envelope> envelopes = Gherkin.fromPaths(singletonList("testdata/good/scenario_outline.feature")
                        , false, false, true, idGenerator)
                .collect(Collectors.toList());

        // Get the first pickle
        Pickle pickle = envelopes.get(0).getPickle().get();

        // Get the first step of the pickle
        PickleStep step = pickle.getSteps().get(0);
        assertEquals("the minimalism", step.getText());
    }

    @Test
    public void parses_supplied_source() {
        Envelope envelope = makeSourceEnvelope("Feature: Minimal\n" +
                "\n" +
                "  Scenario: minimalistic\n" +
                "    Given the minimalism\n", "test.feature");
        List<Envelope> envelopes = Gherkin.fromSources(singletonList(envelope), false, true, false, idGenerator).collect(Collectors.toList());

        GherkinDocument gherkinDocument = envelopes.get(0).getGherkinDocument().get();
        Feature feature = gherkinDocument.getFeature().get();
        assertEquals("Minimal", feature.getName());
    }
}
