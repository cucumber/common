require 'cucumber/cucumber_expressions/argument'

module Cucumber
  module CucumberExpressions
    class ArgumentMatcher
      def self.match_arguments(regexp, text, transforms)
        m = regexp.match(text)
        return nil if m.nil?
        (1...m.length).map do |index|
          value = m[index]
          transform = transforms[index-1]
          transformed_value = transform.transform(value)
          Argument.new(m.offset(index)[0], value, transformed_value)
        end
      end
    end
  end
end
