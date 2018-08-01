require 'open3'
require 'gherkin/protobuf_cucumber_messages'
require 'gherkin/exe_file'
require 'gherkin/exe_file_path'
require 'cucumber/messages'

module Gherkin
  class Gherkin
    def initialize(paths, print_source, print_ast, print_pickles, default_dialect = nil)
      @paths, @print_source, @print_ast, @print_pickles = paths, print_source, print_ast, print_pickles
      @default_dialect = default_dialect
      @gherkin_executable = ExeFile.new(EXE_FILE_PATH).target_file
    end

    def messages
      args = base_args
      args = args.concat(@paths)
      stdin, stdout, stderr, wait_thr = Open3.popen3(*args)
      stdin.close
      ProtobufCucumberMessages.new(stdout, stderr).messages
    end

    def parse(uri, data)
      args = base_args
      stdin, stdout, stderr, wait_thr = Open3.popen3(*args)
      stdin.binmode
      stdin.write(encode_source_message(uri, data))
      stdin.close
      ProtobufCucumberMessages.new(stdout, stderr).messages
    end

    private

    def base_args
      args = [@gherkin_executable]
      args.push('--no-source') unless @print_source
      args.push('--no-ast') unless @print_ast
      args.push('--no-pickles') unless @print_pickles
      args.push("--default-dialect=#{@default_dialect}") unless @default_dialect.nil?
      args
    end

    def encode_source_message(uri, data)
      media_obj = Cucumber::Messages::Media.new
      media_obj.encoding = 'UTF-8'
      media_obj.content_type = 'text/x.cucumber.gherkin+plain'
      source_obj = Cucumber::Messages::Source.new
      source_obj.uri = uri
      source_obj.data = data
      source_obj.media = media_obj
      wrapper_obj = Cucumber::Messages::Wrapper.new
      wrapper_obj.source = source_obj
      buf = Cucumber::Messages::Wrapper.encode(wrapper_obj)
      buf[1..-1] # A leading "\n" needs to be removed
    end
  end
end
