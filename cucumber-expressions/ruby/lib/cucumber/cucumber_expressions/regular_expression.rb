require 'cucumber/cucumber_expressions/argument_matcher'

module Cucumber
  module CucumberExpressions
    class RegularExpression
      attr_reader :regexp

      def initialize(regexp, transforms)
        @regexp, @transforms = regexp, transforms
      end

      def match(text)
        ArgumentMatcher.match_arguments(@regexp, text, @transforms)
      end
    end
  end
end
