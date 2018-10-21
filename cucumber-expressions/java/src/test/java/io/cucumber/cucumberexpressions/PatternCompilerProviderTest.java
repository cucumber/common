package io.cucumber.cucumberexpressions;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.regex.Pattern;

import static org.junit.Assert.assertSame;

public class PatternCompilerProviderTest {

    @Before
    public void setUp() {
        PatternCompilerProvider.service = null;
    }

    @After
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

    @Test(expected = IllegalStateException.class)
    public void throws_error_if_more_than_one_pattern_compiler() {
        PatternCompilerProvider.findPatternCompiler(Arrays.asList(new DefaultPatternCompiler(), getTestCompiler()).iterator());

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
