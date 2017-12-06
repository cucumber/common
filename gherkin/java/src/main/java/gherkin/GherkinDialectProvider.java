package gherkin;

import gherkin.ast.Location;
import gherkin.deps.com.google.gson.Gson;

import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

public class GherkinDialectProvider implements IGherkinDialectProvider {
    private static Map<String, Map<String, List<String>>> DIALECTS;
    private final String default_dialect_name;
    final int separation = 5;

    static {
        Gson gson = new Gson();
        try {
            Reader dialects = new InputStreamReader(GherkinDialectProvider.class.getResourceAsStream("/gherkin/gherkin-languages.json"), "UTF-8");
            DIALECTS = gson.fromJson(dialects, Map.class);
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
        Map<String, List<String>> map = DIALECTS.get(language);
        if (map == null) {
            throw new ParserException.NoSuchLanguageException(language, location);
        }

        return new GherkinDialect(language, map);
    }

    @Override
    public List<String> getLanguages() {
        List<String> languages = new ArrayList<String>(DIALECTS.keySet());
        sort(languages);

        int maxKeyLength = getMaxKeyLength();
        int maxNameLength = getMaxNameLength();

        List<String> languagesWithExplanation = new ArrayList<String>();
        for (String key : languages) {
            Map<String, List<String>> values = DIALECTS.get(key);

            String name = (String) (Object) values.get("name");
            String nativeName = (String) (Object) values.get("native");

            String languageWithExplanation = formatLanguage(key, maxKeyLength, name, maxNameLength, nativeName);
            languagesWithExplanation.add(languageWithExplanation);
        }

        return unmodifiableList(languagesWithExplanation);
    }

    int getMaxKeyLength() {
        int max = 0;
        List<String> languages = new ArrayList<String>(DIALECTS.keySet());

        for (String key : languages) {
            if (max < key.length()) {
                max = key.length();
            }
        }

        return max;
    }

    int getMaxNameLength() {
        int max = 0;
        List<String> languages = new ArrayList<String>(DIALECTS.keySet());

        for (String key : languages) {
            Map<String, List<String>> values = DIALECTS.get(key);
            String name = (String) (Object) values.get("name");

            if (max < name.length()) {
                max = name.length();
            }
        }

        return max;
    }

    private String formatLanguage(String key, int maxKeyLength, String name, int maxNameLength, String nativeName) {
        int keyNameSeparation = maxKeyLength + separation;
        String result = String.format("%1$-" + keyNameSeparation + "s", key);
        result += name;

        int nameNativeSeparation = keyNameSeparation + maxNameLength + separation;
        result = String.format("%1$-" + nameNativeSeparation + "s", result);
        result += nativeName;

        return result;
    }
}
