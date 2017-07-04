package gherkin;

import gherkin.ast.GherkinDocument;
import gherkin.deps.com.google.gson.Gson;
import gherkin.deps.com.google.gson.JsonParser;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ParserTest {

    @Test
    public void parses_feature_after_parse_error() throws Exception {
        Gson gson = new Gson();
        JsonParser jsonParser = new JsonParser();
        String in1 = "" +
                "# a comment\n" +
                "Feature: Foo\n" +
                "  Scenario: Bar\n" +
                "    Given x\n" +
                "      ```\n" +
                "      unclosed docstring\n";
        String in2 = "" +
                "Feature: Foo\n" +
                "  Scenario: Bar\n" +
                "    Given x\n" +
                "      \"\"\"\n" +
                "      closed docstring\n" +
                "      \"\"\"";
        TokenMatcher matcher = new TokenMatcher();
        Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());

        try {
            parser.parse(in1, matcher);
            fail("ParserException expected");
        } catch (ParserException e) {
            // pass
        }
        GherkinDocument gherkinDocument = parser.parse(in2, matcher);

        assertEquals(jsonParser.parse("" +
                "{\"feature\":{\"tags\":[]," +
                "    \"language\":\"en\"," +
                "    \"keyword\":\"Feature\"," +
                "    \"name\":\"Foo\"," +
                "    \"children\":[{" +
                "        \"tags\":[]," +
                "        \"keyword\":\"Scenario\"," +
                "        \"name\":\"Bar\"," +
                "        \"steps\":[{" +
                "            \"keyword\":\"Given \"," +
                "            \"text\":\"x\"," +
                "            \"argument\":{" +
                "                \"content\":\"closed docstring\"," +
                "                \"type\":\"DocString\"," +
                "                \"location\":{\"line\":4,\"column\":7}}," +
                "            \"type\":\"Step\"," +
                "            \"location\":{\"line\":3,\"column\":5}}]," +
                "        \"type\":\"Scenario\"," +
                "        \"location\":{\"line\":2,\"column\":3}}]," +
                "    \"type\":\"Feature\"," +
                "    \"location\":{\"line\":1,\"column\":1}}," +
                "\"comments\":[]," +
                "\"type\":\"GherkinDocument\"}"),
                jsonParser.parse(gson.toJson(gherkinDocument)));
    }
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
