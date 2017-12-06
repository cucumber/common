package gherkin;

import org.junit.Test;

import java.util.List;

import static gherkin.SymbolCounter.countSymbols;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class GherkinDialectProviderTest {
    @Test
    public void providesEmojiDialect() {
        GherkinDialect em = new GherkinDialectProvider().getDialect("em", null);
        assertEquals(1, countSymbols(em.getScenarioKeywords().get(0)));
    }

    @Test
    public void should_include_swedish_in_languages() {
        GherkinDialectProvider gherkinDialectProvider = new GherkinDialectProvider();
        List<String> actual = gherkinDialectProvider.getLanguages();

        String expected = getExpected(gherkinDialectProvider);

        assertTrue("Swedish with explanation should be available", actual.contains(expected));
    }

    private String getExpected(GherkinDialectProvider gherkinDialectProvider) {
        int keyName = gherkinDialectProvider.separation + gherkinDialectProvider.getMaxKeyLength() - "sv".length();
        int nameNative = gherkinDialectProvider.separation + gherkinDialectProvider.getMaxNameLength() - "Swedish".length();

        return "sv" + rightPad(keyName) + "Swedish" + rightPad(nameNative) + "Svenska";
    }

    private String rightPad(int n) {
        return String.format("%1$-" + n + "s", "");
    }
}
