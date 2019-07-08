require 'cucumber/cucumber_expressions/group_builder'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class TreeRegexp
      attr_reader :regexp, :group_builder

      def initialize(regexp)
        @regexp = regexp.is_a?(Regexp) ? regexp : Regexp.new(regexp)
        @stack = [GroupBuilder.new]
        group_start_stack = []
        last = nil
        escaping = false
        @non_capturing_maybe = false
        @name_capturing_maybe = false
        char_class = false

        @regexp.source.each_char.with_index do |c, n|
          if c == '[' && !escaping
            char_class = true
          elsif c == ']' && !escaping
            char_class = false
          elsif c == '(' && !escaping && !char_class
            @stack.push(GroupBuilder.new)
            group_start_stack.push(n+1)
            @non_capturing_maybe = false
          elsif c == ')' && !escaping && !char_class
            gb = @stack.pop
            group_start = group_start_stack.pop
            if gb.capturing?
              gb.source = @regexp.source[group_start...n]
              @stack.last.add(gb)
            else
              gb.move_children_to(@stack.last)
            end
            end_group()
          elsif c == '?' && last == '('
            @non_capturing_maybe = true
          elsif (c == '<') && @non_capturing_maybe
            @name_capturing_maybe = true
          elsif (c == ':' || c == '!' || c == '=') && last == '?' && @non_capturing_maybe
            end_non_capturing_group()
          elsif (c == '=' || c == '!') && last == '<' && @name_capturing_maybe
            end_non_capturing_group()
          elsif @name_capturing_maybe
            raise CucumberExpressionError.new("Named capture groups are not supported. See https://github.com/cucumber/cucumber/issues/329")
          end

          escaping = c == '\\' && !escaping
          last = c
        end
        @group_builder = @stack.pop
      end

      def match(s)
        match = @regexp.match(s)
        return nil if match.nil?
        group_indices = (0..match.length).to_a.to_enum
        @group_builder.build(match, group_indices)
      end

      private

      def end_non_capturing_group
        @stack.last.set_non_capturing!
        end_group()
      end

      def end_group
        @non_capturing_maybe = false
        @name_capturing_maybe = false
      end
    end
  end
end
