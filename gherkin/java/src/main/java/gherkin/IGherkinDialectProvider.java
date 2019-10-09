package gherkin;

import java.util.List;

public interface IGherkinDialectProvider {
    GherkinDialect getDefaultDialect();

    GherkinDialect getDialect(String language, Location location);

    List<String> getLanguages();
}
