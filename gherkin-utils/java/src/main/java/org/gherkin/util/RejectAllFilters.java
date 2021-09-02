package org.gherkin.util;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;

public class RejectAllFilters implements IFilters {
    @Override
    public boolean acceptScenario(Scenario scenario) {
        return false;
    }

    @Override
    public boolean acceptStep(Step step) {
        return false;
    }

    @Override
    public boolean acceptBackground(Background background) {
        return false;
    }

    @Override
    public boolean acceptRule(Rule rule) {
        return false;
    }

    @Override
    public boolean acceptFeature(Feature feature) {
        return false;
    }
}
