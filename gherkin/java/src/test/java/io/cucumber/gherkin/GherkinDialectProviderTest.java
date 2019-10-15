package io.cucumber.gherkin;

import org.junit.Test;

import java.util.List;

import static io.cucumber.gherkin.StringUtils.symbolCount;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class GherkinDialectProviderTest {
    @Test
    public void provides_emoji_dialect() {
        GherkinDialect em = new GherkinDialectProvider().getDialect("em", null);
        assertEquals(1, symbolCount(em.getScenarioKeywords().get(0)));
    }

    @Test
    public void provides_language_list() {
        List<String> languages = new GherkinDialectProvider().getLanguages();
        assertTrue(languages.contains("en"));
    }

    @Test
    public void provides_native_name_which_is_used_in_cucumber_jvm_code_generation() {
        GherkinDialect no = new GherkinDialectProvider().getDialect("no", null);
        assertEquals("norsk", no.getNativeName());
    }
}
