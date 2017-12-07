package gherkin;

import gherkin.ast.Location;

import java.util.List;

public interface IGherkinDialectProvider {
    GherkinDialect getDefaultDialect();

    GherkinDialect getDialect(String language, Location location);

    List<GherkinDialect> getDialects();

    /**
     * Use List<GherkinDialect> getDialects() to get all dialects. Extract the language from each dialect.
     */
    @Deprecated
    List<String> getLanguages();
}
