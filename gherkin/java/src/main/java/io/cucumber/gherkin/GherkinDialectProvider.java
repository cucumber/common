package io.cucumber.gherkin;

import com.eclipsesource.json.Json;
import com.eclipsesource.json.JsonObject;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

public class GherkinDialectProvider implements IGherkinDialectProvider {
    private static JsonObject DIALECTS;
    private final String defaultDialectName;

    public static final String JSON_PATH = "/io/cucumber/gherkin/gherkin-languages.json";

    static {
        try (Reader reader = new InputStreamReader(GherkinDialectProvider.class.getResourceAsStream(JSON_PATH), UTF_8)) {
            DIALECTS = Json.parse(reader).asObject();
        } catch (IOException e) {
            throw new GherkinException("Unable to parse " + JSON_PATH, e);
        }
    }

    public GherkinDialectProvider(String defaultDialectName) {
        this.defaultDialectName = defaultDialectName;
    }

    public GherkinDialectProvider() {
        this("en");
    }

    public GherkinDialect getDefaultDialect() {
        return getDialect(defaultDialectName, null);
    }

    @Override
    public GherkinDialect getDialect(String language, Location location) {
        JsonObject languageMap = DIALECTS.get(language).asObject();
        if (languageMap == null) {
            throw new ParserException.NoSuchLanguageException(language, location);
        }

        return new GherkinDialect(language, languageMap);
    }

    @Override
    public List<String> getLanguages() {
        List<String> languages = DIALECTS.names();
        sort(languages);
        return unmodifiableList(languages);
    }
}
