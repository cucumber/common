require 'cucumber/cucumber_expressions/group_builder'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class TreeRegexp
      attr_reader :regexp, :group_builder

      def initialize(regexp)
        @regexp = regexp.is_a?(Regexp) ? regexp : Regexp.new(regexp)
        @group_builder = create_group_builder(@regexp)
      end

      private def is_non_capturing(source, i)
        # Regex is valid. Bounds check not required.
        i = i + 1
        next_char = source[i]
        if next_char != '?'
          # (X)
          return false
        end

        i = i + 1
        next_char = source[i]
        if next_char != '<'
          # (?:X)
          # (?idmsuxU-idmsuxU)
          # (?idmsux-idmsux:X)
          # (?=X)
          # (?!X)
          # (?>X)
          return true
        end

        i = i + 1
        next_char = source[i]
        if next_char == '=' || next_char == '!'
          # (?<=X)
          # (?<!X)
          return true
        end

        # (?<name>X)
        raise CucumberExpressionError.new("Named capture groups are not supported. See https://github.com/cucumber/cucumber/issues/329")
      end

      def match(s)
        match = @regexp.match(s)
        return nil if match.nil?
        group_indices = (0..match.length).to_a.to_enum
        @group_builder.build(match, group_indices)
      end

      private def create_group_builder(regexp)
        source = regexp.source
        stack = [GroupBuilder.new]
        group_start_stack = []
        escaping = false
        char_class = false
        source.each_char.with_index do |c, i|
          if c == '[' && !escaping
            char_class = true
          elsif c == ']' && !escaping
            char_class = false
          elsif c == '(' && !escaping && !char_class
            group_start_stack.push(i)
            group_builder = GroupBuilder.new
            non_capturing = is_non_capturing(source, i)
            if non_capturing
              group_builder.set_non_capturing!
            end
            stack.push(group_builder)
          elsif c == ')' && !escaping && !char_class
            gb = stack.pop
            group_start = group_start_stack.pop + 1
            if gb.capturing?
              gb.source = source[group_start...i]
              stack.last.add(gb)
            else
              gb.move_children_to(stack.last)
            end
          end
          escaping = c == '\\' && !escaping
        end
        stack.pop
      end
    end
  end
end
