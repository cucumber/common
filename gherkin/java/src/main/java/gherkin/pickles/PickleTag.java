package gherkin.pickles;

public class PickleTag {
    private final PickleLocation location;
    private final String name;

    public PickleTag(PickleLocation location, String name) {
        this.location = location;
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
