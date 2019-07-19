package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.NumberFormat;
import java.util.Locale;

import static java.util.Objects.requireNonNull;

final class BuiltInParameterTransformer implements ParameterByTypeTransformer {

    private final NumberParser numberParser;

    BuiltInParameterTransformer(Locale locale) {
        this.numberParser = new NumberParser(locale);
    }

    @Override
    public Object transform(String fromValue, Type toValueType) {
        if (!(toValueType instanceof Class)) {
            throw createIllegalArgumentException(fromValue, toValueType);
        }

        Class<?> toValueClass = (Class<?>) requireNonNull(toValueType);
        if (fromValue == null) {
            return null;
        }

        if (String.class.equals(toValueClass) || Object.class.equals(toValueClass)) {
            return fromValue;
        }

        if (BigInteger.class.equals(toValueClass)) {
            return new BigInteger(fromValue);
        }

        if (BigDecimal.class.equals(toValueClass)) {
            return numberParser.parseBigDecimal(fromValue);
        }

        if (Byte.class.equals(toValueClass) || byte.class.equals(toValueClass)) {
            return Byte.decode(fromValue);
        }

        if (Short.class.equals(toValueClass) || short.class.equals(toValueClass)) {
            return Short.decode(fromValue);
        }

        if (Integer.class.equals(toValueClass) || int.class.equals(toValueClass)) {
            return Integer.decode(fromValue);
        }

        if (Long.class.equals(toValueClass) || long.class.equals(toValueClass)) {
            return Long.decode(fromValue);
        }

        if (Float.class.equals(toValueClass) || float.class.equals(toValueClass)) {
            return numberParser.parseFloat(fromValue);
        }

        if (Double.class.equals(toValueClass) || double.class.equals(toValueClass)) {
            return numberParser.parseDouble(fromValue);
        }

        if (Boolean.class.equals(toValueClass) || boolean.class.equals(toValueClass)) {
            return Boolean.parseBoolean(fromValue);
        }

        if (toValueClass.isEnum()) {
            @SuppressWarnings("unchecked")
            Class<? extends Enum<?>> enumClass = (Class<? extends Enum<?>>) toValueClass;
            for (Enum<?> enumConstant : enumClass.getEnumConstants()) {
                if (enumConstant.name().equals(fromValue)) {
                    return enumConstant;
                }
            }
            throw new CucumberExpressionException("Can't transform '" + fromValue + "' to " + toValueType +". " +
                    "Not an enum constant");
        }

        throw createIllegalArgumentException(fromValue, toValueType);
    }


    private IllegalArgumentException createIllegalArgumentException(String fromValue, Type toValueType) {
        return new IllegalArgumentException(
                "Can't transform '" + fromValue + "' to " + toValueType + "\n" +
                        "BuiltInParameterTransformer only supports a limited number of class types\n" +
                        "Consider using a different object mapper or register a parameter type for " + toValueType
        );
    }

}
