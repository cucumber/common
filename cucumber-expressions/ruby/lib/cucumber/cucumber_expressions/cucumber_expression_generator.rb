require 'cucumber/cucumber_expressions/parameter_type_matcher'
require 'cucumber/cucumber_expressions/generated_expression'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionGenerator
      def initialize(parameter_type_registry)
        @parameter_type_registry = parameter_type_registry
      end

      def generate_expression(text)
        parameter_names = []
        parameter_type_matchers = create_parameter_type_matchers(text)
        parameter_types = []
        usage_by_name = Hash.new(0)

        expression = ""
        pos = 0

        loop do
          matching_parameter_type_matchers = []
          parameter_type_matchers.each do |parameter_type_matcher|
            advanced_parameter_type_matcher = parameter_type_matcher.advance_to(pos)
            if advanced_parameter_type_matcher.find
              matching_parameter_type_matchers.push(advanced_parameter_type_matcher)
            end
          end

          if matching_parameter_type_matchers.any?
            matching_parameter_type_matchers = matching_parameter_type_matchers.sort
            best_parameter_type_matcher = matching_parameter_type_matchers[0]
            parameter_type = best_parameter_type_matcher.parameter
            parameter_types.push(parameter_type)

            parameter_name = get_parameter_name(parameter_type.name, usage_by_name)
            parameter_names.push(parameter_name)

            expression += text.slice(pos...best_parameter_type_matcher.start)
            expression += "{#{parameter_type.name}}"

            pos = best_parameter_type_matcher.start + best_parameter_type_matcher.group.length
          else
            break
          end

          if pos >= text.length
            break
          end
        end

        expression += text.slice(pos..-1)
        GeneratedExpression.new(expression, parameter_names, parameter_types)
      end

    private

      def get_parameter_name(name, usage_by_name)
        count = (usage_by_name[name] += 1)
        count == 1 ? name : "#{name}#{count}"
      end

      def create_parameter_type_matchers(text)
        parameter_matchers = []
        @parameter_type_registry.parameter_types.each do |parameter_type|
          parameter_matchers += create_parameter_type_matchers2(parameter_type, text)
        end
        parameter_matchers
      end

      def create_parameter_type_matchers2(parameter_type, text)
        result = []
        regexps = parameter_type.regexps
        regexps.each do |regexp|
          regexp = Regexp.new("(#{regexp})")
          result.push(ParameterTypeMatcher.new(parameter_type, regexp, text))
        end
        result
      end

    end
  end
end
