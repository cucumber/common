package gherkin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GherkinDialect {
    private final Map<String, List<String>> keywords;
    private String language;

    public GherkinDialect(String language, Map<String, List<String>> keywords) {
        this.language = language;
        this.keywords = keywords;
    }

    public List<String> getFeatureKeywords() {
        return keywords.get("feature");
    }

    public List<String> getScenarioKeywords() {
        return keywords.get("scenario");
    }

    public List<String> getStepKeywords() {
        List<String> result = new ArrayList<>();
        result.addAll(keywords.get("given"));
        result.addAll(keywords.get("when"));
        result.addAll(keywords.get("then"));
        result.addAll(keywords.get("and"));
        result.addAll(keywords.get("but"));
        return result;
    }

    public List<String> getBackgroundKeywords() {
        return keywords.get("background");
    }

    public List<String> getScenarioOutlineKeywords() {
        return keywords.get("scenarioOutline");
    }

    public List<String> getExamplesKeywords() {
        return keywords.get("examples");
    }

    public String getLanguage() {
        return language;
    }
}
