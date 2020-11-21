require 'cucumber/cucumber_expressions/argument'
require 'cucumber/cucumber_expressions/tree_regexp'
require 'cucumber/cucumber_expressions/errors'
require 'cucumber/cucumber_expressions/cucumber_expression_parser'

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
        pattern = rewrite_to_regex(ast)
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

      def rewrite_to_regex(node)
        case node.type
        when NodeType::Text
          return escape_regex(node.text)
        when NodeType::Optional
          return rewrite_optional(node)
        when NodeType::Alternation
          return rewrite_alternation(node)
        when NodeType::Alternative
          return rewrite_alternative(node)
        when NodeType::Parameter
          return rewrite_parameter(node)
        when NodeType::Expression
          return rewrite_expression(node)
        else
          # Can't happen as long as the switch case is exhaustive
          raise "#{node.type}"
        end
      end

      def escape_regex(expression)
        expression.gsub(ESCAPE_PATTERN, '\\\\\1')
      end

      def rewrite_optional(node)
        assert_no_parameters(node, lambda { |astNode| ParameterIsNotAllowedInOptional.new(astNode, @expression) })
        assert_not_empty(node, lambda { |astNode| OptionalMayNotBeEmpty.new(astNode, @expression) })
        regex = node.nodes.map { |n| rewrite_to_regex(n) }.join('')
        "(?:#{regex})?"
      end

      def rewrite_alternation(node)
        # Make sure the alternative parts aren't empty and don't contain parameter types
        node.nodes.each { |alternative|
          if alternative.nodes.length == 0
            raise AlternativeMayNotBeEmpty.new(alternative, @expression)
          end
          assert_not_empty(alternative, lambda {|astNode|  AlternativeMayNotExclusivelyContainOptionals.new(astNode, @expression)})
        }
        regex = node.nodes.map { |n| rewrite_to_regex(n) }.join('|')
        "(?:#{regex})"
      end

      def rewrite_alternative(node)
        node.nodes.map { |lastNode| rewrite_to_regex(lastNode) }.join('')
      end

      def rewrite_parameter(node)
        name = node.text
        unless ParameterType::is_valid_parameter_type_name(name)
          raise InvalidParameterTypeName.new(node, @expression)
        end

        parameter_type = @parameter_type_registry.lookup_by_type_name(name)
        if parameter_type.nil?
          raise UndefinedParameterTypeError.new(node, @expression, name)
        end
        @parameter_types.push(parameter_type)
        regexps = parameter_type.regexps
        if regexps.length == 1
          return "(#{regexps[0]})"
        end
        "((?:#{regexps.join(')|(?:')}))"
      end

      def rewrite_expression(node)
        regex = node.nodes.map { |n| rewrite_to_regex(n) }.join('')
        "^#{regex}$"
      end

      def assert_not_empty(node, create_node_was_not_empty_error)
        text_nodes = node.nodes.filter { |astNode| NodeType::Text == astNode.type }
        if text_nodes.length == 0
          raise create_node_was_not_empty_error.call(node)
        end
      end

      def assert_no_parameters(node, create_node_contained_a_parameter_error)
        parameter_nodes = node.nodes.filter { |astNode| NodeType::Parameter == astNode.type }
        if parameter_nodes.length > 0
          raise create_node_contained_a_parameter_error.call(parameter_nodes[0])
        end
      end
    end
  end
end
