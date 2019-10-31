package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ArgumentTest {
    @Test
    public void exposes_parameter_type() {
        TreeRegexp treeRegexp = new TreeRegexp("three (.*) mice");
        ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
        List<Argument<?>> arguments = Argument.build(treeRegexp, "three blind mice", Collections.singletonList(parameterTypeRegistry.lookupByTypeName("string")));
        Argument<?> argument = arguments.get(0);
        assertEquals("string", argument.getParameterType().getName());
    }
}
