package io.cucumber.gherkin;

import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.unmodifiableList;

class GherkinDialects {
    static final Map<String, GherkinDialect> DIALECTS = new HashMap<>();

    static {
        DIALECTS.put("en", new GherkinDialect(
                "en",
                "English",
                "English",
                unmodifiableList(asList("Feature")),
                unmodifiableList(asList("Rule")),
                unmodifiableList(asList("Scenario", "Example")),
                unmodifiableList(asList("Scenario Outline")),
                unmodifiableList(asList("Background")),
                unmodifiableList(asList("Examples")),
                unmodifiableList(asList("Given ")),
                unmodifiableList(asList("When ")),
                unmodifiableList(asList("Then ")),
                unmodifiableList(asList("And ")),
                unmodifiableList(asList("But "))
        ));
        DIALECTS.put("no", new GherkinDialect(
                "no",
                "Norwegian",
                "Norsk",
                unmodifiableList(asList("Egenskap")),
                unmodifiableList(asList("Regel")),
                unmodifiableList(asList("Scenario")),
                unmodifiableList(asList("Scenariomal")),
                unmodifiableList(asList("Bakgrunn")),
                unmodifiableList(asList("Eksempler")),
                unmodifiableList(asList("Gitt ")),
                unmodifiableList(asList("Når ")),
                unmodifiableList(asList("Så ")),
                unmodifiableList(asList("Og ")),
                unmodifiableList(asList("Men "))
        ));
    }
}
