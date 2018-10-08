package io.cucumber.cucumberexpressions;

import com.fasterxml.jackson.databind.type.TypeFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Collection;

import static java.util.Arrays.asList;
import static java.util.Locale.ENGLISH;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

@RunWith(Parameterized.class)
public class ParameterByTypeTransformerTest {

    private final ParameterByTypeTransformer defaultTransformer;

    @Parameterized.Parameters
    public static Collection<ParameterByTypeTransformer> objectMapperImplementations() {
        return asList(
                new BuiltInParameterTransformer(ENGLISH),
                new TestJacksonDefaultTransformer()
        );
    }

    public ParameterByTypeTransformerTest(ParameterByTypeTransformer defaultTransformer) {
        this.defaultTransformer = defaultTransformer;
    }

    @Test
    public void should_convert_null_to_null() throws Throwable {
        assertNull(defaultTransformer.transform(null, Object.class));
    }

    @Test
    public void should_convert_to_string() throws Throwable {
        assertEquals("Barbara Liskov",
                defaultTransformer.transform("Barbara Liskov", String.class));
    }


    @Test
    public void should_convert_to_object() throws Throwable {
        assertEquals("Barbara Liskov",
                defaultTransformer.transform("Barbara Liskov", Object.class));
    }

    @Test
    public void should_convert_to_big_integer() throws Throwable {
        assertEquals(new BigInteger("10000008"),
                defaultTransformer.transform("10000008", BigInteger.class));
    }


    @Test
    public void should_convert_to_big_decimal() throws Throwable {
        assertEquals(new BigDecimal("1.0000008"),
                defaultTransformer.transform("1.0000008", BigDecimal.class));
    }

    @Test
    public void should_convert_to_byte() throws Throwable {
        assertEquals(Byte.decode("42"), defaultTransformer.transform("42", Byte.class));
        assertEquals(Byte.decode("42"), defaultTransformer.transform("42", byte.class));
    }

    @Test
    public void should_convert_to_short() throws Throwable {
        assertEquals(Short.decode("42"), defaultTransformer.transform("42", Short.class));
        assertEquals(Short.decode("42"), defaultTransformer.transform("42", short.class));
    }

    @Test
    public void should_convert_to_integer() throws Throwable {
        assertEquals(Integer.decode("42"), defaultTransformer.transform("42", Integer.class));
        assertEquals(Integer.decode("42"), defaultTransformer.transform("42", int.class));
    }

    @Test
    public void should_convert_to_long() throws Throwable {
        assertEquals(Long.decode("42"), defaultTransformer.transform("42", Long.class));
        assertEquals(Long.decode("42"), defaultTransformer.transform("42", long.class));
    }

    @Test
    public void should_convert_to_float() throws Throwable {
        assertEquals(4.2f, defaultTransformer.transform("4.2", Float.class));
        assertEquals(4.2f, defaultTransformer.transform("4.2", float.class));
    }


    @Test
    public void should_convert_to_double() throws Throwable {
        assertEquals(4.2, defaultTransformer.transform("4.2", Double.class));
        assertEquals(4.2, defaultTransformer.transform("4.2", double.class));
    }

    @Test
    public void should_convert_to_enum() throws Throwable {
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