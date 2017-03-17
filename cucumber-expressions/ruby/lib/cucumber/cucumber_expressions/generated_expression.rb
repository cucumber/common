module Cucumber
  module CucumberExpressions
    class GeneratedExpression
      attr_reader :source, :parameter_names, :parameter_types

      def initialize(source, parameter_names, parameters_types)
        @source, @parameter_names, @parameter_types = source, parameter_names, parameters_types
      end
    end
  end
end
