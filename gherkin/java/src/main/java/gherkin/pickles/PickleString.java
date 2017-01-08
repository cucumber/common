package gherkin.pickles;

public class PickleString implements Argument {
    private final PickleLocation location;
    private final String content;

    public PickleString(PickleLocation location, String content) {
        this.location = location;
        this.content = content;
    }

    @Override
    public PickleLocation getLocation() {
        return location;
    }

    public String getContent() {
        return content;
    }
}
