package io.cucumber.gherkin;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import com.eclipsesource.json.JsonValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class MarkdownGherkinDialect implements GherkinDialect {

    public MarkdownGherkinDialect() {
    }

    public List<String> getFeatureKeywords() {
        return singletonList("# ");
    }

    private static List<String> toStringList(JsonArray array) {
        List<String> result = new ArrayList<>();
        for (JsonValue jsonValue : array) {
            result.add(jsonValue.asString());
        }
        return result;
    }

    public String getName() {
        return "Markdown";
    }

    public String getNativeName() {
        return "Markdown";
    }

    public String getCommentPrefix() {
        return "<!--";
    }

    public String getTitleKeywordSeparator() {
        return "";
    }

    public List<String> getRuleKeywords() {
        return singletonList("## ");
    }

    public List<String> getScenarioKeywords() {
        return asList("## ", "### ");
    }

    public List<String> getScenarioOutlineKeywords() {
        return asList("## ", "### ");
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
        return singletonList("## Background: ");
    }

    public List<String> getExamplesKeywords() {
        return asList("### ", "#### ");
    }

    public List<String> getGivenKeywords() {
        return singletonList("* ");
    }

    public List<String> getWhenKeywords() {
        return singletonList("* ");
    }

    public List<String> getThenKeywords() {
        return singletonList("* ");
    }

    public List<String> getAndKeywords() {
        return singletonList("* ");
    }

    public List<String> getButKeywords() {
        return singletonList("* ");
    }

    public String getLanguage() {
        return "md";
    }
}

