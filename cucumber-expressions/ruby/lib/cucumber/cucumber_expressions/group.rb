# frozen_string_literal: true

module Cucumber
  module CucumberExpressions
    # A nested capture group
    class Group
      attr_reader :value, :start, :end, :children

      def initialize(value, start, end_, children)
        @value = value
        @start = start
        @end = end_
        @children = children
      end

      def values
        (children.empty? ? [self] : children).map(&:value).compact
      end
    end
  end
end
