// using System;
// using System.Diagnostics;
// using System.IO;
// using Gherkin.Ast;
// using Gherkin.AstGenerator;
// using Newtonsoft.Json;
// using NUnit.Framework;

// namespace Gherkin.Specs
// {
//     [TestFixture]
//     public class ParserErrorsTest
//     {
//         [Test, TestCaseSource(typeof(TestFileProvider), "GetInvalidTestFiles")]
//         public void TestParserErrors(string testFeatureFile)
//         {
//             var featureFileFolder = Path.GetDirectoryName(testFeatureFile);
//             Debug.Assert(featureFileFolder != null);
//             var expectedErrorsFile = testFeatureFile + ".errors";

//             try
//             {
//                 var parser = new Parser();
//                 parser.Parse(testFeatureFile);
//                 Assert.Fail("ParserException expected");
//             }
//             catch (ParserException parserException)
//             {
//                 var errorsText = LineEndingHelper.NormalizeLineEndings(parserException.Message);

//                 var expectedErrorsText = LineEndingHelper.NormalizeLineEndings(File.ReadAllText(expectedErrorsFile));
//                 Assert.AreEqual(expectedErrorsText, errorsText);
//             }
//         }

//         [Test]
//         public void TestFeatureAfterParseError()
//         {
//             var tokenMatcher = new TokenMatcher();
//             var parser = new Parser(new AstBuilder<GherkinDocument>());
//             var jsonSerializerSettings = new JsonSerializerSettings();
//             jsonSerializerSettings.Formatting = Formatting.Indented;
//             jsonSerializerSettings.NullValueHandling = NullValueHandling.Ignore;

//             try
//             {
//                 parser.Parse(new TokenScanner(new StringReader(@"# a comment
// Feature: Foo
//   Scenario: Bar
//     Given x
//       ```
//       unclosed docstring")), tokenMatcher);
//                 Assert.Fail("ParserException expected");
//             }
//             catch (ParserException)
//             {
//             }
//             var parsingResult2 = parser.Parse(new TokenScanner(new StringReader(@"Feature: Foo
//   Scenario: Bar
//     Given x
//       """"""
//       closed docstring
//       """"""")), tokenMatcher);
//             var astText2 = LineEndingHelper.NormalizeLineEndings(JsonConvert.SerializeObject(parsingResult2, jsonSerializerSettings));

//             string expected2 = LineEndingHelper.NormalizeLineEndings(@"{
//   ""Feature"": {
//     ""Tags"": [],
//     ""Location"": {
//       ""Line"": 1,
//       ""Column"": 1
//     },
//     ""Language"": ""en"",
//     ""Keyword"": ""Feature"",
//     ""Name"": ""Foo"",
//     ""Children"": [
//       {
//         ""Tags"": [],
//         ""Location"": {
//           ""Line"": 2,
//           ""Column"": 3
//         },
//         ""Keyword"": ""Scenario"",
//         ""Name"": ""Bar"",
//         ""Steps"": [
//           {
//             ""Location"": {
//               ""Line"": 3,
//               ""Column"": 5
//             },
//             ""Keyword"": ""Given "",
//             ""Text"": ""x"",
//             ""Argument"": {
//               ""Location"": {
//                 ""Line"": 4,
//                 ""Column"": 7
//               },
//               ""Content"": ""closed docstring""
//             }
//           }
//         ]
//       }
//     ]
//   },
//   ""Comments"": []
// }");
//             Assert.AreEqual(expected2, astText2);
//         }
//     }
// }
