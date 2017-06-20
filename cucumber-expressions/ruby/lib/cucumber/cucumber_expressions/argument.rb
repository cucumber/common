module Cucumber
  module CucumberExpressions
    class Argument
      attr_reader :groups

      def initialize(groups, parameter_type)
        @groups, @parameter_type = groups, parameter_type
      end

      def transformed_value
        @parameter_type.transform(@groups)
      end
    end
  end
end
