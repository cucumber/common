package gherkin.ast;

import java.util.Collections;
import java.util.List;

public class Rule extends Node {
    private final String keyword;
    private final String name;
    private final String description;
    private final List<Node> children;

    public Rule(
            Location location,
            String keyword,
            String name,
            String description,
            List<Node> children) {
        super(location);
        this.keyword = keyword;
        this.name = name;
        this.description = description;
        this.children = Collections.unmodifiableList(children);
    }

    public List<Node> getChildren() {
        return children;
    }

    public String getKeyword() {
        return keyword;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
