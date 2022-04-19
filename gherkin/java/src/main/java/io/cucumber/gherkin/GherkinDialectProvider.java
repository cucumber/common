package io.cucumber.gherkin;

import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

public final class GherkinDialectProvider {

    private final String defaultDialectName;

    public GherkinDialectProvider(String defaultDialectName) {
        this.defaultDialectName = requireNonNull(defaultDialectName);
    }

    public GherkinDialectProvider() {
        this("en");
    }

    public GherkinDialect getDefaultDialect() {
        return getDialect(defaultDialectName, null);
    }

    public GherkinDialect getDialect(String language, Location location) {
        requireNonNull(language);
        GherkinDialect dialect = GherkinDialects.DIALECTS.get(language);

        if (dialect == null) {
            throw new ParserException.NoSuchLanguageException(language, location);
        }

        return dialect;
    }

    public List<String> getLanguages() {
        return unmodifiableList(asList("en", "no"));
    }
}
