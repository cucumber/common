/* eslint-env mocha */
'use strict'

const assert = require('assert')
const assertThrows = require('./assert_throws')
const CucumberExpression = require('../src/cucumber_expression')
const RegularExpression = require('../src/regular_expression')
const ParameterTypeRegistry = require('../src/parameter_type_registry')
const ParameterType = require('../src/parameter_type')

class Color {
  /// [color-constructor]
  constructor(name) {
    this.name = name
  }
  /// [color-constructor]
}

class CssColor {
  constructor(name) {
    this.name = name
  }
}

describe('Custom parameter type', () => {
  let parameterTypeRegistry

  beforeEach(() => {
    parameterTypeRegistry = new ParameterTypeRegistry()
    /// [add-color-parameter-type]
    parameterTypeRegistry.defineParameterType(
      new ParameterType(
        'color',
        Color,
        /red|blue|yellow/,
        false,
        s => new Color(s)
      )
    )
    /// [add-color-parameter-type]
  })

  describe('CucumberExpression', () => {
    it('matches parameters with custom parameter type', () => {
      const expression = new CucumberExpression(
        'I have a {color} ball',
        parameterTypeRegistry
      )
      const transformedValue = expression.match('I have a red ball')[0]
        .transformedValue
      assert.equal(transformedValue.name, 'red')
    })

    it('matches parameters with custom parameter type using optional capture group', () => {
      parameterTypeRegistry = new ParameterTypeRegistry()
      parameterTypeRegistry.defineParameterType(
        new ParameterType(
          'color',
          Color,
          [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/],
          false,
          s => new Color(s)
        )
      )
      const expression = new CucumberExpression(
        'I have a {color} ball',
        parameterTypeRegistry
      )
      const transformedValue = expression.match('I have a dark red ball')[0]
        .transformedValue
      assert.equal(transformedValue.name, 'dark red')
    })

    it('matches parameters with custom parameter type without constructor function and transform', () => {
      parameterTypeRegistry = new ParameterTypeRegistry()
      parameterTypeRegistry.defineParameterType(
        new ParameterType('color', null, /red|blue|yellow/, false, null)
      )
      const expression = new CucumberExpression(
        'I have a {color} ball',
        parameterTypeRegistry
      )
      const transformedValue = expression.match('I have a red ball')[0]
        .transformedValue
      assert.equal(transformedValue, 'red')
    })

    it('defers transformation until queried from argument', () => {
      parameterTypeRegistry.defineParameterType(
        new ParameterType('throwing', () => null, /bad/, false, s => {
          throw new Error(`Can't transform [${s}]`)
        })
      )

      const expression = new CucumberExpression(
        'I have a {throwing} parameter',
        parameterTypeRegistry
      )
      const args = expression.match('I have a bad parameter')
      assertThrows(() => args[0].transformedValue, "Can't transform [bad]")
    })

    describe('conflicting parameter type', () => {
      it('is detected for type name', () => {
        assertThrows(
          () =>
            parameterTypeRegistry.defineParameterType(
              new ParameterType(
                'color',
                CssColor,
                /.*/,
                false,
                s => new CssColor(s)
              )
            ),
          'There is already a parameter type with name color'
        )
      })

      it('is detected for type', () => {
        assertThrows(
          () =>
            parameterTypeRegistry.defineParameterType(
              new ParameterType(
                'whatever',
                Color,
                /.*/,
                false,
                s => new Color(s)
              )
            ),
          'There is already a parameter type with type Color'
        )
      })

      it('is not detected for regexp', () => {
        parameterTypeRegistry.defineParameterType(
          new ParameterType(
            'css-color',
            CssColor,
            /red|blue|yellow/,
            false,
            s => new CssColor(s)
          )
        )

        assert.equal(
          new CucumberExpression(
            'I have a {css-color} ball',
            parameterTypeRegistry
          ).match('I have a blue ball')[0].transformedValue.constructor,
          CssColor
        )
        assert.equal(
          new CucumberExpression(
            'I have a {css-color} ball',
            parameterTypeRegistry
          ).match('I have a blue ball')[0].transformedValue.name,
          'blue'
        )
        assert.equal(
          new CucumberExpression(
            'I have a {color} ball',
            parameterTypeRegistry
          ).match('I have a blue ball')[0].transformedValue.constructor,
          Color
        )
        assert.equal(
          new CucumberExpression(
            'I have a {color} ball',
            parameterTypeRegistry
          ).match('I have a blue ball')[0].transformedValue.name,
          'blue'
        )
      })

      it('is not detected when constructor function is anonymous', () => {
        parameterTypeRegistry = new ParameterTypeRegistry()
        parameterTypeRegistry.defineParameterType(
          new ParameterType('foo', () => null, /foo/, false, s => s)
        )
        parameterTypeRegistry.defineParameterType(
          new ParameterType('bar', () => null, /bar/, false, s => s)
        )
      })

      it('is not detected when constructor function is null', () => {
        parameterTypeRegistry = new ParameterTypeRegistry()
        parameterTypeRegistry.defineParameterType(
          new ParameterType('foo', null, /foo/, false, s => s)
        )
        parameterTypeRegistry.defineParameterType(
          new ParameterType('bar', null, /bar/, false, s => s)
        )
      })
    })

    // JavaScript-specific
    it('creates arguments using async transform', async () => {
      parameterTypeRegistry = new ParameterTypeRegistry()
      /// [add-async-parameter-type]
      parameterTypeRegistry.defineParameterType(
        new ParameterType(
          'asyncColor',
          Color,
          /red|blue|yellow/,
          false,
          async s => new Color(s)
        )
      )
      /// [add-async-parameter-type]

      const expression = new CucumberExpression(
        'I have a {asyncColor} ball',
        parameterTypeRegistry
      )
      const args = await expression.match('I have a red ball')
      const transformedValue = await args[0].transformedValue
      assert.equal(transformedValue.name, 'red')
    })
  })

  describe('RegularExpression', () => {
    it('matches arguments with custom parameter type', () => {
      const expression = new RegularExpression(
        /I have a (red|blue|yellow) ball/,
        parameterTypeRegistry
      )
      const transformedValue = expression.match('I have a red ball')[0]
        .transformedValue
      assert.equal(transformedValue.constructor, Color)
      assert.equal(transformedValue.name, 'red')
    })
  })
})
