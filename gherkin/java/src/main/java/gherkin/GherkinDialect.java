package gherkin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class GherkinDialect {
    private final Map<String, Object> dialect;
    private String language;

    public GherkinDialect(String language, Map<String, Object> dialect) {
        this.language = language;
        this.dialect = dialect;
    }

    @SuppressWarnings("unchecked")
    public List<String> getFeatureKeywords() {
        return (List<String>) dialect.get("feature");
    }

    @SuppressWarnings("unchecked")
    public List<String> getScenarioKeywords() {
        return (List<String>) dialect.get("scenario");
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

    @SuppressWarnings("unchecked")
    public List<String> getBackgroundKeywords() {
        return (List<String>) dialect.get("background");
    }

    @SuppressWarnings("unchecked")
    public List<String> getScenarioOutlineKeywords() {
        return (List<String>) dialect.get("scenarioOutline");
    }

    @SuppressWarnings("unchecked")
    public List<String> getExamplesKeywords() {
        return (List<String>) dialect.get("examples");
    }

    @SuppressWarnings("unchecked")
    public List<String> getGivenKeywords() {
        return (List<String>) dialect.get("given");
    }

    @SuppressWarnings("unchecked")
    public List<String> getWhenKeywords() {
        return (List<String>) dialect.get("when");
    }

    @SuppressWarnings("unchecked")
    public List<String> getThenKeywords() {
        return (List<String>) dialect.get("then");
    }

    @SuppressWarnings("unchecked")
    public List<String> getAndKeywords() {
        return (List<String>) dialect.get("and");
    }

    @SuppressWarnings("unchecked")
    public List<String> getButKeywords() {
        return (List<String>) dialect.get("but");
    }

    public String getLanguage() {
        return language;
    }

    public String getName() {
        return (String) dialect.get("name");
    }

    public String getNativeName() {
        return (String) dialect.get("native");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GherkinDialect that = (GherkinDialect) o;
        return Objects.equals(dialect, that.dialect) &&
                Objects.equals(language, that.language);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dialect, language);
    }
}
