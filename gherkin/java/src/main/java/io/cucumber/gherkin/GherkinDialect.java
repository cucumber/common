package io.cucumber.gherkin;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import com.eclipsesource.json.JsonValue;

import java.util.ArrayList;
import java.util.List;

public class GherkinDialect {
    private final JsonObject keywords;
    private String language;

    public GherkinDialect(String language, JsonObject keywords) {
        this.language = language;
        this.keywords = keywords;
    }

    public List<String> getFeatureKeywords() {
        return toStringList(this.keywords.get("feature").asArray());
    }

    private static List<String> toStringList(JsonArray array) {
        List<String> result = new ArrayList<>();
        for (JsonValue jsonValue : array) {
            result.add(jsonValue.asString());
        }
        return result;
    }

    public String getName() {
        return keywords.getString("name", null);
    }

    public List<String> getRuleKeywords() {
        return toStringList(keywords.get("rule").asArray());
    }

    public List<String> getScenarioKeywords() {
        return toStringList(keywords.get("scenario").asArray());
    }

    public List<String> getScenarioOutlineKeywords() {
        return toStringList(keywords.get("scenarioOutline").asArray());
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
        return toStringList(keywords.get("background").asArray());
    }

    public List<String> getExamplesKeywords() {
        return toStringList(keywords.get("examples").asArray());
    }

    public List<String> getGivenKeywords() {
        return toStringList(keywords.get("given").asArray());
    }

    public List<String> getWhenKeywords() {
        return toStringList(keywords.get("when").asArray());
    }

    public List<String> getThenKeywords() {
        return toStringList(keywords.get("then").asArray());
    }

    public List<String> getAndKeywords() {
        return toStringList(keywords.get("and").asArray());
    }

    public List<String> getButKeywords() {
        return toStringList(keywords.get("but").asArray());
    }

    public String getLanguage() {
        return language;
    }
}

