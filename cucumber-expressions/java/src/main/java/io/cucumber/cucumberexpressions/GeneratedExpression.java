package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GeneratedExpression {
    private final String expressionTemplate;
    private final List<ParameterType<?>> parameterTypes;

    public GeneratedExpression(String expressionTemplate, List<ParameterType<?>> parameterTypes) {
        this.expressionTemplate = expressionTemplate;
        this.parameterTypes = parameterTypes;
    }

    public String getSource() {
        List<String> parameterTypeNames = new ArrayList<>();
        for (ParameterType<?> parameterType : parameterTypes) {
            String name = parameterType.getName();
            parameterTypeNames.add(name);
        }
        return String.format(expressionTemplate, parameterTypeNames.toArray());
    }

    /**
     * @deprecated use {@link #getParameterNames(LetterCase, ProgrammingLanguage)}
     */
    @Deprecated
    public List<String> getParameterNames() {
        return getParameterNames(LetterCase.LOWER_CAMEL_CASE, ProgrammingLanguage.JAVA);
    }

    public List<String> getParameterNames(LetterCase letterCase, ProgrammingLanguage programmingLanguage) {
        HashMap<String, Integer> usageByTypeName = new HashMap<>();
        List<String> list = new ArrayList<>();
        for (ParameterType<?> parameterType : parameterTypes) {
            String parameterName = getParameterName(parameterType.getName(), usageByTypeName, letterCase, programmingLanguage);
            list.add(parameterName);
        }
        return list;
    }

    public List<ParameterType<?>> getParameterTypes() {
        return parameterTypes;
    }

    private String getParameterName(String typeName, Map<String, Integer> usageByTypeName, LetterCase letterCase, ProgrammingLanguage programmingLanguage) {
        String name = letterCase.convert(typeName);

        Integer count = usageByTypeName.get(name);
        count = count != null ? count + 1 : 1;
        usageByTypeName.put(name, count);

        return count == 1 && !programmingLanguage.isKeyword(name) ? name : name + count;
    }
}
