package io.cucumber.gherkin.utils;

import io.cucumber.messages.Messages.GherkinDocument;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public final class GherkinDocumentWalker {
    private final Filter filter;
    private final Handler handler;

    public GherkinDocumentWalker(Filter filters, Handler handler) {
        this.filter = filters;
        this.handler = handler;
    }

    public GherkinDocument walkGherkinDocument(GherkinDocument gherkinDocument) {
        if (!gherkinDocument.hasFeature()) {
            return null;
        }

        GherkinDocument.Feature feature = walkFeature(gherkinDocument.getFeature());

        if (feature == null) {
            return null;
        }

        return GherkinDocument
                .newBuilder()
                .setFeature(feature)
                .addAllComments(gherkinDocument.getCommentsList())
                .setUri(gherkinDocument.getUri())
                .build();
    }

    private GherkinDocument.Feature walkFeature(GherkinDocument.Feature feature) {
        List<GherkinDocument.Feature.FeatureChild> keptChildren = walkFeatureChildren(feature.getChildrenList());

        handler.handleFeature(feature);

        boolean backgroundKept = keptChildren
                .stream()
                .anyMatch(featureChild -> featureChild.hasBackground());

        if (filter.acceptFeature(feature) || backgroundKept) {
            return copyFeature(feature,
                    feature.getChildrenList()
                            .stream()
                            .map(
                                    child -> {
                                        if (child.hasBackground()) {
                                            return GherkinDocument.Feature.FeatureChild
                                                    .newBuilder()
                                                    .setBackground(copyBackground(child.getBackground()))
                                                    .build();
                                        }

                                        if (child.hasScenario()) {
                                            return GherkinDocument.Feature.FeatureChild
                                                    .newBuilder()
                                                    .setScenario(copyScenario(child.getScenario()))
                                                    .build();
                                        }

                                        if (child.hasRule()) {
                                            return GherkinDocument.Feature.FeatureChild
                                                    .newBuilder()
                                                    .setRule(copyRule(child.getRule(), child.getRule().getChildrenList()))
                                                    .build();
                                        }

                                        return child;
                                    }
                            )
                            .collect(Collectors.toList())
            );
        }

        if (keptChildren
                .stream()
                .anyMatch(featureChild -> featureChild != null)) {
            return copyFeature(feature, keptChildren);
        }

        return null;
    }

    private GherkinDocument.Feature copyFeature(GherkinDocument.Feature feature,
                                                List<GherkinDocument.Feature.FeatureChild> featureChildren) {
        return GherkinDocument.Feature
                .newBuilder()
                .addAllChildren(filterFeatureChildren(feature, featureChildren))
                .setLocation(feature.getLocation())
                .setLanguage(feature.getLanguage())
                .setKeyword(feature.getKeyword())
                .setName(feature.getName())
                .setDescription(!feature.getDescription().isEmpty()
                        ? feature.getDescription()
                        : "")
                .addAllTags(copyTags(feature.getTagsList()))
                .build();
    }

    private List<GherkinDocument.Feature.Tag> copyTags(List<GherkinDocument.Feature.Tag> tags) {
        return tags
                .stream()
                .map(tag -> GherkinDocument.Feature.Tag
                        .newBuilder()
                        .setName(tag.getName())
                        .setId(tag.getId())
                        .setLocation(tag.getLocation())
                        .build())
                .collect(Collectors.toList());
    }

    private List<GherkinDocument.Feature.FeatureChild> filterFeatureChildren(
            GherkinDocument.Feature feature,
            List<GherkinDocument.Feature.FeatureChild> featureChildren) {
        List<GherkinDocument.Feature.FeatureChild> copyChildren = new ArrayList<>();

        Map<String, GherkinDocument.Feature.FeatureChild> scenariosKeptById = featureChildren
                .stream()
                .filter(child -> child.hasScenario())
                .collect(Collectors.toMap(child -> child.getScenario().getId(), child -> child));

        Map<String, GherkinDocument.Feature.FeatureChild> ruleKeptById = featureChildren
                .stream()
                .filter(child -> child.hasRule())
                .collect(Collectors.toMap(child -> child.getRule().getId(), child -> child));

        for (GherkinDocument.Feature.FeatureChild featureChild : feature.getChildrenList()) {
            if (featureChild.hasBackground()) {
                copyChildren.add(GherkinDocument.Feature.FeatureChild
                        .newBuilder()
                        .setBackground(copyBackground(featureChild.getBackground()))
                        .build());
            }

            if (featureChild.hasScenario()) {
                GherkinDocument.Feature.FeatureChild scenarioCopy =
                        scenariosKeptById.get(featureChild.getScenario().getId());

                if (scenarioCopy != null) {
                    copyChildren.add(scenarioCopy);
                }
            }

            if (featureChild.hasRule()) {
                GherkinDocument.Feature.FeatureChild ruleCopy =
                        ruleKeptById.get(featureChild.getRule().getId());

                if (ruleCopy != null) {
                    copyChildren.add(ruleCopy);
                }
            }
        }
        return copyChildren;
    }

    private List<GherkinDocument.Feature.FeatureChild> walkFeatureChildren(
            List<GherkinDocument.Feature.FeatureChild> children) {

        List<GherkinDocument.Feature.FeatureChild> childrenCopy = new ArrayList<>();

        for (GherkinDocument.Feature.FeatureChild child : children) {
            GherkinDocument.Feature.Background backgroundCopy = null;
            GherkinDocument.Feature.Scenario scenarioCopy = null;
            GherkinDocument.Feature.FeatureChild.Rule ruleCopy = null;

            GherkinDocument.Feature.FeatureChild.Builder childrenCopyBuilder =
                    GherkinDocument.Feature.FeatureChild.newBuilder();

            if (child.hasBackground()) {
                backgroundCopy = walkBackground(child.getBackground());
                if (backgroundCopy != null) {
                    childrenCopyBuilder.setBackground(backgroundCopy);
                }
            }

            if (child.hasScenario()) {
                scenarioCopy = walkScenario(child.getScenario());
                if (scenarioCopy != null) {
                    childrenCopyBuilder.setScenario(scenarioCopy);
                }
            }

            if (child.hasRule()) {
                ruleCopy = walkRule(child.getRule());
                if (ruleCopy != null) {
                    childrenCopyBuilder.setRule(ruleCopy);
                }
            }

            if (childrenCopyBuilder.hasBackground() || childrenCopyBuilder.hasScenario() || childrenCopyBuilder.hasRule()) {
                childrenCopy.add(childrenCopyBuilder.build());
            }
        }
        return childrenCopy;
    }

    private GherkinDocument.Feature.FeatureChild.Rule walkRule(GherkinDocument.Feature.FeatureChild.Rule rule) {
        List<GherkinDocument.Feature.FeatureChild.RuleChild> children = walkRuleChildren(rule.getChildrenList());

        handler.handleRule(rule);

        boolean backgroundKept =
                children
                        .stream()
                        .anyMatch(child -> child != null && child.hasBackground());

        List<GherkinDocument.Feature.FeatureChild.RuleChild> scenariosKept =
                children
                        .stream()
                        .filter(child -> child != null && child.hasScenario())
                        .collect(Collectors.toList());

        if (filter.acceptRule(rule) || backgroundKept) {
            return copyRule(rule, rule.getChildrenList());
        }

        if (scenariosKept.size() > 0) {
            return copyRule(rule, scenariosKept);
        }

        return null;
    }

    private GherkinDocument.Feature.FeatureChild.Rule copyRule(
            GherkinDocument.Feature.FeatureChild.Rule rule,
            List<GherkinDocument.Feature.FeatureChild.RuleChild> children) {
        return GherkinDocument.Feature.FeatureChild.Rule
                .newBuilder()
                .setId(rule.getId())
                .setName(rule.getName())
                .setDescription(rule.getDescription())
                .setLocation(rule.getLocation())
                .setKeyword(rule.getKeyword())
                .addAllChildren(filterRuleChildren(rule.getChildrenList(), children))
                .build();
    }

    private List<GherkinDocument.Feature.FeatureChild.RuleChild> filterRuleChildren(
            List<GherkinDocument.Feature.FeatureChild.RuleChild> children,
            List<GherkinDocument.Feature.FeatureChild.RuleChild> childrenKept) {
        List<GherkinDocument.Feature.FeatureChild.RuleChild> childrenCopy = new ArrayList<>();

        List<String> scenariosKeptIds = childrenKept
                .stream()
                .filter(child -> child.hasScenario())
                .map(child -> child.getScenario().getId())
                .collect(Collectors.toList());

        for (GherkinDocument.Feature.FeatureChild.RuleChild child : children) {
            if (child.hasBackground()) {
                childrenCopy.add(GherkinDocument.Feature.FeatureChild.RuleChild
                        .newBuilder()
                        .setBackground(copyBackground(child.getBackground()))
                        .build());
            }

            if (child.hasScenario() && scenariosKeptIds.contains(child.getScenario().getId())) {
                childrenCopy.add(GherkinDocument.Feature.FeatureChild.RuleChild
                        .newBuilder()
                        .setScenario(copyScenario(child.getScenario()))
                        .build());
            }
        }

        return childrenCopy;
    }

    private List<GherkinDocument.Feature.FeatureChild.RuleChild> walkRuleChildren(
            List<GherkinDocument.Feature.FeatureChild.RuleChild> children) {
        List<GherkinDocument.Feature.FeatureChild.RuleChild> childrenCopy = new ArrayList<>();

        for (GherkinDocument.Feature.FeatureChild.RuleChild child : children) {
            if (child.hasBackground() && walkBackground(child.getBackground()) != null) {
                childrenCopy.add(GherkinDocument.Feature.FeatureChild.RuleChild
                        .newBuilder()
                        .setBackground(walkBackground(child.getBackground()))
                        .build());
            }

            if (child.hasScenario() && walkScenario(child.getScenario()) != null) {
                childrenCopy.add(GherkinDocument.Feature.FeatureChild.RuleChild
                        .newBuilder()
                        .setScenario(walkScenario(child.getScenario()))
                        .build());
            }
        }

        return childrenCopy;
    }

    private GherkinDocument.Feature.Background walkBackground(GherkinDocument.Feature.Background background) {
        List<GherkinDocument.Feature.Step> steps = walkAllSteps(background.getStepsList());
        handler.handleBackground(background);

        if (filter.acceptBackground(background) ||
                steps.stream().anyMatch(step -> step != null)
        ) {
            return copyBackground(background);
        }

        return null;
    }

    private GherkinDocument.Feature.Background copyBackground(GherkinDocument.Feature.Background background) {
        return GherkinDocument.Feature.Background
                .newBuilder()
                .setId(background.getId())
                .setName(background.getName())
                .setLocation(background.getLocation())
                .setKeyword(background.getKeyword())
                .addAllSteps(background.getStepsList()
                        .stream()
                        .map(step -> copyStep(step))
                        .collect(Collectors.toList()))
                .setDescription(!background.getDescription().isEmpty()
                        ? background.getDescription()
                        : "")
                .build();
    }

    private GherkinDocument.Feature.Scenario walkScenario(GherkinDocument.Feature.Scenario scenario) {
        List<GherkinDocument.Feature.Step> steps = walkAllSteps(scenario.getStepsList());
        handler.handleScenario(scenario);

        if (filter.acceptScenario(scenario) ||
                steps.stream().anyMatch(step -> step != null)
        ) {
            return copyScenario(scenario);
        }

        return null;
    }

    private GherkinDocument.Feature.Scenario copyScenario(GherkinDocument.Feature.Scenario scenario) {
        return GherkinDocument.Feature.Scenario
                .newBuilder()
                .setId(scenario.getId())
                .setName(scenario.getName())
                .setDescription(!scenario.getDescription().isEmpty()
                        ? scenario.getDescription()
                        : "")
                .setLocation(scenario.getLocation())
                .setKeyword(scenario.getKeyword())
                .addAllExamples(scenario.getExamplesList())
                .addAllSteps(scenario.getStepsList()
                        .stream()
                        .map(step -> copyStep(step))
                        .collect(Collectors.toList()))
                .addAllTags(copyTags(scenario.getTagsList()))
                .build();
    }

    private List<GherkinDocument.Feature.Step> walkAllSteps(List<GherkinDocument.Feature.Step> steps) {
        return steps
                .stream()
                .map(step -> walkStep(step))
                .collect(Collectors.toList());
    }

    private GherkinDocument.Feature.Step walkStep(GherkinDocument.Feature.Step step) {
        handler.handleStep(step);

        if (!filter.acceptStep(step)) {
            return null;
        }

        return copyStep(step);
    }

    private GherkinDocument.Feature.Step copyStep(GherkinDocument.Feature.Step step) {

        GherkinDocument.Feature.Step.Builder featureStepBuilder = GherkinDocument.Feature.Step
                .newBuilder()
                .setId(step.getId())
                .setKeyword(step.getKeyword())
                .setLocation(step.getLocation())
                .setText(step.getText());

        if (step.hasDataTable()) {
            featureStepBuilder.setDataTable(step.getDataTable());
        }

        if (step.hasDocString()) {
            featureStepBuilder.setDocString(step.getDocString());
        }
        return featureStepBuilder.build();
    }
}
