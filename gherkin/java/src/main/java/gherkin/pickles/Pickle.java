package gherkin.pickles;

import java.util.List;

import static java.util.Collections.unmodifiableList;

public class Pickle {
    private final String name;
    private final String language;
    private final List<PickleStep> steps;
    private final List<PickleTag> tags;
    private final List<PickleLocation> locations;

    public Pickle(String name, String language, List<PickleStep> steps, List<PickleTag> tags, List<PickleLocation> locations) {
        this.name = name;
        this.language = language;
        this.steps = unmodifiableList(steps);
        this.tags = tags;
        this.locations = unmodifiableList(locations);
    }

    public String getName() {
        return name;
    }

    public String getLanguage() {
        return language;
    }

    public List<PickleStep> getSteps() {
        return steps;
    }

    public List<PickleLocation> getLocations() {
        return locations;
    }

    public List<PickleTag> getTags() {
        return tags;
    }
}
