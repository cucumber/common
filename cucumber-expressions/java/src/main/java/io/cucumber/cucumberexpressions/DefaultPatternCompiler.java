package io.cucumber.cucumberexpressions;

import java.util.regex.Pattern;

/**
 * Default {@link PatternCompiler}
 */
final class DefaultPatternCompiler implements PatternCompiler {

    @Override
    public Pattern compile(String regexp, int flags) {
        return Pattern.compile(regexp, flags);
    }
}
