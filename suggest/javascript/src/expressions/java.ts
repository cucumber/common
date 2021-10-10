import { Expression, ExpressionFactory, ParameterType, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import Parser from 'web-tree-sitter'

export function buildExpressions(parser: Parser, Java: Parser.Language, sources: string[]): readonly Expression[] {
  let matches: Parser.QueryMatch[] = []
  for (const source of sources) {
    matches = matches.concat(queryMethodAnnotations(parser, Java, source))
  }
  const parameterTypeRegistry = new ParameterTypeRegistry()

  for (const match of matches) {
    const parameterType = buildParameterType(match)
    if(parameterType) {
      parameterTypeRegistry.defineParameterType(parameterType)
    }
  }

  let expressions: Expression[] = []
  const expressionFactory = new ExpressionFactory(parameterTypeRegistry)
  for (const match of matches) {
    const expression = buildExpression(match, expressionFactory)
    if(expression) {
      expressions.push(expression)
    }
  }
  return expressions
}

function queryMethodAnnotations(parser: Parser, Java: Parser.Language, source: string): readonly Parser.QueryMatch[] {
  parser.setLanguage(Java)
  const tree = parser.parse(source)
  // See https://github.com/tree-sitter/tree-sitter/issues/1392
  const methodAnnotationQuery = Java.query(`
(method_declaration 
  (modifiers 
    (annotation 
      name: [(identifier) (scoped_identifier)] @annotation-name 
      arguments: (annotation_argument_list
        (string_literal)? @literal-value
      )
    )
  )
  name: (identifier) @method-name
)
  `)
  return methodAnnotationQuery.matches(tree.rootNode)
}

function buildParameterType(match: Parser.QueryMatch): ParameterType<unknown> | null {
  const annotationNameNode = match.captures.find(c => c.name === 'annotation-name').node
  const annotationName = annotationNameNode.text
  if (!isParameterType(annotationName)) return null

  let name = match.captures.find(c => c.name === 'method-name').node.text
  let quotedRegexp: string
  const literalValue = match.captures.find(c => c.name === 'literal-value')
  if (literalValue) {
    quotedRegexp = literalValue.node.text
  } else {
    const annotationNode = annotationNameNode.parent
    const pairs = annotationNode.descendantsOfType('element_value_pair')
    for (const pair of pairs) {
      const key = pair.childForFieldName('key')
      const value = pair.childForFieldName('value')
      if (key.text === 'name') {
        name = value.text.substring(1, value.text.length - 1)
      }
      if (key.text === 'value') {
        quotedRegexp = value.text
      }
    }
  }
  const regexps = quotedRegexp.substring(1, quotedRegexp.length -1)
  return new ParameterType(
    name,
    regexps,
    Object,
    () => undefined,
    false,
    false
  )
}


function buildExpression(match: Parser.QueryMatch, expressionFactory: ExpressionFactory): Expression | null {
  const annotationNameNode = match.captures.find(c => c.name === 'annotation-name').node
  const annotationName = annotationNameNode.text
  if (!isStep(annotationName)) return null

  const literalValue = match.captures.find(c => c.name === 'literal-value').node.text
  return expressionFactory.createExpression(literalValue.substring(1, literalValue.length - 1))
}

function isParameterType(annotation: any) {
  return ['ParameterType', 'io.cucumber.java.ParameterType'].includes(annotation)
}

function isStep(annotation: string) {
  return ['Given', 'When', 'Then'].includes(annotation)
}

