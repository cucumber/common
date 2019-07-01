package io.cucumber.cucumberexpressions;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * TreeRegexp represents matches as a tree of {@link Group}
 * reflecting the nested structure of capture groups in the original
 * regexp.
 */
class TreeRegexp {
    private final Pattern pattern;
    private final GroupBuilder groupBuilder;

    TreeRegexp(String regexp) {
        this(PatternCompilerProvider.getCompiler().compile(regexp, Pattern.UNICODE_CHARACTER_CLASS));
    }

    TreeRegexp(Pattern pattern) {
        this.pattern = pattern;
        String source = pattern.pattern();
        char[] chars = source.toCharArray();
        Deque<GroupBuilder> stack = new ArrayDeque<>();
        Deque<Integer> groupStartStack = new ArrayDeque<>();

        stack.push(new GroupBuilder());
        char last = 0;
        boolean escaping = false, charClass = false;
        boolean nonCapturingMaybe = false;
        int n = 1;
        for (char c : chars) {
            if (c == '[' && !escaping) {
                charClass = true;
            } else if (c == ']' && !escaping) {
                charClass = false;
            } else if (c == '(' && !escaping && !charClass) {
                stack.push(new GroupBuilder());
                groupStartStack.push(n);
                nonCapturingMaybe = false;
            } else if (c == ')' && !escaping && !charClass) {
                GroupBuilder gb = stack.pop();
                int groupStart = groupStartStack.pop();
                if (gb.isCapturing()) {
                    gb.setSource(source.substring(groupStart, n - 1));
                    stack.peek().add(gb);
                } else {
                    gb.moveChildrenTo(stack.peek());
                }
                nonCapturingMaybe = false;
            } else if (c == '?' && last == '(') {
                nonCapturingMaybe = true;
            } else if ((c == ':' || c == '!') && nonCapturingMaybe) {
                stack.peek().setNonCapturing();
                nonCapturingMaybe = false;
            }

            escaping = c == '\\' && !escaping;
            last = c;
            n++;
        }
        groupBuilder = stack.pop();
    }

    Pattern pattern() {
        return pattern;
    }

    Group match(CharSequence s) {
        final Matcher matcher = pattern.matcher(s);
        if (!matcher.matches()) return null;
        return groupBuilder.build(matcher, new IntRange(0, matcher.groupCount() + 1));
    }

    public GroupBuilder getGroupBuilder() {
        return groupBuilder;
    }

    private static class IntRange implements Iterator<Integer> {
        private final int endExclusive;
        private int n;

        public IntRange(int startInclusive, int endExclusive) {
            this.endExclusive = endExclusive;
            n = startInclusive;
        }

        @Override
        public boolean hasNext() {
            return n < endExclusive;
        }

        @Override
        public Integer next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return n++;
        }

        @Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
    }
}
