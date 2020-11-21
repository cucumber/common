require 'cucumber/cucumber_expressions/argument'
require 'cucumber/cucumber_expressions/tree_regexp'
require 'cucumber/cucumber_expressions/errors'

module Cucumber
  module CucumberExpressions
    class CucumberExpression

      ESCAPE_PATTERN = /([\\^\[({$.|?*+})\]])/

      def initialize(expression, parameter_type_registry)
        @expression = expression
        @parameter_types = []
        @parameter_type_registry = parameter_type_registry
        parser = CucumberExpressionParser.new
        ast = parser.parse(expression)
        pattern = rewriteToRegex(ast)
        @tree_regexp = TreeRegexp.new(pattern)
      end

      def match(text)
        Argument.build(@tree_regexp, text, @parameter_types)
      end

      def source
        @expression
      end

      def regexp
        @tree_regexp.regexp
      end

      def to_s
        @source.inspect
      end

      private

      def rewriteToRegex(node)
        case node.type
        when NodeType::Text
          return escapeRegex(node.text)
        when NodeType::Optional
          return rewriteOptional(node)
        when NodeType::Alternation
          return rewriteAlternation(node)
        when NodeType::Alternative
          return rewriteAlternative(node)
        when NodeType::Parameter
          return rewriteParameter(node)
        when NodeType::Expression
          return rewriteExpression(node)
        else
          # Can't happen as long as the switch case is exhaustive
          raise "#{node.type}"
        end
      end

      def escapeRegex(expression)
        expression.gsub(ESCAPE_PATTERN, '\\\\\1')
      end

      def rewriteOptional(node)
        assertNoParameters(node, lambda { |astNode| ParameterIsNotAllowedInOptional.new(astNode, @expression) })
        assertNotEmpty(node, lambda { |astNode| OptionalMayNotBeEmpty.new(astNode, @expression) })
        regex = node.nodes.map { |n| rewriteToRegex(n) }.join('')
        "(?:#{regex})?"
      end

      def rewriteAlternation(node)
        # Make sure the alternative parts aren't empty and don't contain parameter types
        node.nodes.each { |alternative|
          if alternative.nodes.length == 0
            raise AlternativeMayNotBeEmpty.new(alternative, @expression)
          end
          assertNotEmpty(alternative, lambda {|astNode|  AlternativeMayNotExclusivelyContainOptionals.new(astNode, @expression)})
        }
        regex = node.nodes.map { |n| rewriteToRegex(n) }.join('|')
        "(?:#{regex})"
      end

      def rewriteAlternative(node)
        node.nodes.map { |lastNode| rewriteToRegex(lastNode) }.join('')
      end

      def rewriteParameter(node)
        name = node.text
        # if (!ParameterType.isValidParameterTypeName(name)) {
        #     throw createInvalidParameterTypeName(name)
        # }

        parameterType = @parameter_type_registry.lookup_by_type_name(name)
        if parameterType.nil?
          raise UndefinedParameterTypeError.new(node, @expression, name)
        end
        @parameter_types.push(parameterType)
        regexps = parameterType.regexps
        if regexps.length == 1
          return "(#{regexps[0]})"
        end
        "((?:#{regexps.join(')|(?:')}))"
      end

      def rewriteExpression(node)
        regex = node.nodes.map { |n| rewriteToRegex(n) }.join('')
        "^#{regex}$"
      end

      def assertNotEmpty(node, createNodeWasNotEmptyException)
        textNodes = node.nodes.filter { |astNode| NodeType::Text == astNode.type }
        if textNodes.length == 0
          raise createNodeWasNotEmptyException.call(node)
        end
      end

      def assertNoParameters(node, createNodeContainedAParameterError)
        parameterNodes = node.nodes.filter { |astNode| NodeType::Parameter == astNode.type }
        if parameterNodes.length > 0
          raise createNodeContainedAParameterError.call(node)
        end
      end
    end
  end
end
