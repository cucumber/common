package io.cucumber.cucumberexpressions;

import java.util.ArrayDeque;
import java.util.Collections;
import java.util.Deque;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.IntStream;

import static java.util.Collections.singleton;

/**
 * TreeRegexp represents matches as a tree of {@link Group}
 * reflecting the nested structure of capture groups in the original
 * regexp.
 */
final class TreeRegexp {
    private final Pattern pattern;
    private final GroupBuilder groupBuilder;

    TreeRegexp(String regexp) {
        this(PatternCompilerProvider.getCompiler().compile(regexp, Pattern.UNICODE_CHARACTER_CLASS));
    }

    TreeRegexp(Pattern pattern) {
        this.pattern = pattern;
        this.groupBuilder = createGroupBuilder(pattern);
    }

    static GroupBuilder createGroupBuilder(Pattern pattern) {
        String source = pattern.pattern();
        Deque<GroupBuilder> stack = new ArrayDeque<>(singleton(new GroupBuilder(0)));
        boolean escaping = false;
        boolean charClass = false;

        for (int i = 0; i < source.length(); i++) {
            char c = source.charAt(i);
            if (c == '[' && !escaping) {
                charClass = true;
            } else if (c == ']' && !escaping) {
                charClass = false;
            } else if (c == '(' && !escaping && !charClass) {
                boolean nonCapturing = isNonCapturingGroup(source, i);
                GroupBuilder groupBuilder = new GroupBuilder(i);
                if (nonCapturing) {
                    groupBuilder.setNonCapturing();
                }
                stack.push(groupBuilder);
            } else if (c == ')' && !escaping && !charClass) {
                GroupBuilder gb = stack.pop();
                if (gb.isCapturing()) {
                    gb.setSource(source.substring(gb.getStartIndex() + 1, i));
                    stack.peek().add(gb);
                } else {
                    gb.moveChildrenTo(stack.peek());
                }
                gb.setEndIndex(i);
            }
            escaping = c == '\\' && !escaping;
        }
        return stack.pop();
    }

    private static boolean isNonCapturingGroup(String source, int i) {
        // Regex is valid. Bounds check not required.
        if (source.charAt(i+1) != '?') {
            // (X)
            return false;
        }
        if (source.charAt(i+2) != '<') {
            // (?:X)
            // (?idmsuxU-idmsuxU)
            // (?idmsux-idmsux:X)
            // (?=X)
            // (?!X)
            // (?>X)
            return true;
        }
        // (?<=X) or (?<!X) else (?<name>X)
        return source.charAt(i + 3) == '=' || source.charAt(i + 3) == '!';
    }

    Pattern pattern() {
        return pattern;
    }

    Group match(CharSequence s) {
        final Matcher matcher = pattern.matcher(s);
        if (!matcher.matches())
            return null;
        return groupBuilder.build(matcher, IntStream.rangeClosed(0, matcher.groupCount()).iterator());
    }

    public GroupBuilder getGroupBuilder() {
        return groupBuilder;
    }

}
