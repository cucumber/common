import { Node, NodeType } from './Ast'
import CucumberExpressionTokenizer from './CucumberExpressionTokenizer'

export default class CucumberExpressionParser {
  parse(expression: string): Node {
    const tokenizer = new CucumberExpressionTokenizer()
    const tokens = tokenizer.tokenize(expression)
    return new Node(NodeType.expressionNode, [], undefined, 0, 0)
  }
}
