require 'cucumber/cucumber_expressions/argument_builder'
require 'cucumber/cucumber_expressions/parameter_type'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      PARAMETER_REGEXP = /\{([^}]+)}/
      OPTIONAL_REGEXP = /\(([^)]+)\)/
      ALTERNATIVE_WORD_REGEXP = /([[:alpha:]]+)((\/[[:alpha:]]+)+)/

      attr_reader :source

      def initialize(expression, types, parameter_type_registry)
        @source = expression
        @parameter_types = []
        regexp = "^"
        type_index = 0
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

          parameter_name = match[1]

          type = types.length <= type_index ? nil : types[type_index]
          type_index += 1

          parameter_type = nil
          if type
            parameter_type = parameter_type_registry.lookup_by_type(type)
          end
          if parameter_type.nil?
            parameter_type = parameter_type_registry.lookup_by_name(parameter_name)
          end
          if parameter_type.nil?
            parameter_type = parameter_type_registry.create_anonymous_lookup(lambda {|s| s})
          end
          @parameter_types.push(parameter_type)

          text = expression.slice(match_offset...match.offset(0)[0])
          capture_regexp = regexp(parameter_type.regexps)
          match_offset = match.offset(0)[1]
          regexp += text
          regexp += capture_regexp
        end
        regexp += expression.slice(match_offset..-1)
        regexp += "$"
        @regexp = Regexp.new(regexp)
      end

      def match(text)
        ArgumentBuilder.build_arguments(@regexp, text, @parameter_types)
      end

      private

      def regexp(regexps)
        return "(#{regexps[0]})" if regexps.size == 1
        capture_groups = regexps.map { |group| "(?:#{group})" }
        "(#{capture_groups.join('|')})"
      end
    end
  end
end
