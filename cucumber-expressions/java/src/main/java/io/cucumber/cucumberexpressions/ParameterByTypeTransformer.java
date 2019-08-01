package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.lang.reflect.Type;

/**
 * The {@link ParameterTypeRegistry} uses the default transformer
 * to execute all transforms for build in parameter types and all
 * anonymous types.
 */
@API(status = API.Status.STABLE)
public interface ParameterByTypeTransformer {

    Object transform(String fromValue, Type toValueType) throws Throwable;
}
