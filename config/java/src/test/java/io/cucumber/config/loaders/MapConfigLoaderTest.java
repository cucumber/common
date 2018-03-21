package io.cucumber.config.loaders;

import io.cucumber.config.Config;
import io.cucumber.config.PropertyList;
import org.junit.Test;

import java.io.StringReader;

import static org.junit.Assert.assertEquals;

public class MapConfigLoaderTest {
    @Test
    public void removes_underscores_from_keys() {
        Config config = new Config();
        ConfigLoader configLoader = new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  f_or_mat_: progress\n"), "test.yml");
        configLoader.load(config);

        assertEquals("progress", config.get("testing.format").asString());
    }

    @Test
    public void merges() {
        Config config = new Config();
        new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  one: un\n"), "one.yml").load(config);

        new YamlConfigLoader(new StringReader("" +
                "testing:\n" +
                "  two: deux\n"), "two.yml").load(config);

        String yaml = "" +
                "testing:\n" +
                "  # one.yml\n" +
                "  one: un\n" +
                "  # two.yml\n" +
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
                "    token:\n" +
                "  xlist:\n" +
                "    - one\n" +
                "    - two\n" +
                "    - three\n";

        Config config = new Config();
        config.set("cucumberpro.xlist", new PropertyList());
        ConfigLoader configLoader = new YamlConfigLoader(new StringReader(yaml), null);
        configLoader.load(config);

        assertEquals(yaml, config.toYaml("cucumberpro"));
    }
}
