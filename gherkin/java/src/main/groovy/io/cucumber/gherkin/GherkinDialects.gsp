package io.cucumber.gherkin;

import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.asList;
import static java.util.Collections.unmodifiableList;

final class GherkinDialects {
    static final Map<String, GherkinDialect> DIALECTS = new HashMap<>();

    static {
<% dialects.eachWithIndex {name, dialect, index -> %>
        DIALECTS.put("<%= name %>", new GherkinDialect(
                "<%= name %>",
                "<%= dialect.name %>",
                "<%= dialect.native %>",
                unmodifiableList(asList(<%= arrToString(dialect.feature) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.rule) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.scenario) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.scenarioOutline) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.background) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.examples) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.given) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.when) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.then) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.and) %>)),
                unmodifiableList(asList(<%= arrToString(dialect.but) %>))
        ));
<% } %>
    }
}
