package io.cucumber.datatable;

import java.util.regex.Pattern;

class CamelCaseStringConverter {

    private static final String WHITESPACE = " ";
    private static final Pattern WHITESPACE_PATTERN = Pattern.compile("\\s+");

    public String map(String string) {
        String[] splitted = normalizeSpace(string).split(WHITESPACE);
        splitted[0] = uncapitalize(splitted[0]);
        for (int i = 1; i < splitted.length; i++) {
            splitted[i] = capitalize(splitted[i]);
        }
        return join(splitted);
    }

    private String join(String[] splitted) {
        StringBuilder sb = new StringBuilder();
        for (String s : splitted) {
            sb.append(s);
        }
        return sb.toString();
    }

    private String normalizeSpace(String originalHeaderName) {
        return WHITESPACE_PATTERN.matcher(originalHeaderName.trim()).replaceAll(WHITESPACE);
    }

    private String capitalize(String string) {
        return String.valueOf(Character.toTitleCase(string.charAt(0))) + string.substring(1);
    }

    private String uncapitalize(String string) {
        if (string.isEmpty()) {
            throw new CucumberDataTableException("Field name cannot be empty. Please check the table header.");
        }
        return String.valueOf(Character.toLowerCase(string.charAt(0))) + string.substring(1);
    }

}
