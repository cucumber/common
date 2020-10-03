package gherkin.utils.walker.model;

import io.cucumber.messages.Messages;

public abstract class RejectAllFilters extends DefaultFilters {
    public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
        return false;
    }

    public boolean acceptStep(Messages.GherkinDocument.Feature.Step step) {
        return false;
    }

    public boolean acceptBackground(Messages.GherkinDocument.Feature.Background background) {
        return false;
    }

    public boolean acceptRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
        return false;
    }

    public boolean acceptFeature(Messages.GherkinDocument.Feature feature) {
        return false;
    }
}
