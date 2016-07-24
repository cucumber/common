require 'cucumber/cucumber_expressions/argument_matcher'

module Cucumber
  module CucumberExpressions
    class RegularExpression
      CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/

      attr_reader :regexp

      def initialize(regexp, transform_lookup)
        @regexp = regexp
        @transforms = []

        match = nil
        index = 0

        loop do
          match = CAPTURE_GROUP_PATTERN.match(regexp.source, index)
          break if match.nil?

          capture_group_pattern = match[1]
          transform = transform_lookup.lookup_by_capture_group_regexp(capture_group_pattern)
          transform = transform_lookup.lookup('string') if transform.nil?
          @transforms.push(transform)

          index = match.offset(0)[1]
        end
      end

      def match(text)
        ArgumentMatcher.match_arguments(@regexp, text, @transforms)
      end
    end
  end
end
