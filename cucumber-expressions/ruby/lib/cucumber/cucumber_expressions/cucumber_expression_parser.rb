require 'cucumber/cucumber_expressions/ast'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class CucumberExpressionParser
      def parse(expression)
        token = Token.new(TokenType::Text, expression, 0, expression.length)
        Node.new(NodeType::Expression, nil, token.text, token.start, token.end)
      end
    end
  end
end
