package io.cucumber.gherkin;

import com.eclipsesource.json.Json;
import com.eclipsesource.json.JsonObject;
import com.eclipsesource.json.JsonValue;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

public final class GherkinDialectProvider {
    private static final JsonObject DIALECTS;
    private final String defaultDialectName;

    public static final String JSON_PATH = "/io/cucumber/gherkin/gherkin-languages.json";

    static {
        try (Reader reader = new InputStreamReader(GherkinDialectProvider.class.getResourceAsStream(JSON_PATH),
                UTF_8)) {
            DIALECTS = Json.parse(reader).asObject();
        } catch (IOException e) {
            throw new GherkinException("Unable to parse " + JSON_PATH, e);
        }
    }

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

        JsonValue languageObject = DIALECTS.get(language);
        if (languageObject == null) {
            throw new ParserException.NoSuchLanguageException(language, location);
        }

        return new GherkinDialect(language, languageObject.asObject());
    }

    public List<String> getLanguages() {
        List<String> languages = new ArrayList<>(DIALECTS.names());
        sort(languages);
        return unmodifiableList(languages);
    }

}
