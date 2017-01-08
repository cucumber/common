package gherkin.ast;

import java.util.Collections;
import java.util.List;

public class Scenario extends ScenarioDefinition {
    private final List<Tag> tags;

    public Scenario(List<Tag> tags, Location location, String keyword, String name, String description, List<Step> steps) {
        super(location, keyword, name, description, steps);
        this.tags = Collections.unmodifiableList(tags);
    }

    public List<Tag> getTags() {
        return tags;
    }
}
