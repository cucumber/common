module Cucumber
  module CucumberExpressions
    class ParameterTypeMatcher
      attr_reader :parameter_type

      def initialize(parameter_type, regexp, text, match_position=0)
        @parameter_type, @regexp, @text = parameter_type, regexp, text
        @match = @regexp.match(@text, match_position)
      end

      def advance_to(new_match_position)
        (new_match_position...@text.length).each {|advancedPos|
          matcher = self.class.new(parameter_type, @regexp, @text, advancedPos)
          if matcher.find
            return matcher
          end
        }

        self.class.new(parameter_type, @regexp, @text, @text.length)
      end

      def find
        !@match.nil? && !group.empty?
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
