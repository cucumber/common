using System.IO;
using Gherkin.Ast;
using Newtonsoft.Json;
using Gherkin.CLI;
using Xunit;

namespace Gherkin.Specs
{
    public class SuccessfulParsingTests
    {
        [Theory, MemberData(nameof(TestFileProvider.GetValidTestFiles), MemberType = typeof(TestFileProvider))]
        public void TestSuccessfulParsing(string testFeatureFile)
        {
            var parser = new Parser();
            var parsingResult = parser.Parse(testFeatureFile);
            Assert.NotNull(parsingResult);
        }

        [Fact]
        public void TestMultipleFeatures()
        {
            var tokenMatcher = new TokenMatcher();
            var parser = new Parser(new AstBuilder<GherkinDocument>());
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Formatting = Formatting.Indented;
            jsonSerializerSettings.NullValueHandling = NullValueHandling.Ignore;

            var parsingResult1 = parser.Parse(new TokenScanner(new StringReader("Feature: Test")), tokenMatcher);
            var astText1 = LineEndingHelper.NormalizeLineEndings(JsonConvert.SerializeObject(parsingResult1, jsonSerializerSettings));
            var parsingResult2 = parser.Parse(new TokenScanner(new StringReader("Feature: Test2")), tokenMatcher);
            var astText2 = LineEndingHelper.NormalizeLineEndings(JsonConvert.SerializeObject(parsingResult2, jsonSerializerSettings));

	    string expected1 = LineEndingHelper.NormalizeLineEndings(@"{
  ""Feature"": {
    ""Tags"": [],
    ""Location"": {
      ""Line"": 1,
      ""Column"": 1
    },
    ""Language"": ""en"",
    ""Keyword"": ""Feature"",
    ""Name"": ""Test"",
    ""Children"": []
  },
  ""Comments"": []
}");
	    string expected2 = LineEndingHelper.NormalizeLineEndings(@"{
  ""Feature"": {
    ""Tags"": [],
    ""Location"": {
      ""Line"": 1,
      ""Column"": 1
    },
    ""Language"": ""en"",
    ""Keyword"": ""Feature"",
    ""Name"": ""Test2"",
    ""Children"": []
  },
  ""Comments"": []
}");
            Assert.Equal(expected1, astText1);
            Assert.Equal(expected2, astText2);
        }

        [Fact]
        public void TestChangeDefaultLanguage()
        {
            var tokenMatcher = new TokenMatcher("no");
            var parser = new Parser(new AstBuilder<GherkinDocument>());
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Formatting = Formatting.Indented;
            jsonSerializerSettings.NullValueHandling = NullValueHandling.Ignore;

            var parsingResult = parser.Parse(new TokenScanner(new StringReader("Egenskap: i18n support")), tokenMatcher);
            var astText = LineEndingHelper.NormalizeLineEndings(JsonConvert.SerializeObject(parsingResult, jsonSerializerSettings));

	    string expected = LineEndingHelper.NormalizeLineEndings(@"{
  ""Feature"": {
    ""Tags"": [],
    ""Location"": {
      ""Line"": 1,
      ""Column"": 1
    },
    ""Language"": ""no"",
    ""Keyword"": ""Egenskap"",
    ""Name"": ""i18n support"",
    ""Children"": []
  },
  ""Comments"": []
}");
            Assert.Equal(expected, astText);
        }
    }
}
