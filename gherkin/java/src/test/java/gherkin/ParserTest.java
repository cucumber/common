package gherkin;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import gherkin.deps.com.google.gson.JsonParser;
import io.cucumber.messages.Messages.GherkinDocument;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ParserTest {

    @Test
    public void change_default_language() throws InvalidProtocolBufferException {
        JsonParser jsonParser = new JsonParser();
        JsonFormat.Printer printer = JsonFormat.printer();
        TokenMatcher matcher = new TokenMatcher("no");
        Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());

        GherkinDocument gherkinDocument = parser.parse("Egenskap: i18n support\n", matcher).build();
        String json = printer.print(gherkinDocument);

        assertEquals(jsonParser.parse("" +
                        "{\"feature\":{\"location\":{\"line\":1,\"column\":1},\"language\":\"no\",\"keyword\":\"Egenskap\",\"name\":\"i18n support\"}}"),
                jsonParser.parse(json));
    }
}
