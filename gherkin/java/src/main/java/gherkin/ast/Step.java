package gherkin.ast;

public class Step extends Node {
    private final String keyword;
    private final String text;
    private final Node argument;

    public Step(Location location, String keyword, String text, Node argument) {
        super(location);
        this.keyword = keyword;
        this.text = text;
        this.argument = argument;
    }

    public String getText() {
        return text;
    }

    public String getKeyword() {
        return keyword;
    }

    public Node getArgument() {
        return argument;
    }

}
