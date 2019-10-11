package io.cucumber.gherkin;

import io.cucumber.gherkin.GherkinDialect;
import io.cucumber.gherkin.GherkinDialectProvider;
import org.junit.Test;

import static io.cucumber.gherkin.StringUtils.symbolCount;
import static org.junit.Assert.assertEquals;

public class GherkinDialectProviderTest {
    @Test
    public void providesEmojiDialect() {
        GherkinDialect em = new GherkinDialectProvider().getDialect("em", null);
        assertEquals(1, symbolCount(em.getScenarioKeywords().get(0)));
    }
}
