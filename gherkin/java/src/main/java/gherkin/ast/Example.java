package gherkin.ast;

import java.util.Collections;
import java.util.List;

public class Example extends StepsContainer {
    private final List<Tag> tags;
    private final List<ExampleData> examples;

    public Example(List<Tag> tags, Location location, String keyword, String name, String description, List<Step> steps, List<ExampleData> examples) {
        super(location, keyword, name, description, steps);
        this.tags = Collections.unmodifiableList(tags);
        this.examples = Collections.unmodifiableList(examples);
    }

    public List<Tag> getTags() {
        return tags;
    }

    public List<ExampleData> getExampleData() {
        return examples;
    }
}
