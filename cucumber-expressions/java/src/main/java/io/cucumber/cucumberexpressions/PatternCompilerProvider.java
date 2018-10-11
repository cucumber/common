package io.cucumber.cucumberexpressions;

import java.util.ServiceLoader;

final class PatternCompilerProvider {
	//visible from tests
	static PatternCompiler service;

	private PatternCompilerProvider() {
	}

	static synchronized PatternCompiler getCompiler() {
		if (service == null) {
			ServiceLoader<PatternCompiler> loader = ServiceLoader.load(PatternCompiler.class);
			for (PatternCompiler patternCompiler : loader) {
				service = patternCompiler;
			}
			if (service == null) {
				service = new DefaultPatternCompiler();
			}
		}
		return service;
	}

}
