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
class TreeRegexp {
    private final Pattern pattern;
    private final GroupBuilder groupBuilder;

    TreeRegexp(String regexp) {
        this(Pattern.compile(regexp));
    }

    TreeRegexp(Pattern pattern) {
        this.pattern = pattern;
        char[] chars = pattern.pattern().toCharArray();
        Deque<GroupBuilder> stack = new ArrayDeque<>();

        stack.push(new GroupBuilder());
        char last = 0;
        boolean nonCapturingMaybe = false;
        for (char c : chars) {
            if (c == '(' && last != '\\') {
                stack.push(new GroupBuilder());
                nonCapturingMaybe = false;
            } else if (c == ')' && last != '\\') {
                GroupBuilder gb = stack.pop();
                if (gb.isCapturing()) {
                    stack.peek().add(gb);
                } else {
                    gb.moveChildrenTo(stack.peek());
                }
                nonCapturingMaybe = false;
            } else if (c == '?' && last == '(') {
                nonCapturingMaybe = true;
            } else if (c == ':' && nonCapturingMaybe) {
                stack.peek().setNonCapturing();
                nonCapturingMaybe = false;
            }
            last = c;
        }
        groupBuilder = stack.pop();
    }

    Pattern pattern() {
        return pattern;
    }

    Group match(CharSequence s) {
        Matcher matcher = pattern.matcher(s);
        if (!matcher.matches()) return null;
        return groupBuilder.build(matcher, IntStream.range(0, matcher.groupCount() + 1).iterator());
    }

}
