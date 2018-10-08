package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;

//This class can be replaced with a lambda once we use java 8
final class ObjectMapperTransformer implements Transformer<Object> {

    private final ParameterByTypeTransformer transformer;
    private final Type toValueType;

    ObjectMapperTransformer(ParameterByTypeTransformer defaultTransformer, Type toValueType) {
        this.transformer = defaultTransformer;
        this.toValueType = toValueType;
    }

    @Override
    public Object transform(String arg) throws Throwable {
        return transformer.transform(arg, toValueType);
    }
}
