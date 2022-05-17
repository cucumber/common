package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class FeatureChild {
    private final Rule rule;
    private final Background background;
    private final Scenario scenario;

    public static FeatureChild of(Rule rule) {
        return new FeatureChild(
            requireNonNull(rule, "FeatureChild.rule cannot be null"),
            null,
            null
        );
    }

    public static FeatureChild of(Background background) {
        return new FeatureChild(
            null,
            requireNonNull(background, "FeatureChild.background cannot be null"),
            null
        );
    }

    public static FeatureChild of(Scenario scenario) {
        return new FeatureChild(
            null,
            null,
            requireNonNull(scenario, "FeatureChild.scenario cannot be null")
        );
    }

    public FeatureChild(
        Rule rule,
        Background background,
        Scenario scenario
    ) {
        this.rule = rule;
        this.background = background;
        this.scenario = scenario;
    }

    public Optional<Rule> getRule() {
        return Optional.ofNullable(rule);
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
        FeatureChild that = (FeatureChild) o;
        return 
            Objects.equals(rule, that.rule) &&         
            Objects.equals(background, that.background) &&         
            Objects.equals(scenario, that.scenario);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            rule,
            background,
            scenario
        );
    }

    @Override
    public String toString() {
        return "FeatureChild{" +
            "rule=" + rule +
            ", background=" + background +
            ", scenario=" + scenario +
            '}';
    }
}
