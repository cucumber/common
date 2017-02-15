require 'cucumber/cucumber_expressions/parameter_matcher'
require 'cucumber/cucumber_expressions/generated_expression'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionGenerator
      def initialize(parameter_registry)
        @parameter_registry = parameter_registry
      end

      def generate_expression(text)
        argument_names = []
        parameter_matchers = create_parameter_matchers(text)
        parameters = []
        usage_by_type_name = Hash.new(0)

        expression = ""
        pos = 0

        loop do
          matching_parameter_matchers = []
          parameter_matchers.each do |parameter_matcher|
            advanced_parameter_matcher = parameter_matcher.advance_to(pos)
            if advanced_parameter_matcher.find
              matching_parameter_matchers.push(advanced_parameter_matcher)
            end
          end

          if matching_parameter_matchers.any?
            matching_parameter_matchers = matching_parameter_matchers.sort
            best_parameter_matcher = matching_parameter_matchers[0]
            parameter = best_parameter_matcher.parameter
            parameters.push(parameter)

            argument_name = get_argument_name(parameter.type_name, usage_by_type_name)
            argument_names.push(argument_name)

            expression += text.slice(pos...best_parameter_matcher.start)
            expression += "{#{parameter.type_name}}"

            pos = best_parameter_matcher.start + best_parameter_matcher.group.length
          else
            break
          end

          if pos >= text.length
            break
          end
        end

        expression += text.slice(pos..-1)
        GeneratedExpression.new(expression, argument_names, parameters)
      end

    private

      def get_argument_name(type_name, usage_by_type_name)
        count = (usage_by_type_name[type_name] += 1)
        count == 1 ? type_name : "#{type_name}#{count}"
      end

      def create_parameter_matchers(text)
        parameter_matchers = []
        @parameter_registry.parameters.each do |parameter|
          parameter_matchers += create_parameter_matchers2(parameter, text)
        end
        parameter_matchers
      end

      def create_parameter_matchers2(parameter, text)
        result = []
        capture_group_regexps = parameter.capture_group_regexps
        capture_group_regexps.each do |capture_group_regexp|
          regexp = Regexp.new("(#{capture_group_regexp})")
          result.push(ParameterMatcher.new(parameter, regexp, text))
        end
        result
      end

    end
  end
end
