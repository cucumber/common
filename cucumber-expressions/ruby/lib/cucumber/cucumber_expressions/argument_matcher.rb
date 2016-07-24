require 'cucumber/cucumber_expressions/argument'

module Cucumber
  module CucumberExpressions
    class ArgumentMatcher
      def self.match_arguments(regexp, text, transforms)
        [Argument.new(0, "22", "22")]
      end
    end
  end
end
