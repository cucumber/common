require 'cucumber/tag_expressions/expressions.rb'

module Cucumber
  module TagExpressions
    # Ruby tag expression parser
    class Parser
      def initialize
        @expressions = []
        @operators = []

        @operator_types = {
          'or'  => { type: :operation,   precedence: 0, assoc: :left },
          'and' => { type: :operation,   precedence: 1, assoc: :left },
          'not' => { type: :operation,   precedence: 2, assoc: :right },
          ')'   => { type: :close_paren, precedence: -1 },
          '('   => { type: :open_paren,  precedence: 1 }
        }
      end

      def parse(infix_expression)
        process_tokens!(infix_expression)
        while @operators.any?
          raise 'Unclosed (' if @operators.last == '('
          push_expression(pop(@operators))
        end
        expression = pop(@expressions)
        @expressions.empty? ? expression : raise('Not empty')
      end

      private

      ############################################################################
      # Helpers
      #
      def assoc_of(token, value)
        @operator_types[token][:assoc] == value
      end

      def lower_precedence?(operation)
        (assoc_of(operation, :left) &&
         precedence(operation) <= precedence(@operators.last)) ||
          (assoc_of(operation, :right) &&
           precedence(operation) < precedence(@operators.last))
      end

      def operator?(token)
        @operator_types[token][:type] == :operation
      end

      def precedence(token)
        @operator_types[token][:precedence]
      end

      def tokens(infix_expression)
        infix_expression.gsub(/(?<!\\)\(/, ' ( ').gsub(/(?<!\\)\)/, ' ) ').strip.split(/\s+/)
      end

      def process_tokens!(infix_expression)
        tokens(infix_expression).each do |token|
          if @operator_types[token]
            send("handle_#{@operator_types[token][:type]}", token)
          else
            handle_literal(token)
          end
        end
      end

      def push_expression(token)
        case token
        when 'and'
          @expressions.push(And.new(*pop(@expressions, 2)))
        when 'or'
          @expressions.push(Or.new(*pop(@expressions, 2)))
        when 'not'
          @expressions.push(Not.new(pop(@expressions)))
        else
          @expressions.push(Literal.new(token))
        end
      end

      ############################################################################
      # Handlers
      #
      def handle_literal(token)
        push_expression(token)
      end

      def handle_operation(token)
        while @operators.any? && operator?(@operators.last) &&
              lower_precedence?(token)
          push_expression(pop(@operators))
        end
        @operators.push(token)
      end

      def handle_close_paren(_token)
        while @operators.any? && @operators.last != '('
          push_expression(pop(@operators))
        end
        raise 'Unclosed (' if @operators.empty?
        pop(@operators) if @operators.last == '('
      end

      def handle_open_paren(token)
        @operators.push(token)
      end

      def pop(array, n = 1)
        result = array.pop(n)
        raise('Empty stack') if result.size != n
        n == 1 ? result.first : result
      end
    end
  end
end
