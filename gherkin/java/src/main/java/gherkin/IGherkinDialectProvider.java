package gherkin;

import gherkin.ast.Location;

public interface IGherkinDialectProvider {
    GherkinDialect getDefaultDialect();

    GherkinDialect getDialect(String language, Location location);
}
