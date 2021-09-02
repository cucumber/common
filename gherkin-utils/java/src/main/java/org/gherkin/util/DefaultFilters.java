package org.gherkin.util;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;

public class DefaultFilters implements IFilters {
    @Override
    public boolean acceptScenario(Scenario scenario) {
        return true;
    }

    @Override
    public boolean acceptStep(Step step) {
        return true;
    }

    @Override
    public boolean acceptBackground(Background background) {
        return true;
    }

    @Override
    public boolean acceptRule(Rule rule) {
        return true;
    }

    @Override
    public boolean acceptFeature(Feature feature) {
        return true;
    }
}
