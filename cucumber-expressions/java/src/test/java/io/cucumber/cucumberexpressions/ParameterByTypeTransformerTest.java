package io.cucumber.cucumberexpressions;

import com.fasterxml.jackson.databind.type.TypeFactory;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.stream.Stream;

import static java.util.Locale.ENGLISH;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class ParameterByTypeTransformerTest {

    static Stream<ParameterByTypeTransformer> objectMapperImplementations() {
        return Stream.of(
                new BuiltInParameterTransformer(ENGLISH),
                new TestJacksonDefaultTransformer()
        );
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_null_to_null(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertNull(defaultTransformer.transform(null, Object.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_string(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals("Barbara Liskov",
                defaultTransformer.transform("Barbara Liskov", String.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_object(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals("Barbara Liskov",
                defaultTransformer.transform("Barbara Liskov", Object.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_big_integer(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(new BigInteger("10000008"),
                defaultTransformer.transform("10000008", BigInteger.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_big_decimal(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(new BigDecimal("1.0000008"),
                defaultTransformer.transform("1.0000008", BigDecimal.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_byte(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(Byte.decode("42"), defaultTransformer.transform("42", Byte.class));
        assertEquals(Byte.decode("42"), defaultTransformer.transform("42", byte.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_short(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(Short.decode("42"), defaultTransformer.transform("42", Short.class));
        assertEquals(Short.decode("42"), defaultTransformer.transform("42", short.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_integer(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(Integer.decode("42"), defaultTransformer.transform("42", Integer.class));
        assertEquals(Integer.decode("42"), defaultTransformer.transform("42", int.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_long(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(Long.decode("42"), defaultTransformer.transform("42", Long.class));
        assertEquals(Long.decode("42"), defaultTransformer.transform("42", long.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_float(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(4.2f, defaultTransformer.transform("4.2", Float.class));
        assertEquals(4.2f, defaultTransformer.transform("4.2", float.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_double(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(4.2, defaultTransformer.transform("4.2", Double.class));
        assertEquals(4.2, defaultTransformer.transform("4.2", double.class));
    }

    @ParameterizedTest
    @MethodSource("objectMapperImplementations")
    public void should_convert_to_enum(final ParameterByTypeTransformer defaultTransformer) throws Throwable {
        assertEquals(TestEnum.TEST, defaultTransformer.transform("TEST", TestEnum.class));
    }

    private static class TestJacksonDefaultTransformer implements ParameterByTypeTransformer {
        com.fasterxml.jackson.databind.ObjectMapper delegate =
                new com.fasterxml.jackson.databind.ObjectMapper();

        @Override
        public Object transform(String fromValue, Type toValueType) {
            TypeFactory typeFactory = delegate.getTypeFactory();
            return delegate.convertValue(fromValue, typeFactory.constructType(toValueType));
        }

    }

    private enum TestEnum {
        TEST
    }

}
