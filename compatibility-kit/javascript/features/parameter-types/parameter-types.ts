import assert from 'assert'
import { Given, ParameterType } from '@cucumber/fake-cucumber'

class Flight {
  constructor(public readonly from: string, public readonly to: string) {}
}

ParameterType({
  name: 'flight',
  regexp: /([A-Z]{3})-([A-Z]{3})/,
  transformer(from: string, to: string) {
    return new Flight(from, to)
  },
})

Given('{flight} has been delayed {int} minutes', function (
  flight: Flight,
  delay: number
) {
  assert.equal(flight.from, 'LHR')
  assert.equal(flight.to, 'CDG')
  assert.equal(delay, 45)
})
