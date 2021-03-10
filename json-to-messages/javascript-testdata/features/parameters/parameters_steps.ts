import assert from 'assert'
import { Given, When, Then, setWorldConstructor } from 'cucumber'

function CustomWorld() {
  this.cucumbers = 0
}

setWorldConstructor(CustomWorld)

Given('I have {int} cucumbers', function (count: number) {
  this.cucumbers = count
})

When('I eat {int} cucumbers', function (eaten: number) {
  this.cucumbers -= eaten
})

Then('I have {int} cucumbers left', function (left: number) {
  assert.equal(this.cucumbers, left)
})

Given('a step with a doctring:', function () {
  // no-op
})

When('a step with a datatable', function () {
  // no-op
})
