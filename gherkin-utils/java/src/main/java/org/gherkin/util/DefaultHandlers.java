package org.gherkin.util;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;

public class DefaultHandlers implements IHandlers {
    @Override
    public void handleStep(Step step) {
        // no-op
    }

    @Override
    public void handleScenario(Scenario scenario) {
        // no-op
    }

    @Override
    public void handleBackground(Background background) {
        // no-op
    }

    @Override
    public void handleRule(Rule rule) {
        // no-op
    }

    @Override
    public void handleFeature(Feature feature) {
        // no-op
    }
}