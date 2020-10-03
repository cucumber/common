package gherkin.utils.walker.model;

import io.cucumber.messages.Messages;

public abstract class DefaultHandlers {
    public void handleStep(Messages.GherkinDocument.Feature.Step step) {
    }

    public void handleScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
    }

    public void handleBackground(Messages.GherkinDocument.Feature.Background background) {
    }

    public void handleRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
    }

    public void handleFeature(Messages.GherkinDocument.Feature feature) {
    }
}
