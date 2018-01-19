require 'cucumber/cucumber_expressions/group_builder'

module Cucumber
  module CucumberExpressions
    class TreeRegexp
      REGEXP_CHARS = ['#', '$', '(', ')', '*', '+', '.', '?', '[', '\\', '^', '{', '|']

      attr_reader :regexp, :group_builder

      def initialize(regexp)
        @regexp = regexp.is_a?(Regexp) ? regexp : Regexp.new(regexp)

        stack = [GroupBuilder.new]
        group_start_stack = []
        last = nil
        escaping = false
        non_capturing_maybe = false
        @regexp.source.split('').each_with_index do |c, n|
          if escaping && regexp_char?(c)
            escaping = false
          elsif c == '\\'
            escaping = true
          elsif c == '(' && !escaping
            stack.push(GroupBuilder.new)
            group_start_stack.push(n+1)
            non_capturing_maybe = false
          elsif c == ')' && !escaping
            gb = stack.pop
            group_start = group_start_stack.pop
            if gb.capturing?
              gb.source = @regexp.source[group_start...n]
              stack.last.add(gb)
            else
              gb.move_children_to(stack.last)
            end
            non_capturing_maybe = false
          elsif c == '?' && last == '('
            non_capturing_maybe = true
          elsif c == ':' && non_capturing_maybe
            stack.last.set_non_capturing!
            non_capturing_maybe = false
          end
          last = c
        end
        @group_builder = stack.pop
      end

      def regexp_char?(c)
        REGEXP_CHARS.include?(c)
      end

      def match(s)
        match = @regexp.match(s)
        return nil if match.nil?
        group_indices = (0..match.length).to_a.to_enum
        @group_builder.build(match, group_indices)
      end

    end
  end
end
