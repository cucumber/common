package gherkin;

import org.junit.Test;

import java.util.List;

import static gherkin.SymbolCounter.countSymbols;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class GherkinDialectProviderTest {
    @Test
    public void providesEmojiDialect() {
        GherkinDialect em = new GherkinDialectProvider().getDialect("em", null);
        assertEquals(1, countSymbols(em.getScenarioKeywords().get(0)));
    }

    @Test
    public void should_include_emoij_in_languages() {
        List<String> languages = new GherkinDialectProvider().getLanguages();
        assertTrue("Emoij should be available", languages.contains("em"));
    }

    @Test
    public void should_include_swedish_in_dialects() {
        GherkinDialectProvider gherkinDialectProvider = new GherkinDialectProvider();
        GherkinDialect expected = gherkinDialectProvider.getDialect("sv", null);

        List<GherkinDialect> actual = gherkinDialectProvider.getDialects();

        assertTrue("Swedish with explanation should be available", actual.contains(expected));
    }

    @Test
    public void should_find_Swedish_in_sv_dialect() {
        GherkinDialectProvider gherkinDialectProvider = new GherkinDialectProvider();
        GherkinDialect actual = gherkinDialectProvider.getDialect("sv", null);

        assertThat(actual.getName(), is("Swedish"));
    }

    @Test
    public void should_find_Svenska_in_sv_dialect() {
        GherkinDialectProvider gherkinDialectProvider = new GherkinDialectProvider();
        GherkinDialect actual = gherkinDialectProvider.getDialect("sv", null);

        assertThat(actual.getNativeName(), is("Svenska"));
    }

}
