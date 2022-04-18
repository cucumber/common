require 'cucumber/messages'
require 'json'

module Gherkin
  DIALECT_FILE_PATH = File.expand_path("gherkin-languages.json", File.dirname(__FILE__))
  DIALECTS = JSON.parse File.open(DIALECT_FILE_PATH, 'r:UTF-8').read

  class Dialect
    def self.for(name)
      spec = DIALECTS[name]
      return nil unless spec
      new(spec)
    end

    def initialize(spec)
      @spec = spec
      @step_keywords_by_type = {
        Cucumber::Messages::StepKeywordType::CONTEXT => given_keywords(),
        Cucumber::Messages::StepKeywordType::ACTION => when_keywords(),
        Cucumber::Messages::StepKeywordType::OUTCOME => then_keywords(),
        Cucumber::Messages::StepKeywordType::CONJUNCTION => [].concat(and_keywords()).concat(but_keywords())
      }
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

    def step_keywords_by_type
      @step_keywords_by_type
    end
  end
end
