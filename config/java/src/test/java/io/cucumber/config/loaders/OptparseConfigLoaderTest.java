package io.cucumber.config.loaders;

import org.junit.Test;

import static java.util.Arrays.asList;

public class OptparseConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new OptparseConfigLoader("testing.", asList("--somebool"));
    }
}
