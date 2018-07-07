require 'os'
require 'yaml'

module Gherkin
  class ExeFile
    attr_accessor :file_name

    def initialize(executable_pattern, props = {})
      @props = load_properties(props)
      @file_name = executable_pattern
                   .gsub('{{.OS}}', os)
                   .gsub('{{.Arch}}', arch)
                   .gsub('{{.Ext}}', ext)
    end

    def target_file
      File.new("../gherkin-go/#{@file_name}")
    end

    def load_properties(props)
      os_props = YAML.safe_load(OS.report)
      {
        'os.name' => props.dig('name') || os_props.dig('target_os'),
        'os.arch' => props.dig('arch') || os_props.dig('arch')
      }
    end

    def ext
      os == 'windows' ? '.exe' : ''
    end

    def os
      normalize_os(@props.dig('os.name'))
    end

    def arch
      normalize_arch(@props.dig('os.arch'))
    end

    def normalize(value)
      return nil if value.nil?
      value.downcase.gsub(/[^a-z0-9]+/, '') # Locale.US?
    end

    def normalize_arch(value)
      value = normalize(value)
      if value =~ /^x8664|amd64|ia32e|em64t|x64$/
        'amd64'
      elsif value =~ /^(x8632|x86|i[3-6]86|ia32|x32)$/
        '386'
      elsif value =~ /^(ia64w?|itanium64)$/
        'itanium_64' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value == 'ia64n'
        'itanium_32' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value =~ /^(sparc|sparc32)$/
        'sparc_32' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value =~ /^(sparcv9|sparc64)$/
        'sparc_64' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value =~ /^(arm|arm32)$/
        'arm'
      elsif value == 'aarch64'
        'aarch_64' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value =~ /^(mips|mips32)$/
        'mips'
      elsif value =~ /^(mipsel|mips32el)$/ # TODO: Is this a typo? Should it be mipsle|mips32le ?
        'mipsle'
      elsif value == 'mips64'
        'mips64'
      elsif value == 'mips64el' # TODO: Is this a typo? Should it be mips64le?
        'mips64le'
      elsif value =~ /^(ppc|ppc32)$/
        'ppc_32' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value =~ /^(ppcle|ppc32le)$/
        'ppcle_32' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value == 'ppc64'
        'ppc_64' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value == 'ppc64le'
        'ppcle_64' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value == 's390'
        's390_32' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value == 's390x'
        's390x'
      else
        'unknown'
      end
    end

    def normalize_os(value)
      value = normalize(value)
      if value.start_with?('aix')
        'aix' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value.start_with?('hpux')
        'hpux' # TODO: not supported by https://github.com/mitchellh/gox ?
      elsif value.start_with?('os400')
        # Avoid the names such as os4000
        if value.length <= 5 || value[5].is_a?(Numeric)
          'os400' # TODO: not supported by https://github.com/mitchellh/gox ?
        end
      elsif value.start_with?('linux')
        'linux'
      elsif value.start_with?('macosx', 'osx', 'darwin')
        'darwin'
      elsif value.start_with?('freebsd')
        'freebsd'
      elsif value.start_with?('openbsd')
        'openbsd'
      elsif value.start_with?('netbsd')
        'netbsd'
      elsif value.start_with?('solaris', 'sunos')
        'sunos'
      elsif value.start_with?('windows')
        'windows'
      else
        'unknown'
      end
    end
  end
end
