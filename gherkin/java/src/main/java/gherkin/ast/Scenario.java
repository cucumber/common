package gherkin.ast;

import java.util.Collections;
import java.util.List;

public class Scenario extends StepsContainer {
    private final List<Tag> tags;
    private final List<ScenarioData> examples;

    public Scenario(List<Tag> tags, Location location, String keyword, String name, String description, List<Step> steps, List<ScenarioData> examples) {
        super(location, keyword, name, description, steps);
        this.tags = Collections.unmodifiableList(tags);
        this.examples = Collections.unmodifiableList(examples);
    }

    public List<Tag> getTags() {
        return tags;
    }

    public List<ScenarioData> getExamples() {
        return examples;
    }
}
