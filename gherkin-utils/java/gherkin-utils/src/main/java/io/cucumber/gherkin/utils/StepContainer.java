package io.cucumber.gherkin.utils;

import java.util.List;

import static io.cucumber.messages.Messages.GherkinDocument.Feature;

public interface StepContainer {

    List<Feature.Tag> getTagsList();

    String getKeyword();

    String getName();

    String getDescription();

    boolean hasDescription();

    List<Feature.Step> getStepsList();

    List<Feature.Scenario.Examples> getExamplesList();

    boolean hasExamples();

}
