package gherkin;

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
        int i = 0;
        while (i < s.length() && Character.isWhitespace(s.charAt(i))) {
            i++;
        }
        return s.substring(i);
    }

    public interface ToString<T> {
        ToString<String> DEFAULT = new ToString<String>() {
            @Override
            public String toString(String o) {
                return o;
            }
        };

        String toString(T o);
    }
}
