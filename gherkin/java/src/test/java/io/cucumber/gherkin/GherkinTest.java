package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Feature;
import io.cucumber.messages.Messages.GherkinDocument;
import io.cucumber.messages.Messages.Pickle;
import io.cucumber.messages.Messages.PickleStep;
import io.cucumber.messages.Messages.Scenario;
import io.cucumber.messages.Messages.Source;
import io.cucumber.messages.Messages.Wrapper;
import org.junit.Test;

import java.util.Iterator;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class GherkinTest {
    @Test
    public void provides_access_to_the_ast() {
        Iterator<Wrapper> iterator = Gherkin.fromPaths(singletonList("testdata/good/minimal.feature"), false, true, false).iterator();

        // Get the AST
        GherkinDocument gherkinDocument = iterator.next().getGherkinDocument();

        // Get the Feature node of the AST
        Feature feature = gherkinDocument.getFeature();
        assertEquals("Minimal", feature.getName());

        // Get the first Scenario node of the Feature node
        Scenario scenario = feature.getChildren(0).getScenario();
        assertEquals("minimalistic", scenario.getName());
    }

    @Test
    public void provides_access_to_pickles_which_are_compiled_from_the_ast() {
        Iterator<Wrapper> iterator = Gherkin.fromPaths(singletonList("testdata/good/scenario_outline.feature"), false, false, true).iterator();

        // Get the first pickle
        Pickle pickle = iterator.next().getPickle();

        // Get the first step of the pickle
        PickleStep step = pickle.getSteps(0);
        assertEquals("the minimalism", step.getText());
    }

    @Test
    public void parses_supplied_source() {
        Source source = Source.newBuilder().setData("Feature: Minimal\n" +
                "\n" +
                "  Scenario: minimalistic\n" +
                "    Given the minimalism\n").build();
        Iterator<Wrapper> iterator = Gherkin.fromSources(singletonList(source), false, true, false).iterator();
        GherkinDocument gherkinDocument = iterator.next().getGherkinDocument();
        Feature feature = gherkinDocument.getFeature();
        assertEquals("Minimal", feature.getName());
    }

}
