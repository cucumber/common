package io.cucumber.datatable;

import com.fasterxml.jackson.databind.JavaType;

import java.lang.reflect.Type;
import java.util.List;

final class TypeFactory {
    private static final com.fasterxml.jackson.databind.type.TypeFactory typeFactory = com.fasterxml.jackson.databind.type.TypeFactory.defaultInstance();

    private TypeFactory(){

    }

    static JavaType aListOf(Type type) {
        return typeFactory.constructCollectionType(List.class, typeFactory.constructType(type));
    }

    static JavaType constructType(Type type) {
        return typeFactory.constructType(type);
    }
}
