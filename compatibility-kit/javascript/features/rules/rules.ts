import assert from 'assert'
import { Given, When, Then } from '@cucumber/fake-cucumber'

Given('there are {int} {float} coins inside', function(count, denomination) {
  // TODO: implement this
})

Given('there are no chocolates inside', function() {
  // TODO: implement this
})

Given('there are {int} chocolates inside', function(chocolateCount) {
  // TODO: implement this
})

When('the customer tries to buy a {float} chocolate with a {float} coin', function(price, paid) {
  // TODO: implement this
})

Then('the sale should not happen', function() {
  // TODO: implement this
})

Then("the customer's change should be {int} {float} coin(s)", function(count, denomination) {
  // TODO: implement this
})
