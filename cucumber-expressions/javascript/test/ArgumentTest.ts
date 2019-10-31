import TreeRegexp from '../src/TreeRegexp'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'
import Argument from '../src/Argument'
import * as assert from 'assert'

describe('Argument', () => {
  it('exposes getParameterTypeName()', () => {
    const treeRegexp = new TreeRegexp('three (.*) mice')
    const parameterTypeRegistry = new ParameterTypeRegistry()
    const args = Argument.build(treeRegexp, 'three blind mice', [
      parameterTypeRegistry.lookupByTypeName('string'),
    ])
    const argument = args[0]
    assert.strictEqual(argument.getParameterType().name, 'string')
  })
})
