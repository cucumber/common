module Cucumber
  module CucumberExpressions
    class ParameterTypeMatcher
      attr_reader :parameter

      def initialize(parameter, regexp, text, match_position=0)
        @parameter, @regexp, @text = parameter, regexp, text
        @match = @regexp.match(@text, match_position)
      end

      def advance_to(new_match_position)
        self.class.new(parameter, @regexp, @text, new_match_position)
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
