package io.cucumber.cucumberexpressions;

import java.text.Collator;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

public class GeneratedExpression {
    private static final Collator ENGLISH_COLLATOR = Collator.getInstance(Locale.ENGLISH);
    private static final String JAVA_KEYWORDS[] = {
            "abstract", "assert", "boolean", "break", "byte", "case",
            "catch", "char", "class", "const", "continue",
            "default", "do", "double", "else", "extends",
            "false", "final", "finally", "float", "for",
            "goto", "if", "implements", "import", "instanceof",
            "int", "interface", "long", "native", "new",
            "null", "package", "private", "protected", "public",
            "return", "short", "static", "strictfp", "super",
            "switch", "synchronized", "this", "throw", "throws",
            "transient", "true", "try", "void", "volatile",
            "while"
    };
    private final String expressionTemplate;
    private final List<ParameterType<?>> parameterTypes;
    public GeneratedExpression(String expressionTemplate, List<ParameterType<?>> parameterTypes) {
        this.expressionTemplate = expressionTemplate;
        this.parameterTypes = parameterTypes;
    }

    private static boolean isJavaKeyword(String keyword) {
        return (Arrays.binarySearch(JAVA_KEYWORDS, keyword, ENGLISH_COLLATOR) >= 0);
    }

    public String getSource() {
        List<String> parameterTypeNames = parameterTypes.stream().map(parameterType -> parameterType.getName()).collect(Collectors.toList());
        return String.format(expressionTemplate, parameterTypeNames.toArray());
    }

    private String getParameterName(String typeName, Map<String, Integer> usageByTypeName) {
        Integer count = usageByTypeName.get(typeName);
        count = count != null ? count + 1 : 1;
        usageByTypeName.put(typeName, count);

        return count == 1 && !isJavaKeyword(typeName) ? typeName : typeName + count;
    }

    public List<String> getParameterNames() {
        HashMap<String, Integer> usageByTypeName = new HashMap<>();
        return parameterTypes.stream().map(parameterType -> getParameterName(parameterType.getName(), usageByTypeName)).collect(Collectors.toList());
    }

    public List<ParameterType<?>> getParameterTypes() {
        return parameterTypes;
    }
}
