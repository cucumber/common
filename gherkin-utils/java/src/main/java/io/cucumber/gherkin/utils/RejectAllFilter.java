package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;

class RejectAllFilter implements Filter {

    @Override
    public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
        return false;
    }

    @Override
    public boolean acceptStep(Messages.GherkinDocument.Feature.Step step) {
        return false;
    }

    @Override
    public boolean acceptBackground(Messages.GherkinDocument.Feature.Background background) {
        return false;
    }

    @Override
    public boolean acceptRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
        return false;
    }

    @Override
    public boolean acceptFeature(Messages.GherkinDocument.Feature feature) {
        return false;
    }

}
