require 'cucumber/cucumber_expressions/transform_matcher'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionGenerator
      def initialize(transform_lookup)
        @transform_lookup = transform_lookup
      end

      def generate_expression(text, typed)
        transform_matchers = create_transform_matchers(text)
        transforms = []

        expression = ""
        arg_counter = 0
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
            transforms.push(best_transform_matcher.transform)

            expression += text.slice(pos...best_transform_matcher.start)
            expression += "{arg#{arg_counter += 1}"

            if typed
              expression += ":#{best_transform_matcher.transform.type_name}"
            end
            expression += "}"
            pos = best_transform_matcher.start + best_transform_matcher.group.length
          else
            break
          end

          if pos >= text.length
            break
          end
        end

        expression += text.slice(pos..-1)
        expression
      end

    private

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
