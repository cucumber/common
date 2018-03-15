package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import org.junit.Test;

import java.io.StringReader;

import static org.junit.Assert.assertEquals;

public class YamlConfigLoaderTest extends ConfigLoaderContract {
    @Override
    protected ConfigLoader makeConfigLoader() {
        return new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  somebool: true\n" +
                "  meaning: 42\n" +
                "  list:\n" +
                "  - one\n" +
                "  - two\n"
        ));
    }

    @Test
    public void removes_underscores_from_keys() {
        Config config = new Config();
        ConfigLoader configLoader = new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  f_or_mat_: progress\n"));
        configLoader.load(config);

        assertEquals("progress", config.getIn("testing.format").asString());
    }

    @Test
    public void merges() {
        Config config = new Config();
        new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  one: un\n")).load(config);

        new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  two: deux\n")).load(config);

        String yaml = "" +
                "testing:\n" +
                "  one: un\n" +
                "  two: deux\n";
        assertEquals(yaml, config.toYaml("testing"));
    }

    @Test
    public void roundtrips() {
        String yaml = "" +
                "cucumberpro:\n" +
                "  cucumberprofile: cucumber-jvm-unspecified-profile\n" +
                "  envmask: SECRET|KEY|TOKEN|PASSWORD\n" +
                "  logging: debug\n" +
                "  url: https://app.cucumber.pro/\n" +
                "  connection:\n" +
                "    ignoreerror: true\n" +
                "    timeout: 5000\n" +
                "  git:\n" +
                "    hostkey:\n" +
                "    hostname: git.cucumber.pro\n" +
                "    publish: false\n" +
                "    sshport: 22\n" +
                "    source:\n" +
                "      fetch: true\n" +
                "      remote: origin\n" +
                "  project:\n" +
                "    name:\n" +
                "  results:\n" +
                "    publish:\n" +
                "    token:\n";

        Config config = new Config();
        ConfigLoader configLoader = new YamlConfigLoader(new StringReader(yaml));
        configLoader.load(config);

        assertEquals(yaml, config.toYaml("cucumberpro"));
    }
}
