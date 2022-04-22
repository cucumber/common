package io.cucumber.gherkin;

import io.cucumber.messages.types.StepKeywordType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Collections.unmodifiableList;

public final class GherkinDialect {
    private final String language;
    private final String name;
    private final String nativeName;
    private final List<String> featureKeywords;
    private final List<String> ruleKeywords;
    private final List<String> scenarioKeywords;
    private final List<String> scenarioOutlineKeywords;
    private final List<String> backgroundKeywords;
    private final List<String> examplesKeywords;
    private final List<String> givenKeywords;
    private final List<String> whenKeywords;
    private final List<String> thenKeywords;
    private final List<String> andKeywords;
    private final List<String> butKeywords;
    private final List<String> stepKeywords;
    private final Map<String, StepKeywordType> stepKeywordsTypes;

    GherkinDialect(String language, String name, String nativeName, List<String> featureKeywords, List<String> ruleKeywords, List<String> scenarioKeywords, List<String> scenarioOutlineKeywords, List<String> backgroundKeywords, List<String> examplesKeywords, List<String> givenKeywords, List<String> whenKeywords, List<String> thenKeywords, List<String> andKeywords, List<String> butKeywords) {
        this.language = language;
        this.name = name;
        this.nativeName = nativeName;
        this.featureKeywords = featureKeywords;
        this.ruleKeywords = ruleKeywords;
        this.scenarioKeywords = scenarioKeywords;
        this.scenarioOutlineKeywords = scenarioOutlineKeywords;
        this.backgroundKeywords = backgroundKeywords;
        this.examplesKeywords = examplesKeywords;
        this.givenKeywords = givenKeywords;
        this.whenKeywords = whenKeywords;
        this.thenKeywords = thenKeywords;
        this.andKeywords = andKeywords;
        this.butKeywords = butKeywords;

        List<String> stepKeywords = new ArrayList<>();
        stepKeywords.addAll(givenKeywords);
        stepKeywords.addAll(whenKeywords);
        stepKeywords.addAll(thenKeywords);
        stepKeywords.addAll(andKeywords);
        stepKeywords.addAll(butKeywords);
        this.stepKeywords = unmodifiableList(stepKeywords);

        Map<String, StepKeywordType> stepKeywordsTypes = new HashMap<>();
        addStepKeywordsTypes(stepKeywordsTypes, getGivenKeywords(), StepKeywordType.CONTEXT);
        addStepKeywordsTypes(stepKeywordsTypes, getWhenKeywords(), StepKeywordType.ACTION);
        addStepKeywordsTypes(stepKeywordsTypes, getThenKeywords(), StepKeywordType.OUTCOME);

        List<String> conjunctionKeywords = new ArrayList<>();
        conjunctionKeywords.addAll(getAndKeywords());
        conjunctionKeywords.addAll(getButKeywords());
        addStepKeywordsTypes(stepKeywordsTypes, conjunctionKeywords, StepKeywordType.CONJUNCTION);
        this.stepKeywordsTypes = stepKeywordsTypes;
    }

    private static void addStepKeywordsTypes(Map<String, StepKeywordType> h, List<String> keywords, StepKeywordType type) {
        for (String keyword : keywords) {
            if (h.containsKey(keyword)) {
                // If the keyword was already added, it has multiple mappings
                // since the mapping isn't 1-to-1, the type of the keyword
                // can't be known; instead of an exact type, return 'UNKNOWN'
                h.put(keyword, StepKeywordType.UNKNOWN);
            }
            else {
                h.put(keyword, type);
            }
        }
    }

    public List<String> getFeatureKeywords() {
        return featureKeywords;
    }

    public String getName() {
        return name;
    }

    public String getNativeName() {
        return nativeName;
    }

    public List<String> getRuleKeywords() {
        return ruleKeywords;
    }

    public List<String> getScenarioKeywords() {
        return scenarioKeywords;
    }

    public List<String> getScenarioOutlineKeywords() {
        return scenarioOutlineKeywords;
    }

    public List<String> getStepKeywords() {
        return stepKeywords;
    }

    public Map<String, StepKeywordType> getStepKeywordsTypes() {
        return stepKeywordsTypes;
    }

    public List<String> getBackgroundKeywords() {
        return backgroundKeywords;
    }

    public List<String> getExamplesKeywords() {
        return examplesKeywords;
    }

    public List<String> getGivenKeywords() {
        return givenKeywords;
    }

    public List<String> getWhenKeywords() {
        return whenKeywords;
    }

    public List<String> getThenKeywords() {
        return thenKeywords;
    }

    public List<String> getAndKeywords() {
        return andKeywords;
    }

    public List<String> getButKeywords() {
        return butKeywords;
    }

    public String getLanguage() {
        return language;
    }
}
