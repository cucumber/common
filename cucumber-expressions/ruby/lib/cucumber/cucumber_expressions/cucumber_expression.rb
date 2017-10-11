require 'cucumber/cucumber_expressions/argument'
require 'cucumber/cucumber_expressions/tree_regexp'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      PARAMETER_REGEXP = /{([^}]+)}/
      OPTIONAL_REGEXP = /\(([^)]+)\)/
      ALTERNATIVE_WORD_REGEXP = /([[:alpha:]]+)((\/[[:alpha:]]+)+)/

      attr_reader :source

      def initialize(expression, parameter_type_registry)
        @source = expression
        @parameter_types = []
        regexp = '^'
        match_offset = 0

        # Escape Does not include (){} because they have special meaning
        expression = expression.gsub(/([\\\^\[$.|?*+\]])/, '\\\\\1')

        # Create non-capturing, optional capture groups from parenthesis
        expression = expression.gsub(OPTIONAL_REGEXP, '(?:\1)?')

        expression = expression.gsub(ALTERNATIVE_WORD_REGEXP) do |_|
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
