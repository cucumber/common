package io.cucumber.datatable;


import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.lang.reflect.WildcardType;
import java.util.List;
import java.util.Map;
import java.util.Objects;

final class TypeFactory {

    private TypeFactory() {

    }

    static JavaType aListOf(Type type) {
        return new ListType(null, List.class, constructType(type));
    }

    static JavaType constructType(Type type) {
        try {
            return constructTypeInner(type);
        } catch (Exception e) {
            throw new InvalidDataTableTypeException(type, e);
        }
    }

    private static JavaType constructTypeInner(Type type) {
        if (type instanceof JavaType) {
            return (JavaType) type;
        }

        if (List.class.equals(type)) {
            return new ListType(type, List.class, constructType(Object.class));
        }

        if (Map.class.equals(type)) {
            return new MapType(type, Map.class, constructType(Object.class), constructType(Object.class));
        }

        if (type instanceof Class) {
            return new OtherType(type);
        }

        if (type instanceof TypeVariable) {
            throw new IllegalArgumentException("Type contained a type variable " + type + ". Types must explicit.");
        }

        if (type instanceof WildcardType) {
            return constructWildCardType((WildcardType) type);
        }

        if (type instanceof ParameterizedType) {
            return constructParameterizedType((ParameterizedType) type);
        }

        return new OtherType(type);
    }

    private static JavaType constructWildCardType(WildcardType type) {
        // For our simplified type system we can safely replace upper bounds
        // When registering a transformer to type ? extends SomeType the
        // transformer is guaranteed to produce an object that is an instance of
        // SomeType.
        // When transforming a data table to ? extends SomeType a transformer
        // that produces SomeType is sufficient.
        // This will result in ambiguity between a transformers for SomeType
        // and transformers for ? extends SomeType but that seems reasonable and
        // might be resolved by using a more specific producer.
        Type[] upperBounds = type.getUpperBounds();
        if (upperBounds.length > 0) {
            // Not possible in Java. Scala?
            if (upperBounds.length > 1) {
                throw new IllegalArgumentException("Type contained more then upper lower bound " + type + ". Types may only have a single upper bound.");
            }
            return constructType(upperBounds[0]);
        }

        // We'll treat lower bounds as is.
        return new OtherType(type);
    }

    private static JavaType constructParameterizedType(ParameterizedType type) {
        // Must always be a class here
        Class<?> rawType = (Class<?>) type.getRawType();

        if (List.class.equals(rawType)) {
            JavaType[] deconstructedTypeArguments = constructTypeArguments(type);
            return new ListType(type, List.class, deconstructedTypeArguments[0]);
        }

        if (Map.class.equals(rawType)) {
            JavaType[] deconstructedTypeArguments = constructTypeArguments(type);
            return new MapType(type, Map.class, deconstructedTypeArguments[0], deconstructedTypeArguments[1]);
        }

        return new OtherType(type);
    }

    private static JavaType[] constructTypeArguments(ParameterizedType type) {
        Type[] actualTypeArguments = type.getActualTypeArguments();
        JavaType[] deconstructedTypeArguments = new JavaType[actualTypeArguments.length];
        for (int i = 0; i < actualTypeArguments.length; i++) {
            deconstructedTypeArguments[i] = constructTypeInner(actualTypeArguments[i]);
        }
        return deconstructedTypeArguments;
    }

    static String typeName(Type type) {
        return type.getTypeName();
    }

    interface JavaType extends Type {

        Type getOriginal();
    }

    static final class OtherType implements JavaType {

        private final Type original;

        OtherType(Type original) {
            this.original = original;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            OtherType otherType = (OtherType) o;
            return original.equals(otherType.original);
        }

        @Override
        public int hashCode() {
            return Objects.hash(original);
        }

        @Override
        public String getTypeName() {
            return original.getTypeName();
        }

        public Type getOriginal() {
            return original;
        }
    }

    static final class ListType implements JavaType {

        private final Type original;
        private final Class<?> rawClass;
        private final JavaType elementType;

        ListType(Type original, Class<?> rawClass, JavaType elementType) {
            this.original = original;
            this.rawClass = rawClass;
            this.elementType = elementType;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ListType listType = (ListType) o;
            return rawClass.equals(listType.rawClass) &&
                    elementType.equals(listType.elementType);
        }

        @Override
        public int hashCode() {
            return Objects.hash(rawClass, elementType);
        }

        @Override
        public String getTypeName() {
            if (original != null) {
                return original.getTypeName();
            }

            // E.g. constructed lists
            return rawClass.getTypeName() + "<" + elementType.getTypeName() + ">";
        }

        JavaType getElementType() {
            return elementType;
        }

        @Override
        public Type getOriginal() {
            return original;
        }
    }

    static final class MapType implements JavaType {

        private final Type original;
        private final Class<?> rawClass;
        private final JavaType keyType;
        private final JavaType valueType;

        MapType(Type original, Class<?> rawClass, JavaType keyType, JavaType valueType) {
            this.original = original;
            this.rawClass = rawClass;
            this.keyType = keyType;
            this.valueType = valueType;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            MapType mapType = (MapType) o;
            return rawClass.equals(mapType.rawClass) &&
                    keyType.equals(mapType.keyType) &&
                    valueType.equals(mapType.valueType);
        }

        @Override
        public int hashCode() {
            return Objects.hash(rawClass, keyType, valueType);
        }

        @Override
        public String getTypeName() {
            return original.getTypeName();
        }

        JavaType getKeyType() {
            return keyType;
        }

        JavaType getValueType() {
            return valueType;
        }

        @Override
        public Type getOriginal() {
            return original;
        }
    }
}
