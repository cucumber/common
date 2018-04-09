package gherkin;

import gherkin.ast.GherkinDocument;
import gherkin.deps.com.google.gson.Gson;
import gherkin.deps.com.google.gson.JsonParser;
import gherkin.pickles.Compiler;
import gherkin.pickles.Pickle;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ParserTest {

    @Test
    public void change_default_language() throws Exception {
        Gson gson = new Gson();
        JsonParser jsonParser = new JsonParser();
        TokenMatcher matcher = new TokenMatcher("no");
        Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());

	    GherkinDocument gherkinDocument = parser.parse("Egenskap: i18n support\n", matcher);

        assertEquals(jsonParser.parse("" +
                "{\"feature\":{\"tags\":[]," +
                "    \"language\":\"no\"," +
                "    \"keyword\":\"Egenskap\"," +
                "    \"name\":\"i18n support\"," +
                "    \"children\":[]," +
                "    \"type\":\"Feature\"," +
                "    \"location\":{\"line\":1,\"column\":1}}," +
                "\"comments\":[]," +
                "\"type\":\"GherkinDocument\"}"),
                jsonParser.parse(gson.toJson(gherkinDocument)));
    }
}
