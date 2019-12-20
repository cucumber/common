require 'cucumber/messages'
require 'gherkin/parser'
require 'gherkin/token_matcher'
require 'gherkin/pickles/compiler'

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
        Enumerator.new do |y|
          sources.each do |source|
            y.yield(Cucumber::Messages::Envelope.new(source: source)) if @options[:include_source]
            begin
              gherkin_document = nil

              if @options[:include_gherkin_document]
                gherkin_document = build_gherkin_document(source)
                y.yield(Cucumber::Messages::Envelope.new(gherkin_document: gherkin_document))
              end
              if @options[:include_pickles]
                gherkin_document ||= build_gherkin_document(source)
                pickles = @compiler.compile(gherkin_document, source)
                pickles.each do |pickle|
                  y.yield(Cucumber::Messages::Envelope.new(pickle: pickle))
                end
              end
            rescue CompositeParserException => err
              yield_error_attachments(y, err.errors, source.uri)
            rescue ParserException => err
              yield_error_attachments(y, [err], source.uri)
            end
          end
        end
      end

      private

      def yield_error_attachments(y, errors, uri)
        errors.each do |err|
          attachment = Cucumber::Messages::Attachment.new(
            source: Cucumber::Messages::SourceReference.new(
              uri: uri,
              location: Cucumber::Messages::Location.new(
                line: err.location[:line],
                column: err.location[:column]
              )
            ),
            text: err.message
          )
          y.yield(Cucumber::Messages::Envelope.new(attachment: attachment))
        end
      end

      def sources
        Enumerator.new do |y|
          @paths.each do |path|
            source = Cucumber::Messages::Source.new(
              uri: path,
              data: File.open(path, 'r:UTF-8', &:read),
              media_type: 'text/x.cucumber.gherkin+plain'
            )
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
          gd = @parser.parse(source.data, token_matcher)
        else
          gd = @parser.parse(source.data)
        end
        gd[:uri] = source.uri
        Cucumber::Messages::GherkinDocument.new(gd)
      end
    end
  end
end
