package gherkin.ast;

import java.util.Collections;
import java.util.List;

public class GherkinDocument extends Node {
    private final Feature feature;
    private final List<Comment> comments;

    public GherkinDocument(
            Feature feature,
            List<Comment> comments) {
        super(null);
        this.feature = feature;
        this.comments = Collections.unmodifiableList(comments);
    }

    public Feature getFeature() {
        return feature;
    }

    public List<Comment> getComments() {
        return comments;
    }
}
