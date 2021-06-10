require 'cucumber/messages'
require_relative '../parser'
require_relative '../token_matcher'
require_relative '../pickles/compiler'

module Gherkin
  module Stream
    class ParserMessageStream
      def initialize(paths, sources, options)
        @paths = paths
        @sources = sources
        @options = options

        id_generator = options[:id_generator] || Cucumber::Messages::IdGenerator::UUID.new
        @parser = Parser.new(AstBuilder.new(id_generator))
        @compiler = Pickles::Compiler.new(id_generator)
      end

      def messages
        enumerated = false
        Enumerator.new do |y|
          raise DoubleIterationException, "Messages have already been enumerated" if enumerated
          enumerated = true

          sources.each do |source|
            y.yield({source: source}) if @options[:include_source]
            begin
              gherkin_document = nil

              if @options[:include_gherkin_document]
                gherkin_document = build_gherkin_document(source)
                y.yield({gherkinDocument: gherkin_document})
              end
              if @options[:include_pickles]
                gherkin_document ||= build_gherkin_document(source)
                pickles = @compiler.compile(gherkin_document, source)
                pickles.each do |pickle|
                  y.yield({pickle: pickle})
                end
              end
            rescue CompositeParserException => err
              yield_parse_errors(y, err.errors, source[:uri])
            rescue ParserException => err
              yield_parse_errors(y, [err], source[:uri])
            end
          end
        end
      end

      private

      def yield_parse_errors(y, errors, uri)
        errors.each do |err|
          parse_error = {
            source: {
              uri: uri,
              location: {
                line: err.location[:line],
                column: err.location[:column]
              }.delete_if {|k,v| v.nil?}
            },
            message: err.message
          }
          y.yield({parseError: parse_error})
        end
      end

      def sources
        Enumerator.new do |y|
          @paths.each do |path|
            source = {
              uri: path,
              data: File.open(path, 'r:UTF-8', &:read),
              mediaType: 'text/x.cucumber.gherkin+plain'
            }
            y.yield(source)
          end
          @sources.each do |source|
            y.yield(source)
          end
        end
      end

      def build_gherkin_document(source)
        if @options[:default_dialect]
          token_matcher = TokenMatcher.new(@options[:default_dialect])
          gd = @parser.parse(source[:data], token_matcher)
        else
          gd = @parser.parse(source[:data])
        end
        gd[:uri] = source[:uri]
        gd
      end
    end
  end
end
