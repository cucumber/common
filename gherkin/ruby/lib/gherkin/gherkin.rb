require 'open3'
require 'c21e/exe_file'
# require 'gherkin/protobuf_cucumber_messages'
require 'gherkin/exe_file_path'
require 'cucumber/messages'

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
      @gherkin_executable = C21e::ExeFile.new(EXE_FILE_PATH).target_file
    end

    def messages
      args = base_args
      args = args.concat(@paths)
      stdin, stdout, stderr, wait_thr = Open3.popen3(*args)
      stdin.binmode
      @sources.each do |source|
        wrapper = Cucumber::Messages::Envelope.new(
          source: source
        )
        wrapper.write_delimited_to(stdin)
      end
      stdin.close
      Cucumber::Messages::ProtobufIoEnumerator.call(stdout)
    end

    private

    def base_args
      args = [@gherkin_executable]
      args.push('--no-source') unless @options[:include_source]
      args.push('--no-ast') unless @options[:include_gherkin_document]
      args.push('--no-pickles') unless @options[:include_pickles]
      args.push("--default-dialect=#{@options[:default_dialect]}") unless @options[:default_dialect].nil?
      args
    end

    def self.encode_source_message(uri, data)
      media_obj = Cucumber::Messages::Media.new
      media_obj.encoding = 'UTF-8'
      media_obj.content_type = 'text/x.cucumber.gherkin+plain'
      source_obj = Cucumber::Messages::Source.new
      source_obj.uri = uri
      source_obj.data = data
      source_obj.media = media_obj
      source_obj
    end
  end
end
