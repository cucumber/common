import assert from 'assert'
import CucumberExpressionGenerator from '../src/CucumberExpressionGenerator'
import CucumberExpression from '../src/CucumberExpression'
import ParameterType from '../src/ParameterType'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'

class Currency {
  constructor(public readonly s: string) {}
}

describe('CucumberExpressionGenerator', () => {
  let parameterTypeRegistry: ParameterTypeRegistry
  let generator: CucumberExpressionGenerator

  function assertExpression(
    expectedExpression: string,
    expectedArgumentNames: string[],
    text: string
  ) {
    const generatedExpression = generator.generateExpressions(text)[0]
    assert.deepStrictEqual(
      generatedExpression.parameterNames,
      expectedArgumentNames
    )
    assert.strictEqual(generatedExpression.source, expectedExpression)

    const cucumberExpression = new CucumberExpression(
      generatedExpression.source,
      parameterTypeRegistry
    )
    const match = cucumberExpression.match(text)
    if (match === null) {
      assert.fail(
        `Expected text '${text}' to match generated expression '${generatedExpression.source}'`
      )
    }
    assert.strictEqual(match.length, expectedArgumentNames.length)
  }

  beforeEach(() => {
    parameterTypeRegistry = new ParameterTypeRegistry()
    generator = new CucumberExpressionGenerator(parameterTypeRegistry)
  })

  it('documents expression generation', () => {
    parameterTypeRegistry = new ParameterTypeRegistry()
    generator = new CucumberExpressionGenerator(parameterTypeRegistry)
    const undefinedStepText = 'I have 2 cucumbers and 1.5 tomato'
    const generatedExpression = generator.generateExpressions(
      undefinedStepText
    )[0]
    assert.strictEqual(
      generatedExpression.source,
      'I have {int} cucumbers and {float} tomato'
    )
    assert.strictEqual(generatedExpression.parameterNames[0], 'int')
    assert.strictEqual(generatedExpression.parameterTypes[1].name, 'float')
  })

  it('generates expression for no args', () => {
    assertExpression('hello', [], 'hello')
  })

  it('generates expression with escaped left parenthesis', () => {
    assertExpression('\\(iii)', [], '(iii)')
  })

  it('generates expression with escaped left curly brace', () => {
    assertExpression('\\{iii}', [], '{iii}')
  })

  it('generates expression with escaped slashes', () => {
    assertExpression(
      'The {int}\\/{int}\\/{int} hey',
      ['int', 'int2', 'int3'],
      'The 1814/05/17 hey'
    )
  })

  it('generates expression for int float arg', () => {
    assertExpression(
      'I have {int} cukes and {float} euro',
      ['int', 'float'],
      'I have 2 cukes and 1.5 euro'
    )
  })

  it('generates expression for strings', () => {
    assertExpression(
      'I like {string} and {string}',
      ['string', 'string2'],
      'I like "bangers" and \'mash\''
    )
  })

  it('generates expression with % sign', () => {
    assertExpression('I am {int}%% foobar', ['int'], 'I am 20%% foobar')
  })

  it('generates expression for just int', () => {
    assertExpression('{int}', ['int'], '99999')
  })

  it('numbers only second argument when builtin type is not reserved keyword', () => {
    assertExpression(
      'I have {float} cukes and {float} euro',
      ['float', 'float2'],
      'I have 2.5 cukes and 1.5 euro'
    )
  })

  it('generates expression for custom type', () => {
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'currency',
        /[A-Z]{3}/,
        Currency,
        s => new Currency(s),
        true,
        false
      )
    )

    assertExpression(
      'I have a {currency} account',
      ['currency'],
      'I have a EUR account'
    )
  })

  it('prefers leftmost match when there is overlap', () => {
    parameterTypeRegistry.defineParameterType(
      new ParameterType<Currency>(
        'currency',
        /cd/,
        Currency,
        s => new Currency(s),
        true,
        false
      )
    )
    parameterTypeRegistry.defineParameterType(
      new ParameterType('date', /bc/, Date, s => new Date(s), true, false)
    )

    assertExpression('a{date}defg', ['date'], 'abcdefg')
  })

  // TODO: prefers widest match

  it('generates all combinations of expressions when several parameter types match', () => {
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'currency',
        /x/,
        null,
        s => new Currency(s),
        true,
        false
      )
    )
    parameterTypeRegistry.defineParameterType(
      new ParameterType('date', /x/, null, s => new Date(s), true, false)
    )

    const generatedExpressions = generator.generateExpressions(
      'I have x and x and another x'
    )
    const expressions = generatedExpressions.map(e => e.source)
    assert.deepStrictEqual(expressions, [
      'I have {currency} and {currency} and another {currency}',
      'I have {currency} and {currency} and another {date}',
      'I have {currency} and {date} and another {currency}',
      'I have {currency} and {date} and another {date}',
      'I have {date} and {currency} and another {currency}',
      'I have {date} and {currency} and another {date}',
      'I have {date} and {date} and another {currency}',
      'I have {date} and {date} and another {date}',
    ])
  })

  it('exposes parameter type names in generated expression', () => {
    const expression = generator.generateExpressions(
      'I have 2 cukes and 1.5 euro'
    )[0]
    const typeNames = expression.parameterTypes.map(parameter => parameter.name)
    assert.deepStrictEqual(typeNames, ['int', 'float'])
  })

  it('matches parameter types with optional capture groups', () => {
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'optional-flight',
        /(1st flight)?/,
        null,
        s => s,
        true,
        false
      )
    )
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'optional-hotel',
        /(1st hotel)?/,
        null,
        s => s,
        true,
        false
      )
    )

    const expression = generator.generateExpressions(
      'I reach Stage4: 1st flight-1st hotel'
    )[0]
    // While you would expect this to be `I reach Stage{int}: {optional-flight}-{optional-hotel}` the `-1` causes
    // {int} to match just before {optional-hotel}.
    assert.strictEqual(
      expression.source,
      'I reach Stage{int}: {optional-flight}{int}st hotel'
    )
  })

  it('generates at most 256 expressions', () => {
    for (let i = 0; i < 4; i++) {
      parameterTypeRegistry.defineParameterType(
        new ParameterType('my-type-' + i, /[a-z]/, null, s => s, true, false)
      )
    }
    // This would otherwise generate 4^11=419430 expressions and consume just shy of 1.5GB.
    const expressions = generator.generateExpressions('a simple step')
    assert.strictEqual(expressions.length, 256)
  })

  it('prefers expression with longest non empty match', () => {
    parameterTypeRegistry.defineParameterType(
      new ParameterType('zero-or-more', /[a-z]*/, null, s => s, true, false)
    )
    parameterTypeRegistry.defineParameterType(
      new ParameterType('exactly-one', /[a-z]/, null, s => s, true, false)
    )

    const expressions = generator.generateExpressions('a simple step')
    assert.strictEqual(expressions.length, 2)
    assert.strictEqual(
      expressions[0].source,
      '{exactly-one} {zero-or-more} {zero-or-more}'
    )
    assert.strictEqual(
      expressions[1].source,
      '{zero-or-more} {zero-or-more} {zero-or-more}'
    )
  })
})
