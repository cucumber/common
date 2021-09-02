package org.gherkin.util;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;

public interface IFilters {
    boolean acceptScenario(Scenario scenario);
    boolean acceptStep(Step step);
    boolean acceptBackground(Background background);
    boolean acceptRule(Rule rule);
    boolean acceptFeature(Feature feature);
}
