require 'gherkin/parser'
require 'gherkin/token_scanner'
require 'gherkin/token_matcher'
require 'gherkin/ast_builder'
require 'gherkin/errors'
require 'rspec'

module Gherkin
  describe Parser do
    it "parses a simple feature" do
      parser = Parser.new
      scanner = TokenScanner.new("Feature: test")
      ast = parser.parse(scanner)
      expect(ast).to eq({
        feature: {
          type: :Feature,
          tags: [],
          location: {line: 1, column: 1},
          language: "en",
          keyword: "Feature",
          name: "test",
          children: []
        },
        comments: [],
        type: :GherkinDocument
      })
    end

    it "parses string feature" do
      parser = Parser.new
      ast = parser.parse("Feature: test")
      expect(ast).to eq({
        feature: {
          type: :Feature,
          tags: [],
          location: {line: 1, column: 1},
          language: "en",
          keyword: "Feature",
          name: "test",
          children: []
        },
        comments: [],
        type: :GherkinDocument
      })
    end

    it "parses io feature" do
      parser = Parser.new
      ast = parser.parse(StringIO.new("Feature: test"))
      expect(ast).to eq({
        feature: {
          type: :Feature,
          tags: [],
          location: {line: 1, column: 1},
          language: "en",
          keyword: "Feature",
          name: "test",
          children: []
        },
        comments: [],
        type: :GherkinDocument
      })
    end

    it "can parse multiple features" do
      parser = Parser.new
      ast1 = parser.parse(TokenScanner.new("Feature: test"))
      ast2 = parser.parse(TokenScanner.new("Feature: test2"))

      expect(ast1).to eq({
        feature: {
          type: :Feature,
          tags: [],
          location: {line: 1, column: 1},
          language: "en",
          keyword: "Feature",
          name: "test",
          children: []
        },
        comments: [],
        type: :GherkinDocument
      })
      expect(ast2).to eq({
        feature: {
          type: :Feature,
          tags: [],
          location: {line: 1, column: 1},
          language: "en",
          keyword: "Feature",
          name: "test2",
          children: []
        },
        comments: [],
        type: :GherkinDocument
      })
    end

    it "can change the default language" do
      parser = Parser.new
      matcher = TokenMatcher.new("no")
      scanner = TokenScanner.new("Egenskap: i18n support")
      ast = parser.parse(scanner, matcher)
      expect(ast).to eq({
        feature: {
          type: :Feature,
          tags: [],
          location: {line: 1, column: 1},
          language: "no",
          keyword: "Egenskap",
          name: "i18n support",
          children: []
        },
        comments: [],
        type: :GherkinDocument
      })
    end
  end
end
