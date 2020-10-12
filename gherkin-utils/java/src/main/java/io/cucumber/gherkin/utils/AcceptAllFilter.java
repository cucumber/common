package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;

public class AcceptAllFilter implements Filter {

    @Override
    public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
        return true;
    }

    @Override
    public boolean acceptStep(Messages.GherkinDocument.Feature.Step step) {
        return true;
    }

    @Override
    public boolean acceptBackground(Messages.GherkinDocument.Feature.Background background) {
        return true;
    }

    @Override
    public boolean acceptRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
        return true;
    }

    @Override
    public boolean acceptFeature(Messages.GherkinDocument.Feature feature) {
        return true;
    }
}
