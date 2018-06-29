require 'cucumber/messages'
require 'gherkin/parser'
require 'gherkin/pickles/compiler'

module Gherkin
  module Messages
    class ParserCucumberMessages
      def initialize(paths, print_source, print_ast, print_pickles)
        @paths, @print_source, @print_ast, @print_pickles = paths, print_source, print_ast, print_pickles
        @parser = Gherkin::Parser.new
        @compiler = Pickles::Compiler.new
      end
      
      def messages
        Enumerator.new do |y|
          sources.each do |source|
            y.yield(Cucumber::Messages::Wrapper.new(source: source)) if @print_source
            
            begin
              gherkin_document = nil
              
              if @print_ast
                gherkin_document = build_gherkin_document(source)
                y.yield(Cucumber::Messages::Wrapper.new(gherkinDocument: gherkin_document))
              end
              if @print_pickles
                gherkin_document ||= build_gherkin_document(source)
                pickles = @compiler.compile(gherkin_document, source.uri)
                pickles.each do |pickle|
                  y.yield(Cucumber::Messages::Wrapper.new(pickle: pickle))
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
            data: err.message
          )
          y.yield(Cucumber::Messages::Wrapper.new(attachment: attachment))
        end
      end

      def sources
        Enumerator.new do |y|
          @paths.each do |path|
            source = Cucumber::Messages::Source.new({
              uri: path,
              data: File.open(path, 'r:UTF-8', &:read),
              media: Cucumber::Messages::Media.new({
                encoding: 'UTF-8',
                content_type: 'text/x.cucumber.gherkin+plain'
              })
            })
            y.yield(source)
          end
        end
      end

      def build_gherkin_document(source)
        gd = @parser.parse(source.data)
        gd[:uri] = source.uri
        Cucumber::Messages::GherkinDocument.new(gd)
      end

    end
  end
end