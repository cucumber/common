require 'cucumber/tag_expressions/expressions.rb'

# Array monkey-patch
class Array
  alias peek last

  def pop!(n = 1)
    result = pop(n)
    raise('Empty stack') if result.size != n
    n == 1 ? result.first : result
  end
end

module Cucumber
  module TagExpressions
    # Ruby tag expression parser
    class Parser
      def initialize
        @expressions = []
        @operations = []

        @components = {
          'or'  => { type: :operation,   precedence: 0, assoc: :left },
          'and' => { type: :operation,   precedence: 1, assoc: :left },
          'not' => { type: :operation,   precedence: 2, assoc: :right },
          ')'   => { type: :close_paren, precedence: -1 },
          '('   => { type: :open_paren,  precedence: 1 }
        }
      end

      def parse(infix_expression)
        process_tokens!(infix_expression)
        while @operations.any?
          raise 'Unclosed (' if @operations.peek == '('
          push_expression(@operations.pop!)
        end
        expression = @expressions.pop!
        @expressions.empty? ? expression : raise('Not empty')
      end

      private

      ############################################################################
      # Helpers
      #
      def assoc_of(token, value)
        @components[token][:assoc] == value
      end

      def lower_precedence?(operation)
        (assoc_of(operation, :left) &&
         prec(operation) <= prec(@operations.peek)) ||
          (assoc_of(operation, :right) &&
           prec(operation) < prec(@operations.peek))
      end

      def operation?(token)
        @components[token][:type] == :operation
      end

      def prec(token)
        @components[token][:precedence]
      end

      def tokens(infix_expression)
        infix_expression.gsub(/\(/, ' ( ').gsub(/\)/, ' ) ').strip.split(/\s+/)
      end

      def process_tokens!(infix_expression)
        tokens(infix_expression).each do |token|
          if @components[token]
            send("handle_#{@components[token][:type]}", token)
          else
            handle_literal(token)
          end
        end
      end

      def push_expression(token)
        case token
        when 'and'
          @expressions.push(And.new(*@expressions.pop!(2)))
        when 'or'
          @expressions.push(Or.new(*@expressions.pop!(2)))
        when 'not'
          @expressions.push(Not.new(@expressions.pop!))
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
        while @operations.any? && operation?(@operations.peek) &&
              lower_precedence?(token)
          push_expression(@operations.pop!)
        end
        @operations.push(token)
      end

      def handle_close_paren(_token)
        while @operations.any? && @operations.peek != '('
          push_expression(@operations.pop!)
        end
        raise 'Unclosed (' if @operations.empty?
        @operations.pop! if @operations.peek == '('
      end

      def handle_open_paren(token)
        @operations.push(token)
      end
    end
  end
end
