package gherkin.utils.formatter.model;

import java.util.List;

import static io.cucumber.messages.Messages.GherkinDocument.Feature;

public interface IStepContainer {

    List<Feature.Tag> getTagsList();

    String getKeyword();

    String getName();

    String getDescription();

    boolean hasDescription();

    List<Feature.Step> getStepsList();

    List<Feature.Scenario.Examples> getExamplesList();

    boolean hasExamples();

}
