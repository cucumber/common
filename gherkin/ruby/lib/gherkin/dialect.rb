require 'json'
require 'open3'
require 'c21e/exe_file'
require 'gherkin/exe_file_path'

module Gherkin
  def self.dialects_json
    gherkin_executable = C21e::ExeFile.new(EXE_FILE_PATH).target_file
    data, = Open3.capture2e(gherkin_executable, '--dialects')
    data
  end

  private_class_method :dialects_json

  DIALECTS = JSON.parse(dialects_json)

  class Dialect
    def self.for(name)
      spec = DIALECTS[name]
      return nil unless spec
      new(spec)
    end

    def initialize(spec)
      @spec = spec
    end

    def feature_keywords
      @spec.fetch('feature')
    end

    def rule_keywords
      @spec.fetch('rule')
    end

    def scenario_keywords
      @spec.fetch('scenario')
    end

    def scenario_outline_keywords
      @spec.fetch('scenarioOutline')
    end

    def examples_keywords
      @spec.fetch('examples')
    end

    def background_keywords
      @spec.fetch('background')
    end

    def given_keywords
      @spec.fetch('given')
    end

    def when_keywords
      @spec.fetch('when')
    end

    def then_keywords
      @spec.fetch('then')
    end

    def and_keywords
      @spec.fetch('and')
    end

    def but_keywords
      @spec.fetch('but')
    end
  end
end
