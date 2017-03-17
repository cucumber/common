require 'cucumber/cucumber_expressions/argument_builder'

module Cucumber
  module CucumberExpressions
    class RegularExpression
      CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/

      def initialize(regexp, types, parameter_type_registry)
        @regexp = regexp
        @parameter_types = []

        type_index = 0
        match = nil
        match_offset = 0

        loop do
          match = CAPTURE_GROUP_PATTERN.match(regexp.source, match_offset)
          break if match.nil?

          capture_group_pattern = match[1]
          type = types.length <= type_index ? nil : types[type_index]
          type_index += 1

          parameter_type = nil
          if (type)
            parameter_type = parameter_type_registry.lookup_by_type(type)
          end
          if (parameter_type.nil?)
            parameter_type = parameter_type_registry.lookup_by_regexp(capture_group_pattern)
          end
          if (parameter_type.nil?)
            parameter_type = parameter_type_registry.create_anonymous_lookup(lambda {|s| s})
          end

          @parameter_types.push(parameter_type)
          match_offset = match.offset(0)[1]
        end
      end

      def match(text)
        ArgumentBuilder.build_arguments(@regexp, text, @parameter_types)
      end

      def source
        @regexp
      end
    end
  end
end
