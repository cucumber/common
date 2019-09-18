require 'open3'
require 'gherkin/messages/protobuf_cucumber_messages'

module Gherkin
  module Messages
    class SubprocessCucumberMessages
      def initialize(gherkin_executable, paths, print_source, print_ast, print_pickles)
        @gherkin_executable, @paths, @print_source, @print_ast, @print_pickles = gherkin_executable, paths, print_source, print_ast, print_pickles
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
