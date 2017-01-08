package gherkin.pickles;

public class PickleCell {
    private final PickleLocation location;
    private final String value;

    public PickleCell(PickleLocation location, String value) {
        this.location = location;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public PickleLocation getLocation() {
        return location;
    }
}
