require 'cucumber/cucumber_expressions/argument_builder'
require 'cucumber/cucumber_expressions/parameter_type'

module Cucumber
  module CucumberExpressions
    class RegularExpression
      CAPTURE_GROUP_PATTERN = /\((?!\?:)([^(]+)\)/

      def initialize(expression_regexp, parameter_type_registry)
        @expression_regexp = expression_regexp
        @parameter_type_registry = parameter_type_registry
      end

      def match(text)
        parameter_types = []

        match_offset = 0

        loop do
          match = CAPTURE_GROUP_PATTERN.match(@expression_regexp.source, match_offset)
          break if match.nil?
          match_offset = match.offset(0)[1]

          parameter_type_regexp = match[1]

          parameter_type = @parameter_type_registry.lookup_by_regexp(parameter_type_regexp, @expression_regexp, text)
          if parameter_type.nil?
            parameter_type = ParameterType.new(
                '*',
                String,
                parameter_type_regexp,
                false,
                lambda {|s| s}
            )
          end

          parameter_types.push(parameter_type)
        end

        ArgumentBuilder.build_arguments(@expression_regexp, text, parameter_types)
      end

      def source
        @expression_regexp
      end
    end
  end
end
