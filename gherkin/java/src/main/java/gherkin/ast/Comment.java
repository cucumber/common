package gherkin.ast;

public class Comment extends Node {
    private final String text;

    public Comment(Location location, String text) {
        super(location);
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
