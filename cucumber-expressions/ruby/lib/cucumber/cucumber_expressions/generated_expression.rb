module Cucumber
  module CucumberExpressions
    class GeneratedExpression
      attr_reader :source, :parameter_names, :parameters

      def initialize(source, parameter_names, parameters)
        @source, @parameter_names, @parameters = source, parameter_names, parameters
      end
    end
  end
end
