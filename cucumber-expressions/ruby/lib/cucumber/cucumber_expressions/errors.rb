require 'cucumber/cucumber_expressions/ast'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionError < StandardError

      def build_message(
          index,
          expression,
          pointer,
          problem,
          solution
      )
        m = <<-EOF
This Cucumber Expression has a problem at column #{index + 1}:

#{expression}
#{pointer}
#{problem}.
#{solution}
        EOF
        m.strip
      end

      def pointAt(index)
        ' ' * index + '^'
      end

      def pointAtLocated(node)
        pointer = [pointAt(node.start)]
        if node.start + 1 < node.end
          for _ in node.start + 1...node.end - 2
            pointer.push('-')
          end
          pointer.push('^')
        end
        pointer.join('')
      end

    end

    class CantEscape < CucumberExpressionError
      def initialize(expression, index)
        super(build_message(
                  index,
                  expression,
                  pointAt(index),
                  "Only the characters '{', '}', '(', ')', '\\', '/' and whitespace can be escaped",
                  "If you did mean to use an '\\' you can use '\\\\' to escape it"
              ))
      end
    end

    class TheEndOfLineCannotBeEscaped < CucumberExpressionError
      def initialize(expression)
        index = expression.codepoints.length - 1
        super(build_message(
                  index,
                  expression,
                  pointAt(index),
                  'The end of line can not be escaped',
                  "You can use '\\\\' to escape the the '\\'"
              ))
      end
    end

    class MissingEndToken < CucumberExpressionError
      def initialize(expression, beginToken, endToken, current)
        beginSymbol = Token::symbolOf(beginToken)
        endSymbol = Token::symbolOf(endToken)
        purpose = Token::purposeOf(beginToken)
        super(build_message(
                  current.start,
                  expression,
                  pointAtLocated(current),
                  "The '#{beginSymbol}' does not have a matching '#{endSymbol}'",
                  "If you did not intend to use #{purpose} you can use '\\#{beginSymbol}' to escape the #{purpose}"
              ))
      end
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

2) Make one of the parameter types preferential and continue to use a Regular Expression.

        EOM
      end

      private

      def parameter_type_names(parameter_types)
        parameter_types.map { |p| "{#{p.name}}" }.join("\n   ")
      end

      def expressions(generated_expressions)
        generated_expressions.map { |ge| ge.source }.join("\n   ")
      end
    end
  end
end
