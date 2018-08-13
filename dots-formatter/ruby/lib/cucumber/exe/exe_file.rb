require 'os'
require 'yaml'

module Cucumber
  module Exe
    class ExeFile
      attr_accessor :target_file

      def initialize(executable_pattern, props = load_props)
        @props = props
        @target_file = executable_pattern
                       .gsub('{{.OS}}', os)
                       .gsub('{{.Arch}}', arch)
                       .gsub('{{.Ext}}', ext)
      end

      def load_props
        {
          os: RbConfig::CONFIG['target_os'],
          arch: RbConfig::CONFIG['target_cpu']
        }
      end

      def ext
        os == 'windows' ? '.exe' : ''
      end

      def os
        case @props[:os]
          when /darwin/ then 'darwin'
          when /freebsd/ then 'freebsd'
          when /linux/ then 'linux'
          when /netbsd/ then 'netbsd'
          when /openbsd/ then 'openbsd'
          when /cygwin|mingw32|mswin32/ then 'windows'
          else @props[:os]
        end
      end

      def arch
        # https://github.com/kolosek/residds/blob/master/vendor/bundle/ruby/2.0.0/gems/launchy-2.4.3/spec/tattle-host-os.yaml
        case @props[:arch]
          when /i\d86/ then '386'
          when /x86_64/ then 'amd64'
          else @props[:arch]
        end
      end
    end
  end
end
