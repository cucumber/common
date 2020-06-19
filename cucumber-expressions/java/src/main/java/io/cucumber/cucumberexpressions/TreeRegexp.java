package io.cucumber.cucumberexpressions;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.IntStream;

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

    private static GroupBuilder createGroupBuilder(Pattern pattern) {
        String source = pattern.pattern();
        char[] chars = source.toCharArray();
        Deque<GroupBuilder> stack = new ArrayDeque<>();
        Deque<Integer> groupStartStack = new ArrayDeque<>();

        stack.push(new GroupBuilder());
        boolean escaping = false, charClass = false;

        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];
            if (c == '[' && !escaping) {
                charClass = true;
            } else if (c == ']' && !escaping) {
                charClass = false;
            } else if (c == '(' && !escaping && !charClass) {
                groupStartStack.push(i);
                boolean nonCapturing = isNonCapturingGroup(chars, i);
                GroupBuilder e = new GroupBuilder();
                if (nonCapturing) {
                    e.setNonCapturing();
                }
                stack.push(e);
            } else if (c == ')' && !escaping && !charClass) {
                GroupBuilder gb = stack.pop();
                int groupStart = groupStartStack.pop();
                if (gb.isCapturing()) {
                    gb.setSource(source.substring(groupStart + 1, i));
                    stack.peek().add(gb);
                } else {
                    gb.moveChildrenTo(stack.peek());
                }
            }
            escaping = c == '\\' && !escaping;
        }
        return stack.pop();
    }

    private static boolean isNonCapturingGroup(char[] chars, int i) {
        // Regex is valid. Bounds check not required.
        char next = chars[++i];

        if (next != '?') {
            // (X)
            return false;
        }
        next = chars[++i];
        if (next != '<') {
            // (?:X)
            // (?idmsuxU-idmsuxU)
            // (?idmsux-idmsux:X)
            // (?=X)
            // (?!X)
            // (?>X)
            return true;
        }
        next = chars[++i];
        if (next == '=' || next == '!') {
            // (?<=X)
            // (?<!X)
            return true;
        }
        // (?<name>X)
        return false;
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
