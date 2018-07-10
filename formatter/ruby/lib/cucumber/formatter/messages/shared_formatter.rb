require 'open3'
require 'cucumber/formatter/messages/protobuf_cucumber_messages'
require 'cucumber/formatter/messages/exe_file'

module Cucumber
  module Formatter
    module Messages
      class SharedFormatter 
        def initialize(formatter_name)
          @formatter_name = formatter_name
          # TODO: {{.OS}}-{{.Arch}}{{.Ext}}
          path_pattern = "#{File.dirname(__FILE__)}/../../../../#{formatter_name}/bin/cucumber-#{formatter_name}"
          @executable = ExeFile.new(File.expand_path(path_pattern)).target_file
        end

        def emit(message)
          stdin.puts(message)
        end

        private

        def stdin
          return @stdin if @stdin
          stdin, stdout, stderr, wait_thr = Open3.popen3(@executable)
          ProtobufCucumberMessages.new(stdin)
        end
      end
    end
  end
end
