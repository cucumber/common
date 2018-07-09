require 'open3'
require 'gherkin/messages/protobuf_cucumber_messages'
require 'gherkin/exe_file'

module Gherkin
  module Messages
    class SubprocessCucumberMessages
      def initialize(paths, print_source, print_ast, print_pickles)
        @paths, @print_source, @print_ast, @print_pickles = paths, print_source, print_ast, print_pickles
        path_pattern = "#{File.dirname(__FILE__)}/../../../gherkin-go/gherkin-{{.OS}}-{{.Arch}}{{.Ext}}"
        @gherkin_executable = ExeFile.new(File.expand_path(path_pattern)).target_file
      end

      def messages
        args = [@gherkin_executable]
        args.push('--no-source') unless @print_source
        args.push('--no-ast') unless @print_ast
        args.push('--no-pickles') unless @print_pickles
        args = args.concat(@paths)
        stdin, stdout, stderr, wait_thr = Open3.popen3(*args)
        ProtobufCucumberMessages.new(stdout).messages
      end
    end
  end
end
