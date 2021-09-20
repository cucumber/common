import Parser from 'web-tree-sitter'
import assert from 'assert'
import { buildExpressions } from '../../src/expressions/java'

describe('buildExpressions', () => {
  let parser: Parser
  let Java: Parser.Language

  beforeEach(async () => {
    await Parser.init()
    parser = new Parser()
    Java = await Parser.Language.load('tree-sitter-java.wasm')
    parser.setLanguage(Java)
  })

  it('builds expressions from .java source', async () => {
    const stepdefs = `
class StepDefinitions {
    @Given("I have {int} cukes in my belly"  )
    void method1() {
    }

    @When(  "you have some time")
    void method2() {
    }

    @Then("a {iso-date}")
    void method3() {
    }

    @Then("a {date}")
    void method4() {
    }
}
`

    const parameterTypes = `
class ParameterTypes {
    @ParameterType("(?:.*) \\\\d{1,2}, \\\\d{4}")
    public Date date(String date) throws ParseException {
        return getDateInstance(MEDIUM, ENGLISH).parse(date);
    }

    @ParameterType(name = "iso-date", value = "\\\\d{4}-\\\\d{2}-\\\\d{2}")
    public Date isoDate(String date) throws ParseException {
        return new SimpleDateFormat("yyyy-mm-dd").parse(date);
    }
}
`

    const expressions = buildExpressions(parser, Java, [stepdefs, parameterTypes])
    assert.deepStrictEqual(expressions.map(e => e.source), [
      'I have {int} cukes in my belly',
      'you have some time',
      'a {iso-date}',
      'a {date}',
    ])
  })
})
