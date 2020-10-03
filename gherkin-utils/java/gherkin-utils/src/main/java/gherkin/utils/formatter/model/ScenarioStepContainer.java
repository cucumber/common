package gherkin.utils.formatter.model;

import io.cucumber.messages.Messages;

import java.util.List;

public class ScenarioStepContainer implements IStepContainer {
    private Messages.GherkinDocument.Feature.Scenario scenario;

    public ScenarioStepContainer (Messages.GherkinDocument.Feature.Scenario scenario) {
        this.scenario = scenario;
    }

    @Override
    public List<Messages.GherkinDocument.Feature.Tag> getTagsList() {
        return this.scenario.getTagsList();
    }

    @Override
    public String getKeyword() {
        return this.scenario.getKeyword();
    }

    @Override
    public String getName() {
        return this.scenario.getName();
    }

    @Override
    public String getDescription() {
        return this.scenario.getDescription();
    }

    @Override
    public boolean hasDescription() {
        return !this.scenario.getDescription().isEmpty();
    }

    @Override
    public List<Messages.GherkinDocument.Feature.Step> getStepsList() {
        return this.scenario.getStepsList();
    }

    @Override
    public List<Messages.GherkinDocument.Feature.Scenario.Examples> getExamplesList() {
        return this.scenario.getExamplesList();
    }

    @Override
    public boolean hasExamples() {
        return this.scenario.getExamplesCount() > 0;
    }
}
