package io.cucumber.gherkin;

class StringUtils {

    static String ltrim(String s) {
        // https://stackoverflow.com/questions/1060570/why-is-non-breaking-space-not-a-whitespace-character-in-java
        return s.replaceAll("^[ \\t\\n\\x0B\\f\\r\\x85\\xA0]+", "");
    }

    static String rtrim(String s) {
        return s.replaceAll("[ \\t\\n\\x0B\\f\\r\\x85\\xA0]+$", "");
    }

    static String trim(String s) {
        return ltrim(rtrim(s));
    }

    static int symbolCount(String string) {
        // http://rosettacode.org/wiki/String_length#Java
        return string.codePointCount(0, string.length());
    }
}
