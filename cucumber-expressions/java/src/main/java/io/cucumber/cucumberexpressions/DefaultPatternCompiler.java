package io.cucumber.cucumberexpressions;

import java.util.regex.Pattern;

/**
 * Default {@link PatternCompiler}
 */
class DefaultPatternCompiler implements PatternCompiler {

    @Override
    public Pattern compile(String regexp, int flags) {
        return Pattern.compile(regexp, flags);
    }
}
