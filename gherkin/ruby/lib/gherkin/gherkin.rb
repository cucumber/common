require 'gherkin/messages/parser_cucumber_messages'

module Gherkin
  class Gherkin

    DEFAULT_OPTIONS = {
      include_source: true,
      include_gherkin_document: true,
      include_pickles: true
    }.freeze

    def self.from_paths(paths, options={})
      self.new(paths, [], options).messages
    end

    def self.from_sources(sources, options={})
      self.new([], sources, options).messages
    end

    def self.from_source(uri, data, options={})
      from_sources([encode_source_message(uri, data)], options)
    end

    def initialize(paths, sources, options)
      @paths = paths
      @sources = sources
      @options = DEFAULT_OPTIONS.merge(options)
    end

    def messages
      Messages::ParserCucumberMessages.new(
        @paths,
        @sources,
        @options
      ).messages
    end

    private

    def self.encode_source_message(uri, data)
      Cucumber::Messages::Source.new({
        uri: uri,
        data: data,
        media: Cucumber::Messages::Media.new({
          encoding: :UTF8,
          content_type: 'text/x.cucumber.gherkin+plain'
        })
      })
    end
  end
end
