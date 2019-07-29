package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Envelope;
import io.cucumber.messages.Messages.GherkinDocument;
import io.cucumber.messages.Messages.Pickle;
import io.cucumber.messages.Messages.Source;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class GherkinTest {
    @Test
    public void provides_access_to_the_ast() {
        List<Envelope> wrappers = toList(Gherkin.fromPaths(singletonList("testdata/good/minimal.feature"), false, true, false));

        // Get the AST
        GherkinDocument gherkinDocument = wrappers.get(0).getGherkinDocument();

        // Get the Feature node of the AST
        GherkinDocument.Feature feature = gherkinDocument.getFeature();
        assertEquals("Minimal", feature.getName());

        // Get the first Scenario node of the Feature node
        GherkinDocument.Feature.Scenario scenario = feature.getChildren(0).getScenario();
        assertEquals("minimalistic", scenario.getName());
    }

    @Test
    public void provides_access_to_pickles_which_are_compiled_from_the_ast() {
        List<Envelope> wrappers = toList(Gherkin.fromPaths(singletonList("testdata/good/scenario_outline.feature"), false, false, true));

        // Get the first pickle
        Pickle pickle = wrappers.get(0).getPickle();

        // Get the first step of the pickle
        Pickle.PickleStep step = pickle.getSteps(0);
        assertEquals("the minimalism", step.getText());
    }

    @Test
    public void parses_supplied_source() {
        Source source = Source.newBuilder().setData("Feature: Minimal\n" +
                "\n" +
                "  Scenario: minimalistic\n" +
                "    Given the minimalism\n").build();
        List<Envelope> wrappers = toList(Gherkin.fromSources(singletonList(source), false, true, false));

        GherkinDocument gherkinDocument = wrappers.get(0).getGherkinDocument();
        GherkinDocument.Feature feature = gherkinDocument.getFeature();
        assertEquals("Minimal", feature.getName());
    }

    private static <T> List<T> toList(Iterable<T> iterable) {
        List<T> result = new ArrayList<>();
        for (T item : iterable) {
            result.add(item);
        }
        return result;
    }
}
