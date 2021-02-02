package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.params.converter.ArgumentConversionException;
import org.junit.jupiter.params.converter.ArgumentConverter;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.Map;

import static io.cucumber.cucumberexpressions.Expectation.fromMap;
import static java.nio.file.Files.newInputStream;

class FileToExpectationConverter implements ArgumentConverter {
    Yaml yaml = new Yaml();

    @Override
    public Object convert(Object source, ParameterContext context) throws ArgumentConversionException {
        try {
            Path path = (Path) source;
            InputStream inputStream = newInputStream(path);
            Map<?, ?> map = yaml.loadAs(inputStream, Map.class);
            return fromMap(map);
        } catch (IOException e) {
            throw new ArgumentConversionException("Could not load " + source, e);
        }
    }

}
