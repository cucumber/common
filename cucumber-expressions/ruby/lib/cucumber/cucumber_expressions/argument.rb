module Cucumber
  module CucumberExpressions
    class Argument
      attr_reader :offset, :value

      def initialize(offset, value, parameter)
        @offset, @value, @parameter = offset, value, parameter
      end

      def transformed_value
        @parameter.transform(@value)
      end
    end
  end
end
