import { ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import Parser from 'web-tree-sitter'
import assert from 'assert'
import { addJavaExpressions } from '../../src/expressions/java'

describe('addExpressions', () => {
  let parser: Parser
  let Java: Parser.Language
  let parameterTypeRegistry: ParameterTypeRegistry

  beforeEach(async () => {
    await Parser.init()
    parser = new Parser()
    Java = await Parser.Language.load('tree-sitter-java.wasm')
    parser.setLanguage(Java)

    parameterTypeRegistry = new ParameterTypeRegistry()
  })

  it('builds expressions from .java source', async () => {
    const source = `
class StepDefinitions {
    @Given("I have {int} cukes in my belly"  )
    void function() {
    }

    @When(  "you have some time")
    void function2() {
    }
}
`
    const expressions = await addJavaExpressions([], parser, Java, parameterTypeRegistry, source)
    assert.deepStrictEqual(expressions.map(e => e.source), [
      'I have {int} cukes in my belly',
      'you have some time'
    ])
  })
})
