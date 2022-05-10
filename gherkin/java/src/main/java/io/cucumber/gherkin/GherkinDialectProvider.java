package io.cucumber.gherkin;

import java.util.Optional;
import java.util.Set;

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
        return getDialect(defaultDialectName).orElseThrow(() -> new ParserException.NoSuchLanguageException(defaultDialectName, null));
    }

    public Optional<GherkinDialect> getDialect(String language) {
        requireNonNull(language);
        return Optional.ofNullable(GherkinDialects.DIALECTS.get(language));
    }

    public Set<String> getLanguages() {
        return GherkinDialects.DIALECTS.keySet();
    }
}
