package gherkin.pickles;

public class PickleString implements Argument {
    private final PickleLocation location;
    private final String content;
    private final String contentType;

    public PickleString(PickleLocation location, String content, String contentType) {
        this.location = location;
        this.content = content;
        this.contentType = contentType;
    }

    public PickleString(PickleLocation location, String content) {
        this(location, content, null);
    }

    @Override
    public PickleLocation getLocation() {
        return location;
    }

    public String getContent() {
        return content;
    }

    public String getContentType() {
        return contentType;
    }
}
