package io.cucumber.cucumberexpressions;

import java.util.regex.Pattern;

/**
 * Abstracts creation of new {@link Pattern}. In some platforms and Java versions some flags are not supported (e.g {@link Pattern#UNICODE_CHARACTER_CLASS} on Android) - clients for those platforms should provide resource {@code META-INF/services/io.cucumber.cucumberexpressions.PatternCompiler} pointing to implementation of this interface.
 *
 * @see DefaultPatternCompiler
 * @see java.util.ServiceLoader
 */
public interface PatternCompiler {

    /**
     * @param regexp regular expression
     * @param flags  additional flags (e.g. {@link Pattern#UNICODE_CHARACTER_CLASS})
     * @return new {@link Pattern} instance from provided {@code regexp}
     */
    Pattern compile(String regexp, int flags);
}
