require 'cucumber/cucumber_expressions/argument_matcher'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      VARIABLE_PATTERN = /\{([^}:]+)(:([^}]+))?}/
      OPTIONAL_PATTERN = /\(([^\)]+)\)/

      attr_reader :regexp

      def initialize(expression, target_types, transform_lookup)

        @transforms = []
        sb = "^"
        type_name_index = 0
        match = nil
        index = 0

        # Create non-capturing, optional capture groups from parenthesis
        expression = expression.gsub(OPTIONAL_PATTERN, '(?:\1)?')

        loop do
          match = VARIABLE_PATTERN.match(expression, index)
          break if match.nil?
          target_type = target_types.length <= type_name_index ? nil : target_types[type_name_index]
          type_name_index += 1
          expression_type_name = match[3]

          transform = nil
          if (expression_type_name)
            transform = transform_lookup.lookup(expression_type_name)
          elsif (!target_type.nil?)
            transform = transform_lookup.lookup(target_type)
          else
            transform = transform_lookup.lookup('string')
          end
          @transforms.push(transform)

          text = expression.slice(index...match.offset(0)[0])
          capture_regexp = "(#{transform.capture_group_regexps[0]})"
          index = match.offset(0)[1]
          sb += text
          sb += capture_regexp
        end
        sb += expression.slice(index..-1)
        sb += "$"
        @regexp = Regexp.new(sb)
      end

      def match(text)
        ArgumentMatcher.match_arguments(@regexp, text, @transforms)
      end
    end
  end
end
