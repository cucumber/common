package gherkin.ast;

public class DocString extends Node {
    private final String contentType;
    private final String content;

    public DocString(Location location, String contentType, String content) {
        super(location);
        this.contentType = contentType;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public String getContentType() {
        return contentType;
    }
}
