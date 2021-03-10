import { Given, After, Before, ParameterType } from '../src/dsl'
import assert from 'assert'

Before('@before-passed', () => {
  // no-op
})

Before('@before-failed', () => {
  throw new Error('Something went wrong in before hook')
})

After('@after-passed', () => {
  // no-op
})

After('@after-failed', () => {
  throw new Error('Something went wrong in after hook')
})

Given('a passed step', () => {
  // no-op
})

Given('I have {int} cukes', (cukes: number) => {
  // no-op
  assert.notStrictEqual(cukes, undefined)
})

class Flight {
  constructor(public readonly name: string) {}
}

ParameterType({
  name: 'flight',
  regexp: /[A-Z]{3}-[A-Z]{3}/,
  transformer(name) {
    return new Flight(name)
  },
})

Given('flight {flight}', (flight: Flight) => {
  assert.strictEqual(flight.name, 'LHR-CDG')
})
