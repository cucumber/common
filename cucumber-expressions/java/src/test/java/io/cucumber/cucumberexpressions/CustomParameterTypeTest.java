package io.cucumber.cucumberexpressions;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import static java.lang.Integer.parseInt;
import static java.util.Arrays.asList;
import static java.util.regex.Pattern.compile;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class CustomParameterTypeTest {
    private ParameterTypeRegistry parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);

    public static class Coordinate {
        private final int x;
        private final int y;
        private final int z;

        public Coordinate(int x, int y, int z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Coordinate that = (Coordinate) o;
            return x == that.x && y == that.y && z == that.z;
        }

        @Override
        public int hashCode() {
            int result = x;
            result = 31 * result + y;
            result = 31 * result + z;
            return result;
        }
    }


    @Before
    public void create_parameter() {
        /// [add-color-parameter-type]
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "color",                                  // name
                "red|blue|yellow",                        // regexp
                Color.class,                              // type
                new Transformer<Color>() {
                    @Override
                    public Color apply(String... args) {
                        return new Color(args[0]);
                    }
                },                                        // transform
                false,                                    // useForSnippets
                false                                     // preferForRegexpMatch
        ));
        /// [add-color-parameter-type]
    }

    @Test
    public void matches_CucumberExpression_parameters_with_custom_parameter_type() {
        Expression expression = new CucumberExpression("I have a {color} ball", parameterTypeRegistry);
        Object argumentValue = expression.match("I have a red ball").get(0).getValue();
        assertEquals(new Color("red"), argumentValue);
    }

    @Test
    public void matches_CucumberExpression_parameters_with_multiple_capture_groups() {
        parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "coordinate",
                "(\\d+),\\s*(\\d+),\\s*(\\d+)",
                Coordinate.class, new Transformer<Coordinate>() {
            @Override
            public Coordinate apply(String... args) {
                return new Coordinate(
                        parseInt(args[0]),
                        parseInt(args[1]),
                        parseInt(args[2]));
            }
        },
                false,
                false
        ));
        Expression expression = new CucumberExpression("A {int} thick line from {coordinate} to {coordinate}", parameterTypeRegistry);
        List<Argument<?>> arguments = expression.match("A 5 thick line from 10,20,30 to 40,50,60");
        Integer thick = (Integer) arguments.get(0).getValue();
        Coordinate from = (Coordinate) arguments.get(1).getValue();
        Coordinate to = (Coordinate) arguments.get(2).getValue();
        assertEquals(new Integer(5), thick);
        assertEquals(new Coordinate(10, 20, 30), from);
        assertEquals(new Coordinate(40, 50, 60), to);
    }

    @Test
    public void matches_CucumberExpression_parameters_with_custom_parameter_type_using_optional_group() {
        parameterTypeRegistry = new ParameterTypeRegistry(Locale.ENGLISH);
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "color",
                asList("red|blue|yellow", "(?:dark|light) (?:red|blue|yellow)"),
                Color.class,
                new Transformer<Color>() {
                    @Override
                    public Color apply(String... args) {
                        return new Color(args[0]);
                    }
                },
                false,
                false
        ));
        Expression expression = new CucumberExpression("I have a {color} ball", parameterTypeRegistry);
        Object argumentValue = expression.match("I have a dark red ball").get(0).getValue();
        assertEquals(new Color("dark red"), argumentValue);
    }

    @Test
    public void defers_transformation_until_queried_from_argument() {
        parameterTypeRegistry.defineParameterType(new ParameterType<CssColor>(
                "throwing",
                "bad",
                CssColor.class,
                new Transformer<CssColor>() {
                    @Override
                    public CssColor apply(String... args) {
                        throw new RuntimeException(String.format("Can't apply [%s]", args[0]));
                    }
                },
                false,
                false
        ));
        Expression expression = new CucumberExpression("I have a {throwing} parameter", parameterTypeRegistry);
        List<Argument<?>> arguments = expression.match("I have a bad parameter");
        try {
            arguments.get(0).getValue();
            fail("should have failed");
        } catch (RuntimeException expected) {
            assertEquals("ParameterType {throwing} failed to apply [bad] to " + CssColor.class, expected.getMessage());
        }
    }

    @Test
    public void conflicting_parameter_type_is_detected_for_type_name() {
        try {
            parameterTypeRegistry.defineParameterType(new ParameterType<>(
                    "color",
                    ".*",
                    CssColor.class,
                    new Transformer<CssColor>() {
                        @Override
                        public CssColor apply(String... args) {
                            return new CssColor(args[0]);
                        }
                    },
                    false,
                    false
            ));
            fail("should have failed");
        } catch (DuplicateTypeNameException expected) {
            assertEquals("There is already a parameter type with name color", expected.getMessage());
        }
    }

    @Test
    public void conflicting_parameter_type_is_not_detected_for_type() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "whatever",
                ".*",
                Color.class,
                new Transformer<Color>() {
                    @Override
                    public Color apply(String... args) {
                        return new Color(args[0]);
                    }
                },
                false,
                false
        ));
    }

    ///// Conflicting parameter types

    @Test
    public void conflicting_parameter_type_is_not_detected_for_regexp() {
        parameterTypeRegistry.defineParameterType(new ParameterType<>(
                "css-color",
                "red|blue|yellow",
                CssColor.class,
                new Transformer<CssColor>() {
                    @Override
                    public CssColor apply(String... args) {
                        return new CssColor(args[0]);
                    }
                },
                false,
                false
        ));

        assertEquals(new CssColor("blue"), new CucumberExpression("I have a {css-color} ball", parameterTypeRegistry).match("I have a blue ball").get(0).getValue());
        assertEquals(new Color("blue"), new CucumberExpression("I have a {color} ball", parameterTypeRegistry).match("I have a blue ball").get(0).getValue());
    }

    @Test
    public void matches_RegularExpression_arguments_with_custom_parameter_type() {
        Expression expression = new RegularExpression(compile("I have a (red|blue|yellow) ball"), parameterTypeRegistry);
        Object argumentValue = expression.match("I have a red ball").get(0).getValue();
        assertEquals(new Color("red"), argumentValue);
    }

    ///// RegularExpression

    public static class Color {
        public final String name;

        public Color(String name) {
            this.name = name;
        }

        @Override
        public int hashCode() {
            return name.hashCode();
        }

        @Override
        public boolean equals(Object obj) {
            return obj instanceof Color && ((Color) obj).name.equals(name);
        }
    }

    public static class CssColor {
        public final String name;

        /// [color-constructor]
        public CssColor(String name) {
            this.name = name;
        }
        /// [color-constructor]

        @Override
        public int hashCode() {
            return name.hashCode();
        }

        @Override
        public boolean equals(Object obj) {
            return obj instanceof CssColor && ((CssColor) obj).name.equals(name);
        }
    }
}
