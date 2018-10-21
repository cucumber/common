package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ServiceLoader;

final class PatternCompilerProvider {
    // visible from tests
    static PatternCompiler service;

    private PatternCompilerProvider() {
    }

    static synchronized PatternCompiler getCompiler() {
        if (service == null) {
            ServiceLoader<PatternCompiler> loader = ServiceLoader.load(PatternCompiler.class);
            Iterator<PatternCompiler> iterator = loader.iterator();
            findPatternCompiler(iterator);
        }
        return service;
    }

    static void findPatternCompiler(Iterator<PatternCompiler> iterator) {
        if (iterator.hasNext()) {
            service = iterator.next();
            if (iterator.hasNext()) {
                throwMoreThanOneCompilerException(iterator);
            }
        } else {
            service = new DefaultPatternCompiler();
        }
    }

    private static void throwMoreThanOneCompilerException(Iterator<PatternCompiler> iterator) {
        List<Class<? extends PatternCompiler>> allCompilers = new ArrayList<>();
        allCompilers.add(service.getClass());
        while (iterator.hasNext()) {
            allCompilers.add(iterator.next().getClass());
        }
        throw new IllegalStateException("More than one PatternCompiler: " + allCompilers);
    }
}
