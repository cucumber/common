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
        this.groupBuilder = parsePattern(pattern);
    }

    private static GroupBuilder parsePattern(Pattern pattern) {
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
                groupStartStack.push(i + 1);
                boolean capturing = isCapturingGroup(i, chars);
                GroupBuilder e = new GroupBuilder();
                if (!capturing) {
                    e.setNonCapturing();
                }
                stack.push(e);
            } else if (c == ')' && !escaping && !charClass) {
                GroupBuilder gb = stack.pop();
                int groupStart = groupStartStack.pop();
                if (gb.isCapturing()) {
                    gb.setSource(source.substring(groupStart, i));
                    stack.peek().add(gb);
                } else {
                    gb.moveChildrenTo(stack.peek());
                }
            }
            escaping = c == '\\' && !escaping;
        }
        return stack.pop();
    }

    private static boolean isCapturingGroup(int i, char[] chars) {
        // Regex is valid. Bounds check not required.
        char next = chars[++i];

        if (next != '?') {
            // (X)
            return true;
        }
        next = chars[++i];
        if (next != '<') {
            // (?:X)
            // (?idmsuxU-idmsuxU)
            // (?idmsux-idmsux:X)
            // (?=X)
            // (?!X)
            // (?>X)
            return false;
        }
        next = chars[++i];
        if (next == '=' || next == '!') {
            // (?<=X)
            // (?<!X)
            return false;
        }
        // (?<name>X)
        return true;
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
