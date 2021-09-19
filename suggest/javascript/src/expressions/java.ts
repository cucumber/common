import { Expression, ExpressionFactory, ParameterTypeRegistry } from "@cucumber/cucumber-expressions"
import Parser from 'web-tree-sitter'

export function addJavaExpressions(expressions: readonly Expression[], parser: Parser, Java: Parser.Language, parameterTypeRegistry: ParameterTypeRegistry, source: string): readonly Expression[] {
  parser.setLanguage(Java)
  const tree = parser.parse(source)
  const query = Java.query('(annotation name: [(identifier) (scoped_identifier)] @annotation-name arguments: (annotation_argument_list (string_literal) @expression))')
  const matches = query.matches(tree.rootNode)

  const expressionFactory = new ExpressionFactory(parameterTypeRegistry)
  for (const match of matches) {
    const annotation = match.captures[0].node.text
    if (isStep(annotation)) {
      const quotedExpression = match.captures[1].node.text
      const expression = expressionFactory.createExpression(quotedExpression.substring(1, quotedExpression.length-1))
      expressions = expressions.concat(expression)
    }
  }
  return expressions
}

function isStep(annotation: string) {
  return ['Given', 'When', 'Then'].includes(annotation)
}

