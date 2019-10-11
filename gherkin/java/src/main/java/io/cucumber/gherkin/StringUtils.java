package io.cucumber.gherkin;

import java.util.Iterator;
import java.util.List;

public class StringUtils {
    public static String join(String separator, List<String> items) {
        return join(ToString.DEFAULT, separator, items);
    }

    public static <T> String join(ToString<T> toString, String separator, Iterable<T> items) {
        StringBuilder sb = new StringBuilder();
        boolean useSeparator = false;
        for (T item : items) {
            if (useSeparator) sb.append(separator);
            useSeparator = true;
            sb.append(toString.toString(item));
        }
        return sb.toString();
    }

    public static String ltrim(String s) {
        // https://stackoverflow.com/questions/1060570/why-is-non-breaking-space-not-a-whitespace-character-in-java
        return s.replaceAll("^[ \\t\\n\\x0B\\f\\r\\x85\\xA0]+", "");
    }

    public static String rtrim(String s) {
        return s.replaceAll("[ \\t\\n\\x0B\\f\\r\\x85\\xA0]+$", "");
    }

    public static String trim(String s) {
        return ltrim(rtrim(s));
    }

    static String symbolAt(String s, int index) {
        // https://lemire.me/blog/2018/06/15/emojis-java-and-strings/
        int codePoint = s.codePointAt(index);
        return new StringBuilder().appendCodePoint(codePoint).toString();
    }

    public static int symbolCount(String string) {
        // http://rosettacode.org/wiki/String_length#Java
        return string.codePointCount(0, string.length());
    }

    public static Iterable<String> codePoints(final String string) {
        return () -> new Iterator<String>() {
            int nextIndex = 0;

            public boolean hasNext() {
                return nextIndex < string.length();
            }

            public String next() {
                int codePoint = string.codePointAt(nextIndex);
                nextIndex += Character.charCount(codePoint);
                return codePointToString(codePoint);
            }

            public void remove() {
                throw new UnsupportedOperationException();
            }
        };
    }

    private static String codePointToString(int cp) {
        StringBuilder sb = new StringBuilder();
        if (Character.isBmpCodePoint(cp)) {
            sb.append((char) cp);
        } else if (Character.isValidCodePoint(cp)) {
            sb.append(Character.highSurrogate(cp));
            sb.append(Character.lowSurrogate(cp));
        } else {
            sb.append('?');
        }
        return sb.toString();
    }

    public interface ToString<T> {
        ToString<String> DEFAULT = o -> o;

        String toString(T o);
    }
}
