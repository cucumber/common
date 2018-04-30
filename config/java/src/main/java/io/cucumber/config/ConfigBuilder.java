package io.cucumber.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;

public class ConfigBuilder {
    private final String basename;
    private final String[] fileConfigKeys;
    private final Annotation annotation;
    private final Map<?, ?> systemProperties;
    private final Map<?, ?> environmentVariables;
    private final String environmentVariablePrefix;
    private final String[] commandLineArgs;
    private final Map<String, String> optparseAliases;
    private final String optparseSurplusKey;

    /**
     * Creates a new builder, ready to build a configuration object from different sources.
     *
     * @param basename                  the base name of the YAML and JSON file, without the file extension.
     * @param fileConfigKeys            array of keys to reach inside the YAML or JSON file to get the map that will populate the config.
     * @param annotation                Java annotation for populating the config. May be null.
     * @param systemProperties          Typically {@link System#getProperties()}.
     * @param environmentVariables      Typically {@link System#getenv()}.
     * @param environmentVariablePrefix A prefix for identifying environment variables and system properties. The prefix is stripped.
     * @param commandLineArgs           Command line arguments, typically {@link String[]} args from the main method.
     * @param optparseAliases           Shortopt aliases for option parsing.
     * @param optparseSurplusKey        Name of the field where surplus from option parsing is assigned.
     */
    public ConfigBuilder(String basename, String[] fileConfigKeys, Annotation annotation, Map<?, ?> systemProperties, Map<?, ?> environmentVariables, String environmentVariablePrefix, String[] commandLineArgs, Map<String, String> optparseAliases, String optparseSurplusKey) {
        this.basename = basename;
        this.fileConfigKeys = fileConfigKeys;
        this.annotation = annotation;
        this.optparseAliases = optparseAliases;
        this.optparseSurplusKey = optparseSurplusKey;
        this.commandLineArgs = commandLineArgs;
        this.environmentVariablePrefix = environmentVariablePrefix;
        this.systemProperties = systemProperties;
        this.environmentVariables = environmentVariables;
    }

    public <T> T build(T t) throws FileNotFoundException, UnsupportedEncodingException {
        List<MapBuilder> mapBuilders = new ArrayList<>();
        File yamlFile = new File(basename + ".yaml");
        if (yamlFile.isFile()) {
            mapBuilders.add(new YamlBuilder(fileConfigKeys, new InputStreamReader(new FileInputStream(yamlFile), "UTF-8")));
        }

        File jsonFile = new File(basename + ".json");
        if (jsonFile.isFile()) {
            mapBuilders.add(new JsonBuilder(fileConfigKeys, new InputStreamReader(new FileInputStream(jsonFile), "UTF-8")));
        }

        mapBuilders.add(new AnnotationBuilder(annotation));
        mapBuilders.add(new StringMapBuilder(environmentVariablePrefix, systemProperties));
        mapBuilders.add(new StringMapBuilder(environmentVariablePrefix, environmentVariables));
        mapBuilders.add(new OptparseBuilder(t, optparseSurplusKey, asList(commandLineArgs), optparseAliases));

        FieldSetter fieldSetter = new FieldSetter(t);
        for (MapBuilder mapBuilder : mapBuilders) {
            fieldSetter.setFields(mapBuilder.buildMap());
        }
        return t;
    }
}
