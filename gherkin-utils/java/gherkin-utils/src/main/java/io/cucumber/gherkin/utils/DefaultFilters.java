package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;

public abstract class DefaultFilters {
    public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
        return true;
    }

    public boolean acceptStep(Messages.GherkinDocument.Feature.Step step) {
        return true;
    }

    public boolean acceptBackground(Messages.GherkinDocument.Feature.Background background) {
        return true;
    }

    public boolean acceptRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
        return true;
    }

    public boolean acceptFeature(Messages.GherkinDocument.Feature feature) {
        return true;
    }
}
