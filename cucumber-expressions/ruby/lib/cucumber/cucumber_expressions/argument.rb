module Cucumber
  module CucumberExpressions
    class Argument
      attr_reader :offset, :value

      def initialize(offset, value, parameter_type)
        raise "WAT" if Array === parameter_type
        @offset, @value, @parameter_type = offset, value, parameter_type
      end

      def transformed_value
        @parameter_type.transform(@value)
      end
    end
  end
end
