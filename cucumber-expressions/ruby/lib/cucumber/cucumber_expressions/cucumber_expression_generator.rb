require 'cucumber/cucumber_expressions/transform_matcher'
require 'cucumber/cucumber_expressions/generated_expression'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionGenerator
      def initialize(transform_lookup)
        @transform_lookup = transform_lookup
      end

      def generate_expression(text)
        argument_names = []
        transform_matchers = create_transform_matchers(text)
        transforms = []
        usage_by_type_name = Hash.new(0)

        expression = ""
        pos = 0

        loop do
          matching_transform_matchers = []
          transform_matchers.each do |transform_matcher|
            advanced_transform_matcher = transform_matcher.advance_to(pos)
            if advanced_transform_matcher.find
              matching_transform_matchers.push(advanced_transform_matcher)
            end
          end

          if matching_transform_matchers.any?
            matching_transform_matchers = matching_transform_matchers.sort
            best_transform_matcher = matching_transform_matchers[0]
            transform = best_transform_matcher.transform
            transforms.push(transform)

            argument_name = get_argument_name(transform.type_name, usage_by_type_name)
            argument_names.push(argument_name)

            expression += text.slice(pos...best_transform_matcher.start)
            expression += "{#{transform.type_name}}"

            pos = best_transform_matcher.start + best_transform_matcher.group.length
          else
            break
          end

          if pos >= text.length
            break
          end
        end

        expression += text.slice(pos..-1)
        GeneratedExpression.new(expression, argument_names, transforms)
      end

    private

      def get_argument_name(type_name, usage_by_type_name)
        count = (usage_by_type_name[type_name] += 1)
        count == 1 ? type_name : "#{type_name}#{count}"
      end

      def create_transform_matchers(text)
        transform_matchers = []
        @transform_lookup.transforms.each do |transform|
          transform_matchers += create_transform_matchers2(transform, text)
        end
        transform_matchers
      end

      def create_transform_matchers2(transform, text)
        result = []
        capture_group_regexps = transform.capture_group_regexps
        capture_group_regexps.each do |capture_group_regexp|
          regexp = Regexp.new("(#{capture_group_regexp})")
          result.push(TransformMatcher.new(transform, regexp, text))
        end
        result
      end

    end
  end
end
