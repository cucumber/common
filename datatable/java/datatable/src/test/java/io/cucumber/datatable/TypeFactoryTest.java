package io.cucumber.datatable;


import io.cucumber.datatable.TypeFactory.JavaType;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class TypeFactoryTest {

    private static final Type LIST_OF_OBJECT = new TypeReference<List<Object>>() {
    }.getType();
    private static final Type LIST_OF_LIST_OF_OBJECT = new TypeReference<List<List<Object>>>() {
    }.getType();
    private static final Type LIST_OF_WILD_CARD_NUMBER = new TypeReference<List<? extends Number>>() {
    }.getType();
    private static final Type LIST_OF_NUMBER = new TypeReference<List<Number>>() {
    }.getType();
    private static final Type MAP_OF_OBJECT_OBJECT = new TypeReference<Map<Object, Object>>() {
    }.getType();

    private static final Type OPTIONAL_OBJECT = new TypeReference<Optional<Object>>() {
    }.getType();
    private static final Type UNKNOWN_TYPE = new Type() {

    };

    @Test
    void should_provide_canonical_representation_of_object() {
        JavaType javaType = TypeFactory.constructType(Object.class);
        assertThat(javaType.getTypeName(), is(Object.class.getTypeName()));
    }

    @Test
    void should_provide_canonical_representation_of_list() {
        JavaType javaType = TypeFactory.constructType(List.class);
        assertThat(javaType.getTypeName(), is(List.class.getTypeName()));
    }

    @Test
    void should_provide_canonical_representation_of_list_of_object() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_OBJECT);
        assertThat(javaType.getTypeName(), is(LIST_OF_OBJECT.getTypeName()));
    }

    @Test
    void should_provide_canonical_representation_of_list_wild_card_number() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_WILD_CARD_NUMBER);
        assertThat(javaType.getTypeName(), is(LIST_OF_WILD_CARD_NUMBER.getTypeName()));
    }

    @Test
    void should_provide_canonical_representation_of_map_object_object() {
        JavaType javaType = TypeFactory.constructType(MAP_OF_OBJECT_OBJECT);
        assertThat(javaType.getTypeName(), is(MAP_OF_OBJECT_OBJECT.getTypeName()));
    }

    @Test
    void object_should_equal_object() {
        JavaType javaType = TypeFactory.constructType(Object.class);
        JavaType other = TypeFactory.constructType(Object.class);
        assertThat(javaType, equalTo(other));
    }

    @Test
    void list_of_object_should_equal_a_list_of_objects() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_OBJECT);
        JavaType other = aListOf(Object.class);
        assertThat(javaType, equalTo(other));
    }

    @Test
    void raw_list_should_equal_a_list_of_objects() {
        JavaType javaType = TypeFactory.constructType(List.class);
        JavaType other = TypeFactory.constructType(LIST_OF_OBJECT);
        assertThat(javaType, equalTo(other));
    }

    @Test
    void list_of_list_of_object_should_equal_a_list_of_list_of_objects() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_LIST_OF_OBJECT);
        JavaType other = aListOf(aListOf(Object.class));
        assertThat(javaType, equalTo(other));
    }

    @Test
    void map_should_equal_map() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_LIST_OF_OBJECT);
        JavaType other = aListOf(aListOf(Object.class));
        assertThat(javaType, equalTo(other));
    }

    @Test
    void maps_are_maps_types() {
        JavaType javaType = TypeFactory.constructType(MAP_OF_OBJECT_OBJECT);
        assertThat(javaType.getClass(), equalTo(TypeFactory.MapType.class));
        assertThat(javaType.getOriginal(), is(MAP_OF_OBJECT_OBJECT));
    }

    @Test
    void lists_are_list_types() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_LIST_OF_OBJECT);
        assertThat(javaType.getClass(), equalTo(TypeFactory.ListType.class));
        assertThat(javaType.getOriginal(), is(LIST_OF_LIST_OF_OBJECT));

        TypeFactory.ListType listType = (TypeFactory.ListType) javaType;
        JavaType elementType = listType.getElementType();
        assertThat(elementType.getClass(), equalTo(TypeFactory.ListType.class));
        assertThat(elementType.getOriginal(), is(LIST_OF_OBJECT));
    }

    @Test
    void other_generic_types_are_other_type() {
        JavaType javaType = TypeFactory.constructType(OPTIONAL_OBJECT);
        assertThat(javaType.getClass(), equalTo(TypeFactory.OtherType.class));
        assertThat(javaType.getOriginal(), is(OPTIONAL_OBJECT));
    }

    @Test
    void unknown_types_are_other_type() {
        JavaType javaType = TypeFactory.constructType(UNKNOWN_TYPE);
        assertThat(javaType.getClass(), equalTo(TypeFactory.OtherType.class));
        assertThat(javaType.getOriginal(), is(UNKNOWN_TYPE));
    }

    @Test
    <T> void type_variables_are_not_allowed() {
        Type typeVariable = new TypeReference<List<List<T>>>() {
        }.getType();

        InvalidDataTableTypeException exception = assertThrows(
                InvalidDataTableTypeException.class,
                () -> TypeFactory.constructType(typeVariable)
        );

        assertThat(exception.getMessage(), is("" +
                "Can't create a data table type for type java.util.List<java.util.List<T>>. " +
                "Type contained a type variable T. Types must explicit."
        ));
    }

    @Test
    void wild_card_types_use_upper_bound_in_equality() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_WILD_CARD_NUMBER);
        JavaType other = TypeFactory.constructType(LIST_OF_NUMBER);
        assertThat(javaType, equalTo(other));
        TypeFactory.ListType listType = (TypeFactory.ListType) javaType;
        JavaType elementType = listType.getElementType();
        assertThat(elementType.getOriginal(), equalTo(Number.class));
    }

    @Test
    void upper_bound_of_wild_card_replaces_wild_card_type() {
        JavaType javaType = TypeFactory.constructType(LIST_OF_WILD_CARD_NUMBER);
        TypeFactory.ListType listType = (TypeFactory.ListType) javaType;
        JavaType elementType = listType.getElementType();
        assertThat(elementType.getOriginal(), equalTo(Number.class));
    }

}