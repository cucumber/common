package io.cucumber.gherkin.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class GherkinPrettyFormatterTest {

    public void assertPrettyIdentical(String source) {
        Assertions.assertEquals(new GherkinPrettyFormatter().format(GherkinParser.parse(source)), source);
    }

    @Test
    @DisplayName("Renders a feature with no scenarios")
    public void renderAFeatureWithNoScenario() {
        assertPrettyIdentical("Feature: hello\n");
    }

    @Test
    @DisplayName("Renders a feature with two scenarios")
    public void renderAFeatureWithTwoScenarios() {
        String source = "Feature: hello\n" +
                "\n" +
                "  Scenario: one\n" +
                "    Given hello\n" +
                "\n" +
                "  Scenario: two\n" +
                "    Given world\n";
        assertPrettyIdentical(source);
    }

    @Test
    @DisplayName("Renders a feature with two scenarios in a rule")
    public void renderAFeatureWithTwoScenariosInARule() {
        String source = "Feature: hello\n" +
                "\n" +
                "  Rule: ok\n" +
                "\n" +
                "    Scenario: one\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      Given world\n";
        assertPrettyIdentical(source);
    }

    @Test
    @DisplayName("Renders a feature with background and scenario")
    public void renderAFeatureWithBackgroundAndScenario() {
        String source = "Feature: hello\n" +
                "\n" +
                "  Background: bbb\n" +
                "    Given hello\n" +
                "\n" +
                "  Scenario: two\n" +
                "    Given world\n";
        assertPrettyIdentical(source);
    }

    @Test
    @DisplayName("Renders a rule with background and scenario")
    public void renderARuleWithBackgroundAndScenario() {
        String source = "Feature: hello\n" +
                "\n" +
                "  Rule: machin\n" +
                "\n" +
                "    Background: bbb\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      Given world\n";
        assertPrettyIdentical(source);
    }

    @Test
    @DisplayName("Renders tags when set")
    public void renderTagsWhenSet() {
        String source = "@featureTag\n" +
                "Feature: hello\n" +
                "\n" +
                "  Rule: machin\n" +
                "\n" +
                "    Background: bbb\n" +
                "      Given hello\n" +
                "\n" +
                "    @scenarioTag @secondTag\n" +
                "    Scenario: two\n" +
                "      Given world\n";
        assertPrettyIdentical(source);
    }

    @Test
    @DisplayName("Renders descriptions when set")
    public void renderDescriptionsWhenSet() {
        String source = "Feature: hello\n" +
                "  So this is a feature\n" +
                "\n" +
                "  Rule: machin\n" +
                "    The first rule of the feature states things\n" +
                "\n" +
                "    Background: bbb\n" +
                "      We can have some explications for the background\n" +
                "\n" +
                "      Given hello\n" +
                "\n" +
                "    Scenario: two\n" +
                "      This scenario will do things, maybe\n" +
                "\n" +
                "      Given world\n";
        assertPrettyIdentical(source);
    }
}
