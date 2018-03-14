package io.cucumber.config.loaders;

import static java.util.Arrays.asList;

public class OptparseConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new OptparseConfigLoader("cucumber.", asList("--help"));
    }
}
