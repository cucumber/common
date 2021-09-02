package org.gherkin.util;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;

public interface IHandlers {
    void handleStep(Step step);
    void handleScenario(Scenario scenario);
    void handleBackground(Background background);
    void handleRule(Rule rule);
    void handleFeature(Feature feature);
}
