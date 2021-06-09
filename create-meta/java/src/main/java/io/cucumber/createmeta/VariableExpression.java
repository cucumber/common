package io.cucumber.createmeta;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class VariableExpression {
    private static final Pattern variablePattern = Pattern.compile("\\$\\{(.*?)(?:(?<!\\\\)/(.*)/(.*))?}");

    public static String evaluate(String expression, Map<String, String> env) {
        if(expression == null) return null;
        Matcher variableMatcher = variablePattern.matcher(expression);
        StringBuffer sb = new StringBuffer();
        while (variableMatcher.find()) {
            String variable = variableMatcher.group(1);
            String value = getValue(env, variable);
            if(value == null) {
                return null;
            }
            String pattern = variableMatcher.group(2);
            if (pattern == null) {
                variableMatcher.appendReplacement(sb, value);
            } else {
                Matcher matcher = Pattern.compile(pattern.replace("\\/", "/")).matcher(value);
                if (!matcher.matches()) {
                    return null;
                }
                String replacement = variableMatcher.group(3);
                for (int i = 0; i < matcher.groupCount(); i++) {
                    String group = matcher.group(i + 1);
                    replacement = replacement.replace("\\" + (i + 1), group);
                }
                variableMatcher.appendReplacement(sb, replacement);
            }
        }
        variableMatcher.appendTail(sb);
        return sb.toString();
    }

    private static String getValue(Map<String, String> env, String variable) {
        if (variable.contains("*")) {
            Pattern pattern = Pattern.compile(variable.replace("*", ".*"));
            // GoCD env var with dynamic "material" name
            // https://github.com/ashwanthkumar/gocd-build-github-pull-requests#github
            for (Map.Entry<String, String> nameAndValue : env.entrySet()) {
                if (pattern.matcher(nameAndValue.getKey()).matches()) {
                    return nameAndValue.getValue();
                }
            }
        }
        return env.get(variable);
    }
}
