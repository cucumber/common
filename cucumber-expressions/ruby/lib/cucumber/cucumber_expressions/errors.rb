# frozen_string_literal: true

module Cucumber
  module CucumberExpressions
    #:nodoc:
    class CucumberExpressionError < StandardError
    end

    # Raised when a parameter is not defined
    class UndefinedParameterTypeError < CucumberExpressionError
      def initialize(type_name)
        super("Undefined parameter type {#{type_name}}")
      end
    end

    # Raised when a regular expression capture group matches multiple parameter types
    class AmbiguousParameterTypeError < CucumberExpressionError
      def initialize(
        parameter_type_regexp,
        expression_regexp,
        parameter_types,
        generated_expressions
      )
        super(<<~MESSAGE)
          Your Regular Expression /#{expression_regexp.source}/
          matches multiple parameter types with regexp /#{parameter_type_regexp}/:
             #{parameter_type_names(parameter_types)}

          I couldn't decide which one to use. You have two options:

          1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:
             #{expressions(generated_expressions)}

          2) Make one of the parameter types preferential and continue to use a Regular Expression.

        MESSAGE
      end

      private

      def parameter_type_names(parameter_types)
        parameter_types.map { |p| "{#{p.name}}" }.join("\n   ")
      end

      def expressions(generated_expressions)
        generated_expressions.map(&:source).join("\n   ")
      end
    end
  end
end
