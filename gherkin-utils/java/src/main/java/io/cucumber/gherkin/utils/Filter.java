package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;

public interface Filter {

    boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario);

    boolean acceptStep(Messages.GherkinDocument.Feature.Step step);

    boolean acceptBackground(Messages.GherkinDocument.Feature.Background background);

    boolean acceptRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule);

    boolean acceptFeature(Messages.GherkinDocument.Feature feature);

}
