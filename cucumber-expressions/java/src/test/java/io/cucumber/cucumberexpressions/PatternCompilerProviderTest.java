package io.cucumber.cucumberexpressions;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

import java.util.Arrays;
import java.util.Collections;
import java.util.regex.Pattern;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class PatternCompilerProviderTest {

    @BeforeEach
    public void setUp() {
        PatternCompilerProvider.service = null;
    }

    @AfterEach
    public void tearDown() {
        PatternCompilerProvider.service = null;
    }

    @Test
    public void use_default_compiler_if_none_registered() {
        PatternCompilerProvider.findPatternCompiler(Collections.<PatternCompiler>emptyList().iterator());
        assertSame(DefaultPatternCompiler.class, PatternCompilerProvider.service.getClass());
    }

    @Test
    public void use_found_pattern_compiler_if_one_provided() {
        PatternCompiler compiler = getTestCompiler();
        PatternCompilerProvider.findPatternCompiler(Collections.singletonList(compiler).iterator());
        assertSame(compiler, PatternCompilerProvider.service);
    }

    @Test
    public void throws_error_if_more_than_one_pattern_compiler() {

        final Executable testMethod = () -> PatternCompilerProvider.findPatternCompiler(Arrays.asList(new DefaultPatternCompiler(), getTestCompiler()).iterator());

        final IllegalStateException thrownException = assertThrows(IllegalStateException.class, testMethod);
        assertThat("Unexpected message", thrownException.getMessage(), is(equalTo("More than one PatternCompiler: [class io.cucumber.cucumberexpressions.DefaultPatternCompiler, class io.cucumber.cucumberexpressions.PatternCompilerProviderTest$1]")));
    }

    private PatternCompiler getTestCompiler() {
        return new PatternCompiler() {
            @Override
            public Pattern compile(String regexp, int flags) {
                return null;
            }
        };
    }

}
