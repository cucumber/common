require 'cucumber/cucumber_expressions/argument_builder'

module Cucumber
  module CucumberExpressions
    class RegularExpression
      CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/

      def initialize(regexp, types, parameter_registry)
        @regexp = regexp
        @parameters = []

        type_index = 0
        match = nil
        match_offset = 0

        loop do
          match = CAPTURE_GROUP_PATTERN.match(regexp.source, match_offset)
          break if match.nil?

          capture_group_pattern = match[1]
          type = types.length <= type_index ? nil : types[type_index]
          type_index += 1

          parameter = nil
          if (type)
            parameter = parameter_registry.lookup_by_type(type)
          end
          if (parameter.nil?)
            parameter = parameter_registry.lookup_by_capture_group_regexp(capture_group_pattern)
          end
          if (parameter.nil?)
            parameter = parameter_registry.create_anonymous_lookup(lambda {|s| s})
          end

          @parameters.push(parameter)
          match_offset = match.offset(0)[1]
        end
      end

      def match(text)
        ArgumentBuilder.build_arguments(@regexp, text, @parameters)
      end

      def source
        @regexp
      end
    end
  end
end
