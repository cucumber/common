package gherkin;

import gherkin.ast.Location;
import gherkin.deps.com.google.gson.Gson;
import gherkin.deps.com.google.gson.reflect.TypeToken;

import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

public class GherkinDialectProvider implements IGherkinDialectProvider {
    private static Map<String, Map<String, Object>> DIALECTS;
    private final String default_dialect_name;

    static {
        Gson gson = new Gson();
        try {
            Reader dialects = new InputStreamReader(GherkinDialectProvider.class.getResourceAsStream("/gherkin/gherkin-languages.json"), "UTF-8");
            Type type = new TypeToken<Map<String, Map<String, Object>>>() {}.getType();
            DIALECTS = gson.fromJson(dialects, type);
        } catch (UnsupportedEncodingException e) {
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
        Map<String, Object> dialect = DIALECTS.get(language);
        if (dialect == null) {
            throw new ParserException.NoSuchLanguageException(language, location);
        }

        return new GherkinDialect(language, dialect);
    }

    @Override
    public List<GherkinDialect> getDialects() {
        List<String> languages = new ArrayList<>(DIALECTS.keySet());
        sort(languages);

        List<GherkinDialect> dialects = new LinkedList<>();

        for (String language : languages) {
            GherkinDialect dialect = getDialect(language, null);
            dialects.add(dialect);
        }

        return dialects;
    }

    @Override
    public List<String> getLanguages() {
        List<String> languages = new ArrayList<>(DIALECTS.keySet());
        sort(languages);
        return unmodifiableList(languages);
    }
}
