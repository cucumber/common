package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.Messages.GherkinDocument;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ParserTest {

    @Test
    public void change_default_language() {
        TokenMatcher matcher = new TokenMatcher("no");
        IdGenerator idGenerator = new IdGenerator.Incrementing();
        Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder(idGenerator));

        GherkinDocument gherkinDocument = parser.parse("Egenskap: i18n support\n", matcher).build();
        assertEquals("no", gherkinDocument.getFeature().getLanguage());
    }
}
