module Cucumber
  module CucumberExpressions
    class Argument
      attr_reader :offset, :value, :transformed_value

      def initialize(offset, value, transformed_value)
        @offset, @value, @transformed_value = offset, value, transformed_value
      end
    end
  end
end
