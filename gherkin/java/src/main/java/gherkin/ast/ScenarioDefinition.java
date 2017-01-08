package gherkin.ast;

import java.util.Collections;
import java.util.List;

public abstract class ScenarioDefinition extends Node {
    private final String keyword;
    private final String name;
    private final String description;
    private final List<Step> steps;

    public ScenarioDefinition(Location location, String keyword, String name, String description, List<Step> steps) {
        super(location);
        this.keyword = keyword;
        this.name = name;
        this.description = description;
        this.steps = Collections.unmodifiableList(steps);
    }

    public String getName() {
        return name;
    }

    public String getKeyword() {
        return keyword;
    }

    public String getDescription() {
        return description;
    }

    public List<Step> getSteps() {
        return steps;
    }
}
