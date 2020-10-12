package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class GherkinDocumentWalkerTest {

    void assertCopy(Object copy, Object source) {
        Assertions.assertNotSame(copy, source);
        Assertions.assertEquals(copy, source);
    }

    @Test
    @DisplayName("returns a deep copy")
    void returnsADeepCopy() {

        String source = "@featureTag\n" +
                "Feature: hello\n" +
                "  This feature has a description\n" +
                "\n" +
                "  Background: Base Background\n" +
                "    This is a described background\n" +
                "    Given a passed step\n" +
                "\n" +
                "  @scenarioTag\n" +
                "  Scenario: salut\n" +
                "    Yes, there is a description here too\n" +
                "\n" +
                "  Rule: roule\n" +
                "    Can we describe a Rule ?\n" +
                "\n" +
                "    Background: poupidou\n" +
                "    Scenario: pouet\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new AcceptAllFilter() {
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);

        assertCopy(newGherkinDocument, gherkinDocument);

        assertCopy(newGherkinDocument.getFeature(), gherkinDocument.getFeature());

        assertCopy(newGherkinDocument.getFeature().getChildren(0).getBackground(),
                gherkinDocument.getFeature().getChildren(0).getBackground());

        assertCopy(newGherkinDocument.getFeature().getChildren(1).getScenario(),
                gherkinDocument.getFeature().getChildren(1).getScenario());

        assertCopy(newGherkinDocument.getFeature().getChildren(2).getRule(),
                gherkinDocument.getFeature().getChildren(2).getRule());

        assertCopy(newGherkinDocument.getFeature().getChildren(0).getBackground().getStepsList(),
                gherkinDocument.getFeature().getChildren(0).getBackground().getStepsList());
    }

    @Test
    @DisplayName("filtering objects")
    void filteringObjects() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
                return scenario.getName().equals("Earth");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("keeps scenario with search hit in step")
    void keepsScenarioWithSearchHitInStep() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptStep(Messages.GherkinDocument.Feature.Step step) {
                return step.getText().contains("liquid");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("does not leave null object as a feature child")
    void doesNotLeaveNullObjectAsAFeatureChild() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
                return scenario.getName().equals("Earth");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);

        Assertions.assertEquals(newGherkinDocument
                        .getFeature()
                        .getChildrenList()
                        .stream()
                        .filter(featureChild -> featureChild == null)
                        .collect(Collectors.toList())
                , new ArrayList<>());
    }

    @Test
    @DisplayName("keeps a hit scenario even when no steps match")
    void keepsAHitScenarioEvenWhenNoStepsMatch() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
                return scenario.getName().equals("Saturn");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("keeps a hit background")
    void keepsAHitBackground() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Background: Space\n" +
                "    Given space is real\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "    Background: Milky Way\n" +
                "      Given it contains our system\n" +
                "\n" +
                "  Rule: Black Hole\n" +
                "    Background: TON 618\n" +
                "      Given it exists\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptBackground(Messages.GherkinDocument.Feature.Background background) {
                return background.getName().equals("Milky Way");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Background: Space\n" +
                "    Given space is real\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Background: Milky Way\n" +
                "      Given it contains our system\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("keeps a hit in background step")
    void keepsAHitInBackgroundStep() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Background: Space\n" +
                "    Given space is real\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "    Background: Milky Way\n" +
                "      Given it contains our system\n" +
                "\n" +
                "  Rule: Black Hole\n" +
                "    Background: TON 618\n" +
                "      Given it exists\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptStep(Messages.GherkinDocument.Feature.Step step) {
                return step.getText().contains("space");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Background: Space\n" +
                "    Given space is real\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Background: Milky Way\n" +
                "      Given it contains our system\n" +
                "\n" +
                "  Rule: Black Hole\n" +
                "\n" +
                "    Background: TON 618\n" +
                "      Given it exists\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("keeps scenario in rule")
    void keepsScenarioInRule() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Background: TON 618\n" +
                "      Given it's a black hole\n" +
                "\n" +
                "    Scenario: Milky Way\n" +
                "      Given it contains our system\n" +
                "\n" +
                "    Scenario: Andromeda\n" +
                "      Given it exists\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
                return scenario.getName().equals("Andromeda");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Background: TON 618\n" +
                "      Given it's a black hole\n" +
                "\n" +
                "    Scenario: Andromeda\n" +
                "      Given it exists\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("keeps scenario and background in rule")
    void keepsScenarioAndBackgroundInRule() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Background: TON 618\n" +
                "      Given it's a black hole\n" +
                "\n" +
                "    Scenario: Milky Way\n" +
                "      Given it contains our system\n" +
                "\n" +
                "    Scenario: Andromeda\n" +
                "      Given it exists\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
                return rule.getName().equals("Galaxy");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Background: TON 618\n" +
                "      Given it's a black hole\n" +
                "\n" +
                "    Scenario: Milky Way\n" +
                "      Given it contains our system\n" +
                "\n" +
                "    Scenario: Andromeda\n" +
                "      Given it exists\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("only keeps rule and its content")
    void onlyKeepsRuleAndItsContent() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Milky Way\n" +
                "    Given it contains our system\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Scenario: Andromeda\n" +
                "      Given it exists\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
                return true;
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Rule: Galaxy\n" +
                "\n" +
                "    Scenario: Andromeda\n" +
                "      Given it exists\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("return a feature and keep scenario")
    void returnAFeatureAndKeepScenario() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
            @Override
            public boolean acceptFeature(Messages.GherkinDocument.Feature feature) {
                return feature.getName().equals("Solar System");
            }
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);
        String newSource = new GherkinPrettyFormatter().format(newGherkinDocument);
        String expectedNewSource = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Assertions.assertEquals(newSource, expectedNewSource);
    }

    @Test
    @DisplayName("returns null when no hit found")
    void returnsNullWhenNoHitFound() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "  Scenario: Saturn\n" +
                "    Given is the sixth planet from the Sun\n" +
                "\n" +
                "  Scenario: Earth\n" +
                "    Given is a planet with liquid water\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker walker = new GherkinDocumentWalker(new RejectAllFilter() {
        }, new Handler() {
        });
        Messages.GherkinDocument newGherkinDocument = walker.walkGherkinDocument(gherkinDocument);

        Assertions.assertEquals(newGherkinDocument, null);
    }

    @Test
    @DisplayName("is called for each steps")
    void isCalledForEachSteps() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "        Scenario: Earth\n" +
                "          Given it is a planet\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        List<String> stepText = new ArrayList<>();
        GherkinDocumentWalker astWalker = new GherkinDocumentWalker(new AcceptAllFilter() {
        }, new Handler() {
            @Override
            public void handleStep(Messages.GherkinDocument.Feature.Step step) {
                stepText.add(step.getText());
            }
        });
        astWalker.walkGherkinDocument(gherkinDocument);

        Assertions.assertEquals(stepText, Arrays.asList("it is a planet"));
    }

    @Test
    @DisplayName("is called for each scenarios")
    void isCalledForEachScenarios() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "        Scenario: Earth\n" +
                "          Given it is a planet\n" +
                "\n" +
                "        Scenario: Saturn\n" +
                "          Given it's not a liquid planet\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        List<String> scenarioName = new ArrayList<>();
        GherkinDocumentWalker astWalker = new GherkinDocumentWalker(new AcceptAllFilter() {
        }, new Handler() {
            @Override
            public void handleScenario(Messages.GherkinDocument.Feature.Scenario scenario) {
                scenarioName.add(scenario.getName());
            }
        });
        astWalker.walkGherkinDocument(gherkinDocument);

        Assertions.assertEquals(scenarioName, Arrays.asList("Earth", "Saturn"));
    }

    @Test
    @DisplayName("is called for each backgrounds")
    void isCalledForEachBackgrounds() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "        Background: Milky Way\n" +
                "          Scenario: Earth\n" +
                "            Given it is our galaxy\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        List<String> backgroundName = new ArrayList<>();
        GherkinDocumentWalker astWalker = new GherkinDocumentWalker(new AcceptAllFilter() {
        }, new Handler() {
            @Override
            public void handleBackground(Messages.GherkinDocument.Feature.Background background) {
                backgroundName.add(background.getName());
            }
        });
        astWalker.walkGherkinDocument(gherkinDocument);

        Assertions.assertEquals(backgroundName, Arrays.asList("Milky Way"));
    }

    @Test
    @DisplayName("is called for each rules")
    void isCalledForEachRules() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "        Rule: On a planet\n" +
                "          Scenario: There is life\n" +
                "            Given there is water\n" +
                "\n" +
                "        Rule: On an exoplanet\n" +
                "          Scenario: There is extraterrestrial life\n" +
                "            Given there is a non-humanoid form of life\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        List<String> ruleName = new ArrayList<>();
        GherkinDocumentWalker astWalker = new GherkinDocumentWalker(new AcceptAllFilter() {
        }, new Handler() {
            @Override
            public void handleRule(Messages.GherkinDocument.Feature.FeatureChild.Rule rule) {
                ruleName.add(rule.getName());
            }
        });
        astWalker.walkGherkinDocument(gherkinDocument);

        Assertions.assertEquals(ruleName, Arrays.asList("On a planet", "On an exoplanet"));
    }

    @Test
    @DisplayName("is called for each features")
    void isCalledForEachFeatures() {
        String source = "Feature: Solar System\n" +
                "\n" +
                "        Rule: On a planet\n" +
                "          Scenario: There is life\n" +
                "            Given there is water\n" +
                "\n" +
                "        Rule: On an exoplanet\n" +
                "          Scenario: There is extraterrestrial life\n" +
                "            Given there is a non-humanoid form of life\n";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        List<String> featureName = new ArrayList<>();
        GherkinDocumentWalker astWalker = new GherkinDocumentWalker(new AcceptAllFilter() {
        }, new Handler() {
            @Override
            public void handleFeature(Messages.GherkinDocument.Feature feature) {
                featureName.add(feature.getName());
            }
        });
        astWalker.walkGherkinDocument(gherkinDocument);

        Assertions.assertEquals(featureName, Arrays.asList("Solar System"));
    }

    @Test
    @DisplayName("does not fail with empty/commented documents")
    void doesNotFailWithEmptyOrCommentedDocuments() {
        String source = "# Feature: Solar System";

        Messages.GherkinDocument gherkinDocument = GherkinParser.parse(source);
        GherkinDocumentWalker astWalker = new GherkinDocumentWalker(new AcceptAllFilter() {
        }, new Handler() {
        });
        astWalker.walkGherkinDocument(gherkinDocument);
    }

}
