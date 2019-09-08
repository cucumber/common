package gherkin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@SuppressWarnings("unchecked")
public class GherkinDialect {
    private final Map<String, Object> keywords;
    private String language;

    public GherkinDialect(String language, Map<String, Object> keywords) {
        this.language = language;
        this.keywords = keywords;
    }

    public List<String> getFeatureKeywords() {
        return (List<String>) keywords.get("feature");
    }

    public String getName() {
        return (String) keywords.get("name");
    }
    public String getNativeName() {
        return (String) keywords.get("native");
    }

    public List<String> getScenarioKeywords() {
        return (List<String>) keywords.get("scenario");
    }

    public List<String> getStepKeywords() {
        List<String> result = new ArrayList<>();
        result.addAll(getGivenKeywords());
        result.addAll(getWhenKeywords());
        result.addAll(getThenKeywords());
        result.addAll(getAndKeywords());
        result.addAll(getButKeywords());
        return result;
    }

    public List<String> getBackgroundKeywords() {
        return (List<String>) keywords.get("background");
    }

    public List<String> getScenarioOutlineKeywords() {
        return (List<String>) keywords.get("scenarioOutline");
    }

    public List<String> getExamplesKeywords() {
        return (List<String>) keywords.get("examples");
    }

    public List<String> getGivenKeywords() {
        return (List<String>) keywords.get("given");
    }

    public List<String> getWhenKeywords() {
        return (List<String>) keywords.get("when");
    }

    public List<String> getThenKeywords() {
        return (List<String>) keywords.get("then");
    }

    public List<String> getAndKeywords() {
        return (List<String>) keywords.get("and");
    }

    public List<String> getButKeywords() {
        return (List<String>) keywords.get("but");
    }

    public String getLanguage() {
        return language;
    }
}
