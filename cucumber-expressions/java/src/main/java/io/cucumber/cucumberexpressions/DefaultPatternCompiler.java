package io.cucumber.cucumberexpressions;

import java.util.regex.Pattern;

/**
 * Default {@link PatternCompiler} compiling {@link Pattern} with flag {@link Pattern#UNICODE_CHARACTER_CLASS}
 */
class DefaultPatternCompiler implements PatternCompiler {

	@Override
	public Pattern compile(String regexp) {
		return Pattern.compile(regexp, Pattern.UNICODE_CHARACTER_CLASS);
	}
}
