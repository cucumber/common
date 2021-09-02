package org.gherkin.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import io.cucumber.messages.types.Background;
import io.cucumber.messages.types.Feature;
import io.cucumber.messages.types.FeatureChild;
import io.cucumber.messages.types.GherkinDocument;
import io.cucumber.messages.types.Rule;
import io.cucumber.messages.types.RuleChild;
import io.cucumber.messages.types.Scenario;
import io.cucumber.messages.types.Step;
import io.cucumber.messages.types.Tag;

public class GherkinDocumentWalker {
    private final IFilters filters;
    private final IHandlers handlers;

    GherkinDocumentWalker(IFilters filters, IHandlers handlers) {
        this.filters = filters == null ? new DefaultFilters() : filters;
        this.handlers = handlers == null ? new DefaultHandlers() : handlers;
    }

    GherkinDocumentWalker() {
        this.filters = new DefaultFilters();
        this.handlers = new DefaultHandlers();
    }

    public GherkinDocument walkGherkinDocument(GherkinDocument gherkinDocument) {
        if (gherkinDocument.getFeature() == null) {
            return null;
        }

        Feature feature = walkFeature(gherkinDocument.getFeature());

        if (feature == null) {
            return null;
        }

        return new GherkinDocument(gherkinDocument.getUri(), gherkinDocument.getFeature(),
                gherkinDocument.getComments());

    }

    protected Feature walkFeature(Feature feature) {
        List<FeatureChild> keptChildren = walkFeatureChildren(feature.getChildren());

        handlers.handleFeature(feature);

        List<FeatureChild> backgroundKept = keptChildren.stream().filter(fc -> fc.getBackground() != null).collect(Collectors.toList());

        if (filters.acceptFeature(feature) || !backgroundKept.isEmpty()) {
            return copyFeature(
                    feature,
                    feature.getChildren().stream().map((child) -> {
                        if (child.getBackground() != null) {
                            new FeatureChild(null, copyBackground(child.getBackground()), null);
                        }
                        if (child.getScenario() != null) {
                            return new FeatureChild(null, null, copyScenario(child.getScenario()));
                        }
                        if (child.getRule() != null) {
                            return new FeatureChild(copyRule(child.getRule(), child.getRule().getChildren()), null, null);
                        }
                        return null;
                    }).collect(Collectors.toList()));
        }

        if (keptChildren.stream().anyMatch(Objects::nonNull)) {
            return copyFeature(feature, keptChildren);
        }
        return null;
    }

    private Feature copyFeature(
            Feature feature,
            List<FeatureChild> children
    ) {
        return new Feature(
                feature.getLocation(),
                copyTags(feature.getTags()),
                feature.getLanguage(),
                feature.getKeyword(),
                feature.getName(),
                feature.getDescription(),
                filterFeatureChildren(feature, children));
    }

    private List<Tag> copyTags(List<Tag> tags) {
        return tags.stream().map(tag -> new Tag(tag.getLocation(), tag.getName(), tag.getId())).collect(Collectors.toList());
    }

    private List<FeatureChild> filterFeatureChildren(
            Feature feature,
            List<FeatureChild> children) {
        List<FeatureChild> copyChildren = new ArrayList<>();
        Map<String, FeatureChild> scenariosKeptById = children.stream()
                .filter(child -> child.getScenario() != null)
                .collect(Collectors.toMap(fc -> fc.getScenario().getId(), Function.identity()));

        Map<String, FeatureChild> ruleKeptById = children.stream()
                .filter(child -> child.getRule() != null)
                .collect(Collectors.toMap(fc -> fc.getRule().getId(), Function.identity()));

        for (FeatureChild child : feature.getChildren()) {
            if (child.getBackground() != null) {
                copyChildren.add(new FeatureChild(null, child.getBackground(), null));
            }
            if (child.getScenario() != null) {
                FeatureChild scenarioCopy = scenariosKeptById.get(child.getScenario().getId());
                if (scenarioCopy != null) {
                    copyChildren.add(scenarioCopy);
                }
            }
            if (child.getRule() != null) {
                FeatureChild ruleCopy = ruleKeptById.get(child.getRule().getId());
                if (ruleCopy != null) {
                    copyChildren.add(ruleCopy);
                }
            }
        }
        return copyChildren;
    }

