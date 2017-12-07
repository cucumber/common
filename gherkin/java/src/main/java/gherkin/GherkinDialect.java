package gherkin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
        result.addAll(getGivenKeywords());
        result.addAll(getWhenKeywords());
        result.addAll(getThenKeywords());
        result.addAll(getAndKeywords());
        result.addAll(getButKeywords());
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

    public List<String> getGivenKeywords() {
        return keywords.get("given");
    }

    public List<String> getWhenKeywords() {
        return keywords.get("when");
    }

    public List<String> getThenKeywords() {
        return keywords.get("then");
    }

    public List<String> getAndKeywords() {
        return keywords.get("and");
    }

    public List<String> getButKeywords() {
        return keywords.get("but");
    }

    public String getLanguage() {
        return language;
    }

    public String getName() {
        return (String) (Object) keywords.get("name");
    }

    public String getNativeName() {
        return (String) (Object) keywords.get("native");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GherkinDialect that = (GherkinDialect) o;
        return Objects.equals(keywords, that.keywords) &&
                Objects.equals(language, that.language);
    }

    @Override
    public int hashCode() {
        return Objects.hash(keywords, language);
    }
}
