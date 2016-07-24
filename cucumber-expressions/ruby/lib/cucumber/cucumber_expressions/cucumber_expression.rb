require 'cucumber/cucumber_expressions/argument_matcher'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      def initialize(expression, target_types, transform_lookup)
      end

      def match(text)
        ArgumentMatcher.match_arguments(@regexp, text, @transforms)
      end
    end
  end
end
