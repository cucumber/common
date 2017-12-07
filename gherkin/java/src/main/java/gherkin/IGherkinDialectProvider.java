package gherkin;

import gherkin.ast.Location;

import java.util.List;

public interface IGherkinDialectProvider {
    GherkinDialect getDefaultDialect();

    GherkinDialect getDialect(String language, Location location);

    List<GherkinDialect> getDialects();

    List<String> getLanguages();
}
