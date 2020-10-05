package io.cucumber.gherkin;

import java.util.List;

public interface GherkinDialect {
    String getCommentPrefix();

    List<String> getScenarioKeywords();

    String getName();

    String getNativeName();

    String getLanguage();

    List<String> getFeatureKeywords();

    List<String> getRuleKeywords();

    List<String> getBackgroundKeywords();

    List<String> getScenarioOutlineKeywords();

    List<String> getExamplesKeywords();

    String getTitleKeywordSeparator();

    List<String> getStepKeywords();

    List<String> getGivenKeywords();

    List<String> getWhenKeywords();

    List<String> getThenKeywords();

    List<String> getAndKeywords();

    List<String> getButKeywords();
}
