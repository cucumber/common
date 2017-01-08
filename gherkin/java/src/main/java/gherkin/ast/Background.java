package gherkin.ast;

import java.util.List;

public class Background extends ScenarioDefinition {
    public Background(Location location, String keyword, String name, String description, List<Step> steps) {
        super(location, keyword, name, description, steps);
    }
}
