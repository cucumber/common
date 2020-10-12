package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GherkinPrettyFormatterTest {

    void assertPrettyIdentical(String source) {
        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        Assertions.assertEquals(new GherkinPrettyFormatter().format(gherkinDocument), source);
    }

    @Test
    @DisplayName("Renders a feature with no scenarios")
    void renderAFeatureWithNoScenario() {
        assertPrettyIdentical("Feature: hello\n");
    }

    @Test
    @DisplayName("Renders a feature with two scenarios")
    void renderAFeatureWithTwoScenarios() {
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
    void renderAFeatureWithTwoScenariosInARule() {
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
    void renderAFeatureWithBackgroundAndScenario() {
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
    void renderARuleWithBackgroundAndScenario() {
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
    void renderTagsWhenSet() {
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
    void renderDescriptionsWhenSet() {
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
