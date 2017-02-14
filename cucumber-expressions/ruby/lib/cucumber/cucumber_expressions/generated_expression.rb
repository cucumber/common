module Cucumber
  module CucumberExpressions
    class GeneratedExpression
      attr_reader :source, :argument_names, :parameters

      def initialize(source, argument_names, parameters)
        @source, @argument_names, @parameters = source, argument_names, parameters
      end
    end
  end
end
