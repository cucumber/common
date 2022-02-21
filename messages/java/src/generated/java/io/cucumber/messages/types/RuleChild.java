package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class RuleChild {
    private final Background background;
    private final Scenario scenario;

    public static RuleChild of(Background background) {
        return new RuleChild(
            requireNonNull(background, "RuleChild.background cannot be null"),
            null
        );
    }

    public static RuleChild of(Scenario scenario) {
        return new RuleChild(
            null,
            requireNonNull(scenario, "RuleChild.scenario cannot be null")
        );
    }

    public RuleChild(
        Background background,
        Scenario scenario
    ) {
        this.background = background;
        this.scenario = scenario;
    }

    public Optional<Background> getBackground() {
        return Optional.ofNullable(background);
    }

    public Optional<Scenario> getScenario() {
        return Optional.ofNullable(scenario);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RuleChild that = (RuleChild) o;
        return 
            Objects.equals(background, that.background) &&         
            Objects.equals(scenario, that.scenario);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            background,
            scenario
        );
    }

    @Override
    public String toString() {
        return "RuleChild{" +
            "background=" + background +
            ", scenario=" + scenario +
            '}';
    }
}
