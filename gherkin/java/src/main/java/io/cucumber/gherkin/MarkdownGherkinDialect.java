package io.cucumber.gherkin;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonValue;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

public class MarkdownGherkinDialect implements GherkinDialect {

    private final GherkinDialect dialect;

    public MarkdownGherkinDialect(GherkinDialect dialect) {
        this.dialect = dialect;
    }

    public List<String> getFeatureKeywords() {
        return dialect.getFeatureKeywords()
                .stream()
                .map(keyword -> "# " + keyword)
                .collect(Collectors.toList());
    }

    private static List<String> toStringList(JsonArray array) {
        List<String> result = new ArrayList<>();
        for (JsonValue jsonValue : array) {
            result.add(jsonValue.asString());
        }
        return result;
    }

    public String getName() {
        return String.format("Markdown (%s)", dialect.getName());
    }

    public String getNativeName() {
        return String.format("Markdown (%s)", dialect.getName());
    }

    public String getCommentPrefix() {
        return "<!--";
    }

    public String getTitleKeywordSeparator() {
        return ":";
    }

    public List<String> getRuleKeywords() {
        return dialect.getRuleKeywords()
                .stream()
                .map(keyword -> "# " + keyword)
                .collect(Collectors.toList());
    }

    public List<String> getScenarioKeywords() {
        return dialect.getScenarioKeywords()
                .stream()
                .flatMap(keyword -> Stream.of("## ", "### ").map(prefix -> prefix + keyword))
                .collect(Collectors.toList());
    }

    public List<String> getScenarioOutlineKeywords() {
        return dialect.getScenarioOutlineKeywords()
                .stream()
                .flatMap(keyword -> Stream.of("## ", "### ").map(prefix -> prefix + keyword))
                .collect(Collectors.toList());
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
        return dialect.getGivenKeywords()
                .stream()
                .filter(keyword -> !"* ".equals(keyword))
                .map(keyword -> "* " + keyword)
                .collect(Collectors.toList());
    }

    public List<String> getWhenKeywords() {
        return dialect.getWhenKeywords()
                .stream()
                .filter(keyword -> !"* ".equals(keyword))
                .map(keyword -> "* " + keyword)
                .collect(Collectors.toList());
    }

    public List<String> getThenKeywords() {
        return dialect.getThenKeywords()
                .stream()
                .filter(keyword -> !"* ".equals(keyword))
                .map(keyword -> "* " + keyword)
                .collect(Collectors.toList());

    }

    public List<String> getAndKeywords() {
        return dialect.getAndKeywords()
                .stream()
                .filter(keyword -> !"* ".equals(keyword))
                .map(keyword -> "* " + keyword)
                .collect(Collectors.toList());
    }

    public List<String> getButKeywords() {
        return dialect.getButKeywords()
                .stream()
                .filter(keyword -> !"* ".equals(keyword))
                .map(keyword -> "* " + keyword)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isEmpty(Token token) {
        return !token.line.startsWith("#") &&
                !token.line.startsWith("*") &&
                !token.line.startsWith("|") &&
                !token.line.startsWith("```");
    }

    public String getLanguage() {
        return "md-" + dialect.getLanguage();
    }
}

