package io.cucumber.cucumberexpressions;

import java.lang.reflect.Type;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Creates a {@link CucumberExpression} or {@link RegularExpression} from a {@link String}
 * using heuristics. This is particularly useful for languages that don't have a
 * literal syntax for regular expressions such as Ruby or JavaScript - with Java
 * a regular expression has to be represented as a String.
 */
public class ExpressionFactory {

    private static final Pattern BEGIN_ANCHOR = Pattern.compile("^\\^.*");
    private static final Pattern END_ANCHOR = Pattern.compile(".*\\$$");
    private static final Pattern SCRIPT_STYLE_REGEXP = Pattern.compile("^/(.*)/$");
    private static final Pattern PARENS = Pattern.compile("\\(([^\\)]+)\\)");
    private static final Pattern ALPHA = Pattern.compile("[a-zA-Z]+");
    private final ParameterRegistry parameterRegistry;

    public ExpressionFactory(ParameterRegistry parameterRegistry) {
        this.parameterRegistry = parameterRegistry;
    }

    public Expression createExpression(String expressionString, List<Type> types) {
        Matcher m = BEGIN_ANCHOR.matcher(expressionString);
        if (m.find()) {
            return new RegularExpression(Pattern.compile(expressionString), types, parameterRegistry);
        }
        m = END_ANCHOR.matcher(expressionString);
        if (m.find()) {
            return new RegularExpression(Pattern.compile(expressionString), types, parameterRegistry);
        }
        m = SCRIPT_STYLE_REGEXP.matcher(expressionString);
        if (m.find()) {
            return new RegularExpression(Pattern.compile(m.group(1)), types, parameterRegistry);
        }
        m = PARENS.matcher(expressionString);
        if (m.find()) {
            String insideParens = m.group(1);
            if (ALPHA.matcher(insideParens).lookingAt()) {
                return new CucumberExpression(expressionString, types, parameterRegistry);
            }
            return new RegularExpression(Pattern.compile(expressionString), types, parameterRegistry);
        }
        return new CucumberExpression(expressionString, types, parameterRegistry);
    }
}
