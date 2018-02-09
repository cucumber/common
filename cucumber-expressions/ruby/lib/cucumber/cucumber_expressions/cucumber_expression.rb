require 'cucumber/cucumber_expressions/argument'
require 'cucumber/cucumber_expressions/tree_regexp'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      # Does not include (){} characters because they have special meaning
      ESCAPE_REGEXP = /([\\^\[$.|?*+\]])/
      PARAMETER_REGEXP = /{([^}]+)}/
      # Parentheses will be double-escaped due to ESCAPE_REGEXP
      OPTIONAL_REGEXP = /([\\][\\])?\(([^)]+)\)/
      ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = /([^\s^\/]+)((\/[^\s^\/]+)+)/

      attr_reader :source

      def initialize(expression, parameter_type_registry)
        @source = expression
        @parameter_types = []
        regexp = '^'
        match_offset = 0

        # This will cause explicitly-escaped parentheses to be double-escaped
        expression = expression.gsub(ESCAPE_REGEXP, '\\\\\1')

        # Create non-capturing, optional capture groups from parenthesis
        expression = expression.gsub(OPTIONAL_REGEXP) do |match|
          # look for double-escaped parentheses
          if $1 == '\\\\'
            "\\(#{$2}\\)"
          else
            "(?:#{$2})?"
          end
        end

        expression = expression.gsub(ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP) do |_|
          "(?:#{$1}#{$2.tr('/', '|')})"
        end

        loop do
          match = PARAMETER_REGEXP.match(expression, match_offset)
          break if match.nil?

          type_name = match[1]

          parameter_type = parameter_type_registry.lookup_by_type_name(type_name)
          raise UndefinedParameterTypeError.new(type_name) if parameter_type.nil?
          @parameter_types.push(parameter_type)

          text = expression.slice(match_offset...match.offset(0)[0])
          capture_regexp = build_capture_regexp(parameter_type.regexps)
          match_offset = match.offset(0)[1]
          regexp += text
          regexp += capture_regexp
        end
        regexp += expression.slice(match_offset..-1)
        regexp += '$'
        @tree_regexp = TreeRegexp.new(regexp)
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

      def build_capture_regexp(regexps)
        return "(#{regexps[0]})" if regexps.size == 1
        capture_groups = regexps.map { |group| "(?:#{group})" }
        "(#{capture_groups.join('|')})"
      end
    end
  end
end
