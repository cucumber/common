package io.cucumber.cucumberexpressions;

public enum LetterCase {
    LOWER_CAMEL_CASE {
        @Override
        public String convert(String s) {
            String camel = CAMEL_CASE.convert(s);
            return Character.toLowerCase(camel.charAt(0)) + camel.substring(1);
        }
    },

    CAMEL_CASE {
        @Override
        public String convert(String s) {
            StringBuilder sb = new StringBuilder();
            for (String part : s.split("[_-]")) {
                sb.append(Character.toUpperCase(part.charAt(0)));
                if (part.length() > 1) {
                    sb.append(part.substring(1).toLowerCase());
                }
            }
            return sb.toString();
        }
    };

    public abstract String convert(String s);
}
