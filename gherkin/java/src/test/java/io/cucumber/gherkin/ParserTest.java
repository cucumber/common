package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.types.GherkinDocument;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ParserTest {

    @Test
    public void change_default_language() {
        TokenMatcher matcher = new TokenMatcher("no");
        IdGenerator idGenerator = new IdGenerator.Incrementing();
        Parser<GherkinDocument> parser = new Parser<>(new GherkinDocumentBuilder(idGenerator));

        GherkinDocument gherkinDocument = parser.parse("Egenskap: i18n support\n", matcher);
        assertEquals("no", gherkinDocument.getFeature().getLanguage());
    }
}
