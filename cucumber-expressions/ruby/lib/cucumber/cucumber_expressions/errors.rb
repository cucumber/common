module Cucumber
  module CucumberExpressions
    class CucumberExpressionError < StandardError
    end

    class UndefinedParameterTypeError < CucumberExpressionError
      def initialize(type_name)
        super("Undefined parameter type {#{type_name}}")
      end
    end

    class AmbiguousParameterTypeError < CucumberExpressionError
      def initialize(parameter_type_regexp, expression_regexp, parameter_types, generated_expressions)
        super(<<-EOM)
Your Regular Expression /#{expression_regexp.source}/
matches multiple parameter types with regexp /#{parameter_type_regexp}/:
   #{parameter_type_names(parameter_types)}

I couldn't decide which one to use. You have two options:

1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:
   #{expressions(generated_expressions)}

2) Make one of the parameter types prefer_for_regexp_match and continue to use a Regular Expression.

        EOM
      end

      private

      def parameter_type_names(parameter_types)
        parameter_types.map{|p| "{#{p.name}}"}.join("\n   ")
      end

      def expressions(generated_expressions)
        generated_expressions.map{|ge| ge.source}.join("\n   ")
      end
    end
  end
end
