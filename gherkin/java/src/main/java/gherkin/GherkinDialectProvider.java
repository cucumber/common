package gherkin;

import gherkin.ast.Location;
import gherkin.deps.com.google.gson.Gson;
import gherkin.deps.com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

public class GherkinDialectProvider implements IGherkinDialectProvider {
    private static Map<String, Map<String, Object>> DIALECTS;
    private final String default_dialect_name;

    static {
        Gson gson = new Gson();
        try(Reader reader = new InputStreamReader(GherkinDialectProvider.class.getResourceAsStream("/gherkin/gherkin-languages.json"), UTF_8)) {
            DIALECTS = gson.fromJson(reader, new TypeToken<Map<String, Map<String, Object>>>(){}.getType());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public GherkinDialectProvider(String default_dialect_name) {
        this.default_dialect_name = default_dialect_name;
    }

    public GherkinDialectProvider() {
        this("en");
    }

    public GherkinDialect getDefaultDialect() {
        return getDialect(default_dialect_name, null);
    }

    @Override
    public GherkinDialect getDialect(String language, Location location) {
        Map<String, Object> map = DIALECTS.get(language);
        if (map == null) {
            throw new ParserException.NoSuchLanguageException(language, location);
        }

        return new GherkinDialect(language, map);
    }

    @Override
    public List<String> getLanguages() {
        List<String> languages = new ArrayList<String>(DIALECTS.keySet());
        sort(languages);
        return unmodifiableList(languages);
    }
}
