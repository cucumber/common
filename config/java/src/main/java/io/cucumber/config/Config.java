package io.cucumber.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class Config {
    private final String basename;
    private final String[] keys;
    private final Annotation annotation;
    private final String surplusKey;
    private final String[] args;

    public Config(String basename, String[] keys, Annotation annotation, String surplusKey, String[] args) {
        this.basename = basename;
        this.keys = keys;
        this.annotation = annotation;
        this.surplusKey = surplusKey;
        this.args = args;
    }

    public <T> T configure(T t) throws FileNotFoundException, UnsupportedEncodingException {
        List<MapBuilder> mapBuilders = new ArrayList<>();
        File yamlFile = new File(basename + ".yaml");
        mapBuilders.add(new YamlBuilder(keys, new InputStreamReader(new FileInputStream(yamlFile), "UTF-8")));

        File jsonFile = new File(basename + ".json");
        mapBuilders.add(new JsonBuilder(keys, new InputStreamReader(new FileInputStream(jsonFile), "UTF-8")));

        mapBuilders.add(new AnnotationBuilder(annotation));
        mapBuilders.add(new OptparseBuilder(surplusKey, asList(args)));

        FieldSetter fieldSetter = new FieldSetter(t);
        for (MapBuilder mapBuilder : mapBuilders) {
            fieldSetter.setFields(mapBuilder.buildMap());
        }
        return t;
    }
}
