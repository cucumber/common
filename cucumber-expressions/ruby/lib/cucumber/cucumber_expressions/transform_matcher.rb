require 'cucumber/cucumber_expressions/transform_matcher'

module Cucumber
  module CucumberExpressions
    class TransformMatcher
      attr_reader :transform

      def initialize(transform, regexp, text, match_position=0)
        @transform, @regexp, @text = transform, regexp, text
        @match = @regexp.match(@text, match_position)
      end

      def advance_to(new_match_position)
        self.class.new(@transform, @regexp, @text, new_match_position)
      end

      def find
        !@match.nil?
      end

      def start
        @match.begin(0)
      end

      def group
        @match.captures[0]
      end

      def <=>(other)
        pos_comparison = start <=> other.start
        return pos_comparison if pos_comparison != 0
        length_comparison = other.group.length <=> group.length
        return length_comparison if length_comparison != 0
        0
      end
    end
  end
end
