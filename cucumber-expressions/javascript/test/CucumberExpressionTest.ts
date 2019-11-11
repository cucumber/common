import assert from 'assert'
import CucumberExpression from '../src/CucumberExpression'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'
import ParameterType from '../src/ParameterType'

describe('CucumberExpression', () => {
  it('documents match arguments', () => {
    const parameterTypeRegistry = new ParameterTypeRegistry()

    /// [capture-match-arguments]
    const expr = 'I have {int} cuke(s)'
    const expression = new CucumberExpression(expr, parameterTypeRegistry)
    const args = expression.match('I have 7 cukes')
    assert.strictEqual(7, args[0].getValue(null))
    /// [capture-match-arguments]
  })

  it('matches word', () => {
    assert.deepStrictEqual(match('three {word} mice', 'three blind mice'), [
      'blind',
    ])
  })

  it('matches double quoted string', () => {
    assert.deepStrictEqual(match('three {string} mice', 'three "blind" mice'), [
      'blind',
    ])
  })

  it('matches multiple double quoted strings', () => {
    assert.deepStrictEqual(
      match(
        'three {string} and {string} mice',
        'three "blind" and "crippled" mice'
      ),
      ['blind', 'crippled']
    )
  })

  it('matches single quoted string', () => {
    assert.deepStrictEqual(match('three {string} mice', "three 'blind' mice"), [
      'blind',
    ])
  })

  it('matches multiple single quoted strings', () => {
    assert.deepStrictEqual(
      match(
        'three {string} and {string} mice',
        "three 'blind' and 'crippled' mice"
      ),
      ['blind', 'crippled']
    )
  })

  it('does not match misquoted string', () => {
    assert.deepStrictEqual(
      match('three {string} mice', 'three "blind\' mice'),
      null
    )
  })

  it('matches single quoted string with double quotes', () => {
    assert.deepStrictEqual(
      match('three {string} mice', 'three \'"blind"\' mice'),
      ['"blind"']
    )
  })

  it('matches double quoted string with single quotes', () => {
    assert.deepStrictEqual(
      match('three {string} mice', 'three "\'blind\'" mice'),
      ["'blind'"]
    )
  })

  it('matches double quoted string with escaped double quote', () => {
    assert.deepStrictEqual(
      match('three {string} mice', 'three "bl\\"nd" mice'),
      ['bl"nd']
    )
  })

  it('matches single quoted string with escaped single quote', () => {
    assert.deepStrictEqual(
      match('three {string} mice', "three 'bl\\'nd' mice"),
      ["bl'nd"]
    )
  })

  it('matches single quoted string with escaped single quote', () => {
    assert.deepStrictEqual(
      match('three {string} mice', "three 'bl\\'nd' mice"),
      ["bl'nd"]
    )
  })

  it('matches single quoted empty string as empty string', () => {
    assert.deepStrictEqual(match('three {string} mice', "three '' mice"), [''])
  })

  it('matches double quoted empty string as empty string ', () => {
    assert.deepStrictEqual(match('three {string} mice', 'three "" mice'), [''])
  })

  it('matches single quoted empty string as empty string, along with other strings', () => {
    assert.deepStrictEqual(
      match('three {string} and {string} mice', "three '' and 'handsome' mice"),
      ['', 'handsome']
    )
  })

  it('matches double quoted empty string as empty string, along with other strings', () => {
    assert.deepStrictEqual(
      match('three {string} and {string} mice', 'three "" and "handsome" mice'),
      ['', 'handsome']
    )
  })

  it('matches escaped parenthesis', () => {
    assert.deepStrictEqual(
      match(
        'three \\(exceptionally) {string} mice',
        'three (exceptionally) "blind" mice'
      ),
      ['blind']
    )
  })

  it('matches escaped slash', () => {
    assert.deepStrictEqual(match('12\\/2020', '12/2020'), [])
  })

  it('matches int', () => {
    assert.deepStrictEqual(match('{int}', '22'), [22])
  })

  it("doesn't match float as int", () => {
    assert.deepStrictEqual(match('{int}', '1.22'), null)
  })

  it('matches float', () => {
    assert.deepStrictEqual(match('{float}', ''), null)
    assert.deepStrictEqual(match('{float}', '.'), null)
    assert.deepStrictEqual(match('{float}', ','), null)
    assert.deepStrictEqual(match('{float}', '-'), null)
    assert.deepStrictEqual(match('{float}', 'E'), null)
    assert.deepStrictEqual(match('{float}', '1,'), null)
    assert.deepStrictEqual(match('{float}', ',1'), null)
    assert.deepStrictEqual(match('{float}', '1.'), null)

    assert.deepStrictEqual(match('{float}', '1'), [1])
    assert.deepStrictEqual(match('{float}', '-1'), [-1])
    assert.deepStrictEqual(match('{float}', '1.1'), [1.1])
    assert.deepStrictEqual(match('{float}', '1,000'), null)
    assert.deepStrictEqual(match('{float}', '1,000,0'), null)
    assert.deepStrictEqual(match('{float}', '1,000.1'), null)
    assert.deepStrictEqual(match('{float}', '1,000,10'), null)
    assert.deepStrictEqual(match('{float}', '1,0.1'), null)
    assert.deepStrictEqual(match('{float}', '1,000,000.1'), null)
    assert.deepStrictEqual(match('{float}', '-1.1'), [-1.1])

    assert.deepStrictEqual(match('{float}', '.1'), [0.1])
    assert.deepStrictEqual(match('{float}', '-.1'), [-0.1])
    assert.deepStrictEqual(match('{float}', '-.10000001'), [-0.10000001])
    assert.deepStrictEqual(match('{float}', '1E1'), [1e1]) // precision 1 with scale -1, can not be expressed as a decimal
    assert.deepStrictEqual(match('{float}', '.1E1'), [1])
    assert.deepStrictEqual(match('{float}', 'E1'), null)
    assert.deepStrictEqual(match('{float}', '-.1E-1'), [-0.01])
    assert.deepStrictEqual(match('{float}', '-.1E-2'), [-0.001])
    assert.deepStrictEqual(match('{float}', '-.1E+1'), [-1])
    assert.deepStrictEqual(match('{float}', '-.1E+2'), [-10])
    assert.deepStrictEqual(match('{float}', '-.1E1'), [-1])
    assert.deepStrictEqual(match('{float}', '-.10E2'), [-10])
  })

  it('matches float with zero', () => {
    assert.deepEqual(match('{float}', '0'), [0])
  })

  it('matches anonymous', () => {
    assert.deepStrictEqual(match('{}', '0.22'), ['0.22'])
  })

  it('throws unknown parameter type', () => {
    try {
      match('{unknown}', 'something')
      assert.fail()
    } catch (expected) {
      assert.strictEqual(expected.message, 'Undefined parameter type {unknown}')
    }
  })

  it('does not allow optional parameter types', () => {
    try {
      match('({int})', '3')
      assert.fail()
    } catch (expected) {
      assert.strictEqual(
        expected.message,
        'Parameter types cannot be optional: ({int})'
      )
    }
  })

  it('allows escaped optional parameter types', () => {
    assert.deepStrictEqual(match('\\({int})', '(3)'), [3])
  })

  it('does not allow text/parameter type alternation', () => {
    try {
      match('x/{int}', '3')
      assert.fail()
    } catch (expected) {
      assert.strictEqual(
        expected.message,
        'Parameter types cannot be alternative: x/{int}'
      )
    }
  })

  it('does not allow parameter type/text alternation', () => {
    try {
      match('{int}/x', '3')
      assert.fail()
    } catch (expected) {
      assert.strictEqual(
        expected.message,
        'Parameter types cannot be alternative: {int}/x'
      )
    }
  })

  for (const c of '[]()$.|?*+'.split('')) {
    it(`does not allow parameter type with ${c}`, () => {
      try {
        match(`{${c}string}`, 'something')
        assert.fail()
      } catch (expected) {
        assert.strictEqual(
          expected.message,
          `Illegal character '${c}' in parameter name {${c}string}`
        )
      }
    })
  }

  it('exposes source', () => {
    const expr = 'I have {int} cuke(s)'
    assert.strictEqual(
      new CucumberExpression(expr, new ParameterTypeRegistry()).source,
      expr
    )
  })

  // JavaScript-specific

  it('delegates transform to custom object', () => {
    const parameterTypeRegistry = new ParameterTypeRegistry()
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'widget',
        /\w+/,
        null,
        function(s: string) {
          return this.createWidget(s)
        },
        false,
        true
      )
    )
    const expression = new CucumberExpression(
      'I have a {widget}',
      parameterTypeRegistry
    )

    const world = {
      createWidget(s: string) {
        return `widget:${s}`
      },
    }

    const args = expression.match(`I have a bolt`)
    assert.strictEqual(args[0].getValue(world), 'widget:bolt')
  })

  describe('escapes special characters', () => {
    ;['\\', '[', ']', '^', '$', '.', '|', '?', '*', '+'].forEach(character => {
      it(`escapes ${character}`, () => {
        const expr = `I have {int} cuke(s) and ${character}`
        const expression = new CucumberExpression(
          expr,
          new ParameterTypeRegistry()
        )
        const arg1 = expression.match(`I have 800 cukes and ${character}`)[0]
        assert.strictEqual(arg1.getValue(null), 800)
      })
    })

    it(`escapes .`, () => {
      const expr = `I have {int} cuke(s) and .`
      const expression = new CucumberExpression(
        expr,
        new ParameterTypeRegistry()
      )
      assert.strictEqual(expression.match(`I have 800 cukes and 3`), null)
      const arg1 = expression.match(`I have 800 cukes and .`)[0]
      assert.strictEqual(arg1.getValue(null), 800)
    })

    it(`escapes |`, () => {
      const expr = `I have {int} cuke(s) and a|b`
      const expression = new CucumberExpression(
        expr,
        new ParameterTypeRegistry()
      )
      assert.strictEqual(expression.match(`I have 800 cukes and a`), null)
      assert.strictEqual(expression.match(`I have 800 cukes and b`), null)
      const arg1 = expression.match(`I have 800 cukes and a|b`)[0]
      assert.strictEqual(arg1.getValue(null), 800)
    })
  })
})

const match = (expression: string, text: string) => {
  const cucumberExpression = new CucumberExpression(
    expression,
    new ParameterTypeRegistry()
  )
  const args = cucumberExpression.match(text)
  if (!args) {
    return null
  }
  return args.map(arg => arg.getValue(null))
}
