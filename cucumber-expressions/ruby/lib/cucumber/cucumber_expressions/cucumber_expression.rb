require 'cucumber/cucumber_expressions/argument'
require 'cucumber/cucumber_expressions/tree_regexp'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      # Does not include (){} characters because they have special meaning
      ESCAPE_REGEXP = /([\\^\[$.|?*+\]])/
      PARAMETER_REGEXP = /(\\\\)?{([^}]+)}/
      OPTIONAL_REGEXP = /(\\\\)?\(([^)]+)\)/
      ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = /([^\s^\/]+)((\/[^\s^\/]+)+)/
      DOUBLE_ESCAPE = '\\\\'
      PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = 'Parameter types cannot be alternative: '
      PARAMETER_TYPES_CANNOT_BE_OPTIONAL = 'Parameter types cannot be optional: '

      attr_reader :source

      def initialize(expression, parameter_type_registry)
        @source = expression
        @parameter_types = []
        
        expression = process_escapes(expression)
        expression = process_optional(expression)
        expression = process_alternation(expression)
        expression = process_parameters(expression, parameter_type_registry)
        expression = "^#{expression}$"

        @tree_regexp = TreeRegexp.new(expression)
      end

      def match(text)
        Argument.build(@tree_regexp, text, @parameter_types)
      end

      def regexp
        @tree_regexp.regexp
      end

      def to_s
        @source.inspect
      end

      private

      def process_escapes(expression)
        expression.gsub(ESCAPE_REGEXP, '\\\\\1')
      end

      def process_optional(expression)
        # Create non-capturing, optional capture groups from parenthesis
        expression.gsub(OPTIONAL_REGEXP) do
          g2 = $2
          check_no_parameter_type(g2, PARAMETER_TYPES_CANNOT_BE_OPTIONAL)
          # look for double-escaped parentheses
          $1 == DOUBLE_ESCAPE ? "\\(#{g2}\\)" : "(?:#{g2})?"
        end
      end

      def process_alternation(expression)
        expression.gsub(ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP) do
          # replace \/ with /
          # replace / with |
          replacement = $&.tr('/', '|').gsub(/\\\|/, '/')
          if replacement.include?('|')
            replacement.split(/\|/).each do |part|
              check_no_parameter_type(part, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE)
            end
            "(?:#{replacement})"
          else
            replacement
          end
        end
      end

      def process_parameters(expression, parameter_type_registry)
        # Create non-capturing, optional capture groups from parenthesis
        expression.gsub(PARAMETER_REGEXP) do
          if ($1 == DOUBLE_ESCAPE)
            "\\{#{$2}\\}"
          else
            type_name = $2
            ParameterType.check_parameter_type_name(type_name)
            parameter_type = parameter_type_registry.lookup_by_type_name(type_name)
            raise UndefinedParameterTypeError.new(type_name) if parameter_type.nil?
            @parameter_types.push(parameter_type)

            build_capture_regexp(parameter_type.regexps)
          end
        end
      end

      def build_capture_regexp(regexps)
        return "(#{regexps[0]})" if regexps.size == 1
        capture_groups = regexps.map { |group| "(?:#{group})" }
        "(#{capture_groups.join('|')})"
      end

      def check_no_parameter_type(s, message)
        if PARAMETER_REGEXP =~ s
          raise CucumberExpressionError.new("#{message}#{source}")
        end
      end
    end
  end
end
