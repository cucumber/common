require 'cucumber/cucumber_expressions/argument_builder'
require 'cucumber/cucumber_expressions/parameter'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      PARAMETER_PATTERN = /\{([^}:]+)(:([^}]+))?}/
      OPTIONAL_PATTERN = /\(([^)]+)\)/

      attr_reader :source

      def initialize(expression, types, parameter_registry)
        @source = expression
        @parameters = []
        regexp = "^"
        type_index = 0
        match = nil
        match_offset = 0

        # Does not include (){} because they have special meaning
        expression = expression.gsub(/([\\\^\[$.|?*+\]])/, '\\\\\1')

        # Create non-capturing, optional capture groups from parenthesis
        expression = expression.gsub(OPTIONAL_PATTERN, '(?:\1)?')

        loop do
          match = PARAMETER_PATTERN.match(expression, match_offset)
          break if match.nil?

          parameter_name = match[1]
          type_name = match[3]
          type = types.length <= type_index ? nil : types[type_index]
          type_index += 1

          parameter = nil
          if type
            parameter = parameter_registry.lookup_by_type(type)
          end
          if parameter.nil? && type_name
            parameter = parameter_registry.lookup_by_type_name(type_name, false)
          end
          if parameter.nil?
            parameter = parameter_registry.lookup_by_type_name(parameter_name, true)
          end
          if parameter.nil?
            parameter = parameter_registry.create_anonymous_lookup(lambda {|s| s})
          end
          @parameters.push(parameter)

          text = expression.slice(match_offset...match.offset(0)[0])
          capture_regexp = capture_group_regexp(parameter.capture_group_regexps)
          match_offset = match.offset(0)[1]
          regexp += text
          regexp += capture_regexp
        end
        regexp += expression.slice(match_offset..-1)
        regexp += "$"
        @regexp = Regexp.new(regexp)
      end

      def match(text)
        ArgumentBuilder.build_arguments(@regexp, text, @parameters)
      end

      private

      def capture_group_regexp(capture_group_regexps)
        return "(#{capture_group_regexps[0]})" if capture_group_regexps.size == 1
        capture_groups = capture_group_regexps.map { |group| "(?:#{group})" }
        "(#{capture_groups.join('|')})"
      end
    end
  end
end
