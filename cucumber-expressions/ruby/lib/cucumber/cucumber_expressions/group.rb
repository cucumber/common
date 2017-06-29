module Cucumber
  module CucumberExpressions
    class Group
      attr_reader :children, :start, :end, :value

      def initialize(*args)
        @children = []

        if MatchData === args[0]
          match_data = args[0]
          parse(match_data)
        else
          @start = args[0] || -1
          @end = args[1] || -1
          @value = args[2]
        end
      end

      def contains?(group)
        group.null? || (group.start >= @start && group.end <= @end)
      end

      def add(group)
        @children.push(group)
      end

      def null?
        @value.nil?
      end

      def values
        (children.empty? ? [self] : children).map(&:value)
      end

      private

      def parse(match_data)
        if match_data.length == 1
          @start = @end = -1
          @value = nil
          return
        end

        @start = match_data.offset(0)[0]
        @end = match_data.offset(0)[1]
        @value = match_data[0]

        stack = []
        stack.push(self)

        (1...match_data.length).each do |group_index|
          group = Group.new(
              match_data.offset(group_index)[0],
              match_data.offset(group_index)[1],
              match_data[group_index]
          )
          while !stack.last.contains?(group)
            stack.pop
          end
          stack.last.add(group)
          stack.push(group)
        end
      end
    end
  end
end
