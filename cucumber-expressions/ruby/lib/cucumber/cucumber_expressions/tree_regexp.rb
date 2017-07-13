require 'cucumber/cucumber_expressions/group_builder'

module Cucumber
  module CucumberExpressions
    class TreeRegexp
      attr_reader :regexp

      def initialize(regexp)
        @regexp = regexp.is_a?(Regexp) ? regexp : Regexp.new(regexp)

        stack = [GroupBuilder.new]
        last = nil
        non_capturing_maybe = false
        @regexp.source.split('').each do |c|
          if c == '(' && last != '\\'
            stack.push(GroupBuilder.new)
          elsif c == ')' && last != '\\'
            gb = stack.pop
            if gb.capturing?
              stack.last.add(gb)
            else
              gb.move_children_to(stack.last)
            end
          elsif c == '?' && last == '('
            non_capturing_maybe = true
          elsif c == ':' && non_capturing_maybe
            stack.last.set_non_capturing!
          end
          last = c
        end
        @group_builder = stack.pop
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
