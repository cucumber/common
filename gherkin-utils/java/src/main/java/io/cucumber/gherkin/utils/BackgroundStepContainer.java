package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;

import java.util.List;

final class BackgroundStepContainer implements StepContainer {

    private Messages.GherkinDocument.Feature.Background background;

    public BackgroundStepContainer(Messages.GherkinDocument.Feature.Background background) {
        this.background = background;
    }

    @Override
    public List<Messages.GherkinDocument.Feature.Tag> getTagsList() {
        return null;
    }

    @Override
    public String getKeyword() {
        return this.background.getKeyword();
    }

    @Override
    public String getName() {
        return this.background.getName();
    }

    @Override
    public String getDescription() {
        return this.background.getDescription();
    }

    @Override
    public boolean hasDescription() {
        return !this.background.getDescription().isEmpty();
    }

    @Override
    public List<Messages.GherkinDocument.Feature.Step> getStepsList() {
        return this.background.getStepsList();
    }

    @Override
    public List<Messages.GherkinDocument.Feature.Scenario.Examples> getExamplesList() {
        return null;
    }

    @Override
    public boolean hasExamples() {
        return false;
    }
}
