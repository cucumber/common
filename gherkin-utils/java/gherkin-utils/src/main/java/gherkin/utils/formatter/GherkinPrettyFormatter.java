package gherkin.utils.formatter;

import gherkin.utils.formatter.model.BackgroundStepContainer;
import gherkin.utils.formatter.model.IStepContainer;
import gherkin.utils.formatter.model.ScenarioStepContainer;
import io.cucumber.messages.Messages.GherkinDocument;

import java.util.List;
import java.util.stream.Collectors;

public class GherkinPrettyFormatter {
    public static String pretty(GherkinDocument gherkinDocument) {

        GherkinDocument.Feature feature = gherkinDocument.getFeature();
        String featureData = prettyTags(feature.getTagsList(), "");

        featureData += feature.getKeyword() + ": " + feature.getName() + "\n";
        if (!feature.getDescription().isEmpty()) {
            featureData += feature.getDescription() + "\n";
        }

        for (GherkinDocument.Feature.FeatureChild featureChild : feature.getChildrenList()) {
            if (featureChild.hasBackground()) {
                featureData += prettyStepContainer(new BackgroundStepContainer(featureChild.getBackground()), "  ");
            } else if (featureChild.hasScenario()) {
                featureData += prettyStepContainer(new ScenarioStepContainer(featureChild.getScenario()), "  ");
            } else if (featureChild.hasRule()) {
                GherkinDocument.Feature.FeatureChild.Rule featureChildRule = featureChild.getRule();
                featureData += "\n  " + featureChildRule.getKeyword() + ": " + featureChildRule.getName() + "\n";
                if (!featureChildRule.getDescription().isEmpty()) {
                    featureData += featureChildRule.getDescription() + "\n";
                }

                for (GherkinDocument.Feature.FeatureChild.RuleChild ruleChild : featureChildRule.getChildrenList()) {
                    if (ruleChild.hasBackground()) {
                        featureData += prettyStepContainer(new BackgroundStepContainer(ruleChild.getBackground()), "    ");
                    }

                    if (ruleChild.hasScenario()) {
                        featureData += prettyStepContainer(new ScenarioStepContainer(ruleChild.getScenario()), "    ");
                    }
                }
            }
        }

        return featureData;
    }

    public static String prettyTags(List<GherkinDocument.Feature.Tag> tags, String indent) {
        if (tags == null || tags.size() == 0)
            return "";

        return indent + tags.stream().map(tag -> tag.getName()).collect(Collectors.joining(" ")) + "\n";
    }

    public static String prettyStepContainer(IStepContainer stepContainer, String indent) {
        String stepContainerString = "\n" + prettyTags(stepContainer.getTagsList(), indent)
                + indent + stepContainer.getKeyword() + ": " + stepContainer.getName() + "\n";

        if (stepContainer.hasDescription()) {
            stepContainerString += stepContainer.getDescription() + "\n\n";
        }

        stepContainerString += stepContainer.getStepsList()
                .stream()
                .map(step -> indent + "  " + step.getKeyword() + step.getText() + "\n")
                .collect(Collectors.joining());

        if (stepContainer.hasExamples()) {
            stepContainerString += stepContainer.getExamplesList()
                    .stream()
                    .map(examples -> prettyExample(examples, indent + "  "))
                    .collect(Collectors.joining());
        }

        return stepContainerString;
    }

    public static String prettyExample(GherkinDocument.Feature.Scenario.Examples example, String indent) {
        String exampleString = "\n" + indent + "Examples: " + example.getName() + "\n";

        exampleString += prettyTableRow(example.getTableHeader(), indent + "  ");

        exampleString += example.getTableBodyList()
                .stream()
                .map(row -> prettyTableRow(row, indent + "  "))
                .collect(Collectors.joining());

        return exampleString;
    }

    public static String prettyTableRow(GherkinDocument.Feature.TableRow row, String indent) {
        return indent +
                "| " +
                row.getCellsList()
                        .stream()
                        .map(cell -> cell.getValue())
                        .collect(Collectors.joining(" | "))
                + " |\n";
    }
}
