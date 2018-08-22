package io.cucumber.cucumberexpressions;

import java.text.Collator;
import java.util.Arrays;
import java.util.Locale;

public enum ProgrammingLanguage {
    JAVA {
        private final String JAVA_KEYWORDS[] = {
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
        private final Collator ENGLISH_COLLATOR = Collator.getInstance(Locale.ENGLISH);

        @Override
        public boolean isKeyword(String keyword) {
            return (Arrays.binarySearch(JAVA_KEYWORDS, keyword, ENGLISH_COLLATOR) >= 0);
        }
    };

    public abstract boolean isKeyword(String s);
}
