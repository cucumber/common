package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;

public interface Handler {

    default void handleStep(Messages.GherkinDocument.Feature.Step step) {
    }

    default void handleScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
    }

    default void handleBackground(Messages.GherkinDocument.Feature.Background background) {
    }

    default void handleRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
    }

    default void handleFeature(Messages.GherkinDocument.Feature feature) {
    }

}
