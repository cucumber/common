var assert = require('assert');
var Gherkin = require('..');

describe('Parser', function () {
  it("parses a simple feature", function () {
    var parser = new Gherkin.Parser(new Gherkin.AstBuilder());
    var scanner = new Gherkin.TokenScanner("Feature: hello");
    var matcher = new Gherkin.TokenMatcher();
    var ast = parser.parse(scanner, matcher);
    assert.deepEqual(ast, {
      type: 'GherkinDocument',
      feature: {
        type: 'Feature',
        tags: [],
        location: { line: 1, column: 1 },
        language: 'en',
        keyword: 'Feature',
        name: 'hello',
        description: undefined,
        children: []
      },
      comments: []
    });
  });

  it("parses multiple features", function () {
    var parser = new Gherkin.Parser(new Gherkin.AstBuilder());
    var matcher = new Gherkin.TokenMatcher();
    var ast1 = parser.parse(new Gherkin.TokenScanner("Feature: hello"), matcher);
    var ast2 = parser.parse(new Gherkin.TokenScanner("Feature: hello again"), matcher);

    assert.deepEqual(ast1, {
      type: 'GherkinDocument',
      feature: {
        type: 'Feature',
        tags: [],
        location: { line: 1, column: 1 },
        language: 'en',
        keyword: 'Feature',
        name: 'hello',
        description: undefined,
        children: []
      },
      comments: []
    });
    assert.deepEqual(ast2, {
      type: 'GherkinDocument',
      feature: {
        type: 'Feature',
        tags: [],
        location: { line: 1, column: 1 },
        language: 'en',
        keyword: 'Feature',
        name: 'hello again',
        description: undefined,
        children: []
      },
      comments: []
    });
  });

  it("parses feature after parse error", function () {
    var parser = new Gherkin.Parser(new Gherkin.AstBuilder());
    var matcher = new Gherkin.TokenMatcher();
    assert.throws(function() { parser.parse(new Gherkin.TokenScanner("# a comment\n" +
								     "Feature: Foo\n" +
								     "  Scenario: Bar\n" +
								     "    Given x\n" +
								     "      ```\n" +
								     "      unclosed docstring\n"),
					    matcher) },
		  Gherkin.ParserException);
    var ast = parser.parse(new Gherkin.TokenScanner("Feature: Foo\n" +
						    "  Scenario: Bar\n" +
						    "    Given x\n" +
						    "      \"\"\"\n" +
						    "      closed docstring\n" +
						    "      \"\"\""),
			   matcher);

    assert.deepEqual(ast, {
      type: 'GherkinDocument',
      feature: {
        type: 'Feature',
        tags: [],
        location: {line: 1, column: 1},
        language: 'en',
        keyword: 'Feature',
        name: 'Foo',
        description: undefined,
        children: [{
          description: undefined,
          keyword: 'Scenario',
          location: {line: 2, column: 3},
          name: 'Bar',
          steps: [{
            argument: {
              content: 'closed docstring',
              location: {line: 4, column: 7},
              type: 'DocString',
            },
            keyword: 'Given ',
            location: {line: 3, column: 5},
            text: 'x',
            type: 'Step' }],
          tags: [],
          examples: [],
          type: 'Scenario' }]
      },
      comments: []
    });
  });

  it("can change the default language", function () {
    var parser = new Gherkin.Parser(new Gherkin.AstBuilder());
    var matcher = new Gherkin.TokenMatcher("no");
    var scanner = new Gherkin.TokenScanner("Egenskap: i18n support");
    var ast = parser.parse(scanner, matcher);
    assert.deepEqual(ast, {
      type: 'GherkinDocument',
      feature: {
        type: 'Feature',
        tags: [],
        location: { line: 1, column: 1 },
        language: 'no',
        keyword: 'Egenskap',
        name: 'i18n support',
        description: undefined,
        children: []
      },
      comments: []
    });
  });
});
