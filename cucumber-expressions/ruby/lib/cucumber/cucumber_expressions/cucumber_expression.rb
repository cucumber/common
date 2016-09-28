require 'cucumber/cucumber_expressions/argument_matcher'
require 'cucumber/cucumber_expressions/transform'

module Cucumber
  module CucumberExpressions
    class CucumberExpression
      PARAMETER_PATTERN = /\{([^}:]+)(:([^}]+))?}/
      OPTIONAL_PATTERN = /\(([^\)]+)\)/

      attr_reader :source

      def initialize(expression, types, transform_lookup)
        @source = expression
        @transforms = []
        regexp = "^"
        type_index = 0
        match = nil
        match_offset = 0

        # Create non-capturing, optional capture groups from parenthesis
        expression = expression.gsub(OPTIONAL_PATTERN, '(?:\1)?')

        loop do
          match = PARAMETER_PATTERN.match(expression, match_offset)
          break if match.nil?

          parameter_name = match[1]
          type_name = match[3]
          type = types.length <= type_index ? nil : types[type_index]
          type_index += 1

          transform = nil
          if (type)
            transform = transform_lookup.lookup_by_type(type)
          end
          if (transform.nil? && type_name)
            transform = transform_lookup.lookup_by_type_name(type_name, false)
          end
          if (transform.nil?)
            transform = transform_lookup.lookup_by_type_name(parameter_name, true)
          end
          if (transform.nil?)
            transform = transform_lookup.create_anonymous_lookup(lambda {|s| s})
          end
          @transforms.push(transform)

          text = expression.slice(match_offset...match.offset(0)[0])
          capture_regexp = "(#{transform.capture_group_regexps[0]})"
          match_offset = match.offset(0)[1]
          regexp += text
          regexp += capture_regexp
        end
        regexp += expression.slice(match_offset..-1)
        regexp += "$"
        @regexp = Regexp.new(regexp)
      end

      def match(text)
        ArgumentMatcher.match_arguments(@regexp, text, @transforms)
      end
    end
  end
end