    private List<FeatureChild> walkFeatureChildren(List<FeatureChild> children) {
        List<FeatureChild> childrenCopy = new ArrayList<>();

        for (FeatureChild child : children) {
            Background backgroundCopy = null;
            Scenario scenarioCopy = null;
            Rule ruleCopy = null;

            if (child.getBackground() != null) {
                backgroundCopy = walkBackground(child.getBackground());
            }
            if (child.getScenario() != null) {
                scenarioCopy = walkScenario(child.getScenario());
            }
            if (child.getRule() != null) {
                ruleCopy = walkRule(child.getRule());
            }

            if (backgroundCopy != null || scenarioCopy != null || ruleCopy != null) {
                childrenCopy.add(new FeatureChild(ruleCopy,
                        backgroundCopy,
                        scenarioCopy));
            }
        }

        return childrenCopy;
    }

    protected Rule walkRule(Rule rule) {
       List<RuleChild> children = walkRuleChildren(rule.getChildren());

       this.handlers.handleRule(rule);

        boolean backgroundKept = children.stream().anyMatch(child -> child != null && child.getBackground() != null);
        List<RuleChild> scenariosKept = children.stream().filter(child -> child != null && child.getScenario() != null).collect(
                Collectors.toList());

        if (this.filters.acceptRule(rule) || backgroundKept) {
            return copyRule(rule, rule.getChildren());
        }
        if (!scenariosKept.isEmpty()) {
            return copyRule(rule, scenariosKept);
        }
        return null;
    }

    private Rule copyRule(Rule rule, List<RuleChild> children) {
        return new Rule(rule.getLocation(),
                copyTags(rule.getTags()),
                rule.getKeyword(),
                rule.getName(),
                rule.getDescription(),
                filterRuleChildren(rule.getChildren(), children),
                rule.getId());
    }

    private List<RuleChild> filterRuleChildren(
            List<RuleChild> children,
            List<RuleChild> childrenKept) {
    List<RuleChild> childrenCopy = new ArrayList<>();
    Set<String> scenariosKeptIds = childrenKept
            .stream().filter(child -> child.getScenario() != null)
            .map(child -> child.getScenario().getId())
            .collect(Collectors.toSet());

        for (RuleChild child : children) {
            if (child.getBackground() != null) {
                childrenCopy.add(new RuleChild(copyBackground(child.getBackground()), null));
            }
            if (child.getScenario() != null && scenariosKeptIds.contains(child.getScenario().getId())) {
                childrenCopy.add(new RuleChild(null, copyScenario(child.getScenario())));
            }
        }
        return childrenCopy;
    }

    private List<RuleChild> walkRuleChildren(List<RuleChild> children) {
       List<RuleChild> childrenCopy = new ArrayList<>();

        for (RuleChild child : children) {
            if (child.getBackground() != null) {
                childrenCopy.add(new RuleChild(walkBackground(child.getBackground()), null));
            }
            if (child.getScenario() != null) {
                childrenCopy.add(new RuleChild(null, walkScenario(child.getScenario())));
            }
        }
        return childrenCopy;
    }

    protected Background walkBackground(Background background) {
        List<Step> steps = walkAllSteps(background.getSteps());
        handlers.handleBackground(background);

        if (this.filters.acceptBackground(background) || steps.stream().anyMatch(Objects::nonNull)) {
            return copyBackground(background);
        }
        return null;
    }

    private Background copyBackground(Background background) {
        return new Background(background.getLocation(),
                background.getKeyword(),
                background.getName(),
                background.getDescription(),
                background.getSteps().stream().map(step -> copyStep(step)).collect(Collectors.toList()),
                background.getId());
    }

    protected Scenario walkScenario(Scenario scenario) {
        List<Step> steps = walkAllSteps(scenario.getSteps());
        handlers.handleScenario(scenario);

        if (this.filters.acceptScenario(scenario) || steps.stream().anyMatch(Objects::nonNull)) {
            return copyScenario(scenario);
        }
        return null;
    }

    private Scenario copyScenario(Scenario scenario) {
        return new Scenario(scenario.getLocation(),
                copyTags(scenario.getTags()),
                scenario.getKeyword(),
                scenario.getName(),
                scenario.getDescription(),
                scenario.getSteps().stream().map(this::copyStep).collect(Collectors.toList()),
                scenario.getExamples(),
                scenario.getId());
    }

    protected List<Step> walkAllSteps(List<Step> steps) {
        return steps.stream().map(step -> walkStep(step)).collect(Collectors.toList());
    }

    protected Step walkStep(Step step) {
        handlers.handleStep(step);
        if (!filters.acceptStep(step)) {
            return null;
        }
        return copyStep(step);
    }

    private Step copyStep(Step step) {
        return new Step(step.getLocation(), step.getKeyword(), step.getText(), step.getDocString(), step.getDataTable(), step.getId());
    }
}
