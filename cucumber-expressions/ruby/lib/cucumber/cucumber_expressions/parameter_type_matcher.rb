module Cucumber
  module CucumberExpressions
    class ParameterTypeMatcher
      attr_reader :parameter_type

      def initialize(parameter_type, regexp, text, match_position=0, force_full_word=true)
        @parameter_type, @regexp, @text, @force_full_word = parameter_type, regexp, text, force_full_word
        @match = @regexp.match(@text, match_position)
      end

      def advance_to(new_match_position)
        (new_match_position...@text.length).each {|advancedPos|
          matcher = self.class.new(parameter_type, @regexp, @text, advancedPos, @force_full_word)
          if matcher.find && matcher.full_word?
            return matcher
          end
        }

        self.class.new(parameter_type, @regexp, @text, @text.length, @force_full_word)
      end

      def find
        !@match.nil? && !group.empty?
      end

      def full_word?
        !@force_full_word || (space_before_match_or_sentence_start && space_after_match_or_sentence_end)
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

      private

      def space_before_match_or_sentence_start
        match_begin = @match.begin(0)
        match_begin == 0 || @text[match_begin - 1].match(/\s/)
      end

      def space_after_match_or_sentence_end
        match_end = @match.end(0)
        match_end == @text.length || @text[match_end].match(/\s/)
      end
    end
  end
end
