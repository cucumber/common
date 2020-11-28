import ParameterTypeRegistry from './ParameterTypeRegistry'
import ParameterType from './ParameterType'
import TreeRegexp from './TreeRegexp'
import Argument from './Argument'
import {
  createAlternativeMayNotBeEmpty,
  createAlternativeMayNotExclusivelyContainOptionals,
  createOptionalIsNotAllowedInOptional,
  createOptionalMayNotBeEmpty,
  createParameterIsNotAllowedInOptional,
  createUndefinedParameterType,
  CucumberExpressionError,
} from './Errors'
import Expression from './Expression'
import CucumberExpressionParser from './CucumberExpressionParser'
import { Node, NodeType } from './Ast'

const ESCAPE_PATTERN = () => /([\\^[({$.|?*+})\]])/g

export default class CucumberExpression implements Expression {
  private readonly parameterTypes: Array<ParameterType<any>> = []
  private readonly treeRegexp: TreeRegexp

  /**
   * @param expression
   * @param parameterTypeRegistry
   */
  constructor(
    private readonly expression: string,
    private readonly parameterTypeRegistry: ParameterTypeRegistry
  ) {
    const parser = new CucumberExpressionParser()
    const ast = parser.parse(expression)
    const pattern = this.rewriteToRegex(ast)
    this.treeRegexp = new TreeRegexp(pattern)
  }

  private rewriteToRegex(node: Node): string {
    switch (node.type) {
      case NodeType.text:
        return CucumberExpression.escapeRegex(node.text())
      case NodeType.optional:
        return this.rewriteOptional(node)
      case NodeType.alternation:
        return this.rewriteAlternation(node)
      case NodeType.alternative:
        return this.rewriteAlternative(node)
      case NodeType.parameter:
        return this.rewriteParameter(node)
      case NodeType.expression:
        return this.rewriteExpression(node)
      default:
        // Can't happen as long as the switch case is exhaustive
        throw new Error(node.type)
    }
  }

  private static escapeRegex(expression: string) {
    return expression.replace(ESCAPE_PATTERN(), '\\$1')
  }

  private rewriteOptional(node: Node): string {
    this.assertNoParameters(node, (astNode) =>
      createParameterIsNotAllowedInOptional(astNode, this.expression)
    )
    this.assertNoOptionals(node, (astNode) =>
      createOptionalIsNotAllowedInOptional(astNode, this.expression)
    )
    this.assertNotEmpty(node, (astNode) =>
      createOptionalMayNotBeEmpty(astNode, this.expression)
    )
    const regex = node.nodes.map((node) => this.rewriteToRegex(node)).join('')
    return `(?:${regex})?`
  }

  private rewriteAlternation(node: Node) {
    // Make sure the alternative parts aren't empty and don't contain parameter types
    node.nodes.forEach((alternative) => {
      if (alternative.nodes.length == 0) {
        throw createAlternativeMayNotBeEmpty(alternative, this.expression)
      }
      this.assertNotEmpty(alternative, (astNode) =>
        createAlternativeMayNotExclusivelyContainOptionals(
          astNode,
          this.expression
        )
      )
    })
    const regex = node.nodes.map((node) => this.rewriteToRegex(node)).join('|')
    return `(?:${regex})`
  }

  private rewriteAlternative(node: Node) {
    return node.nodes.map((lastNode) => this.rewriteToRegex(lastNode)).join('')
  }

  private rewriteParameter(node: Node) {
    const name = node.text()
    const parameterType = this.parameterTypeRegistry.lookupByTypeName(name)
    if (!parameterType) {
      throw createUndefinedParameterType(node, this.expression, name)
    }
    this.parameterTypes.push(parameterType)
    const regexps = parameterType.regexpStrings
    if (regexps.length == 1) {
      return `(${regexps[0]})`
    }
    return `((?:${regexps.join(')|(?:')}))`
  }

  private rewriteExpression(node: Node) {
    const regex = node.nodes.map((node) => this.rewriteToRegex(node)).join('')
    return `^${regex}$`
  }

  private assertNotEmpty(
    node: Node,
    createNodeWasNotEmptyException: (astNode: Node) => CucumberExpressionError
  ) {
    const textNodes = node.nodes.filter(
      (astNode) => NodeType.text == astNode.type
    )

    if (textNodes.length == 0) {
      throw createNodeWasNotEmptyException(node)
    }
  }

  private assertNoParameters(
    node: Node,
    createNodeContainedAParameterError: (
      astNode: Node
    ) => CucumberExpressionError
  ) {
    const parameterNodes = node.nodes.filter(
      (astNode) => NodeType.parameter == astNode.type
    )
    if (parameterNodes.length > 0) {
      throw createNodeContainedAParameterError(parameterNodes[0])
    }
  }

  private assertNoOptionals(
    node: Node,
    createNodeContainedAnOptionalError: (
      astNode: Node
    ) => CucumberExpressionError
  ) {
    const parameterNodes = node.nodes.filter(
      (astNode) => NodeType.optional == astNode.type
    )
    if (parameterNodes.length > 0) {
      throw createNodeContainedAnOptionalError(parameterNodes[0])
    }
  }

  public match(text: string): ReadonlyArray<Argument<any>> {
    return Argument.build(this.treeRegexp, text, this.parameterTypes)
  }

  get regexp(): RegExp {
    return this.treeRegexp.regexp
  }

  get source(): string {
    return this.expression
  }
}
