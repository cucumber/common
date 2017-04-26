package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.SortedSet;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class AmbiguousParameterTypeException extends CucumberExpressionException {
    private final Pattern regexp;
    private final String parameterTypeRegexp;
    private final SortedSet<ParameterType<?>> parameterTypes;
    private final List<GeneratedExpression> generatedExpressions;

    public AmbiguousParameterTypeException(String parameterTypeRegexp, Pattern regexp, SortedSet<ParameterType<?>> parameterTypes, List<GeneratedExpression> generatedExpressions) {
        super(String.format("Your Regular Expression /%s/\n" +
                        "matches multiple parameter types with regexp /%s/:\n" +
                        "   %s\n" +
                        "\n" +
                        "I couldn't decide which one to use. You have two options:\n" +
                        "\n" +
                        "1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:\n" +
                        "   %s\n" +
                        "\n" +
                        "2) Make one of the parameter types preferential and continue to use a Regular Expression.\n" +
                        "\n",
                regexp.pattern(),
                parameterTypeRegexp,
                parameterTypeNames(parameterTypes),
                expressions(generatedExpressions)
        ));
        this.regexp = regexp;
        this.parameterTypeRegexp = parameterTypeRegexp;
        this.parameterTypes = parameterTypes;
        this.generatedExpressions = generatedExpressions;
    }

    private static String parameterTypeNames(SortedSet<ParameterType<?>> parameterTypes) {
        return parameterTypes.stream().map(p -> "{" + p.getName() + "}").collect(Collectors.joining("\n   "));
    }

    private static String expressions(List<GeneratedExpression> generatedExpressions) {
        return generatedExpressions.stream().map(GeneratedExpression::getSource).collect(Collectors.joining("\n   "));
    }

    public Pattern getRegexp() {
        return regexp;
    }

    public String getParameterTypeRegexp() {
        return parameterTypeRegexp;
    }

    public SortedSet<ParameterType<?>> getParameterTypes() {
        return parameterTypes;
    }

    public List<GeneratedExpression> getGeneratedExpressions() {
        return generatedExpressions;
    }
}
