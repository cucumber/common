require 'cucumber/cucumber_expressions/argument_matcher'

module Cucumber
  module CucumberExpressions
    class RegularExpression
      CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/

      def initialize(regexp, types, transform_lookup)
        @regexp = regexp
        @transforms = []

        type_index = 0
        match = nil
        match_offset = 0

        loop do
          match = CAPTURE_GROUP_PATTERN.match(regexp.source, match_offset)
          break if match.nil?

          capture_group_pattern = match[1]
          type = types.length <= type_index ? nil : types[type_index]
          type_index += 1

          transform = nil
          if (type)
            transform = transform_lookup.lookup_by_type(type)
          end
          if (transform.nil?)
            transform = transform_lookup.lookup_by_capture_group_regexp(capture_group_pattern)
          end
          if (transform.nil?)
            transform = transform_lookup.create_anonymous_lookup(lambda {|s| s})
          end

          @transforms.push(transform)
          match_offset = match.offset(0)[1]
        end
      end

      def match(text)
        ArgumentMatcher.match_arguments(@regexp, text, @transforms)
      end
    end
  end
end
