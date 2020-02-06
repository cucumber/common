package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * Creates a {@link CucumberExpression} or {@link RegularExpression} from a {@link String}
 * using heuristics. This is particularly useful for languages that don't have a
 * literal syntax for regular expressions. In Java, a regular expression has to be represented as a String.
 */
@API(status = API.Status.STABLE)
public final class ExpressionFactory {

    private static final Pattern BEGIN_ANCHOR = Pattern.compile("^\\^.*");
    private static final Pattern END_ANCHOR = Pattern.compile(".*\\$$");
    private static final Pattern SCRIPT_STYLE_REGEXP = Pattern.compile("^/(.*)/$");
    private final ParameterTypeRegistry parameterTypeRegistry;

    public ExpressionFactory(ParameterTypeRegistry parameterTypeRegistry) {
        this.parameterTypeRegistry = parameterTypeRegistry;
    }

    public Expression createExpression(String expressionString) {
        if (BEGIN_ANCHOR.matcher(expressionString).find() || END_ANCHOR.matcher(expressionString).find()) {
            return createRegularExpressionWithAnchors(expressionString);
        }
        Matcher m = SCRIPT_STYLE_REGEXP.matcher(expressionString);
        if (m.find()) {
            return new RegularExpression(Pattern.compile(m.group(1)), parameterTypeRegistry);
        }
        return createCucumberExpression(expressionString);
    }

    private Expression createCucumberExpression(String expressionString) {
        try {
            return new CucumberExpression(expressionString, parameterTypeRegistry);
        } catch (UndefinedParameterTypeException e) {
            return new UndefinedParameterTypeExpression(expressionString, Collections.singleton(e.getUndefinedParameterTypeName()));
        }
    }

    private RegularExpression createRegularExpressionWithAnchors(String expressionString) {
        try {
            return new RegularExpression(Pattern.compile(expressionString), parameterTypeRegistry);
        } catch (PatternSyntaxException e) {
            if (CucumberExpression.PARAMETER_PATTERN.matcher(expressionString).find()) {
                throw new CucumberExpressionException("You cannot use anchors (^ or $) in Cucumber Expressions. Please remove them from " + expressionString, e);
            }
            throw e;
        }
    }
}
