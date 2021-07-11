import { DataTable, Given, Then, When } from '@cucumber/cucumber'
import World from '../support/World'
import makeSuggest, { Suggestion } from '../../src/makeSuggest'
import assert from 'assert'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'

Given('the following Gherkin steps exist:', function (this: World, stepsTable: DataTable) {
  this.steps = stepsTable.rows().map(row => row[0])
})

Given('the following Step Definitions exist:', function (this: World, stepDefinitionsTable: DataTable) {
  const parameterTypeRegistry = new ParameterTypeRegistry()
  this.expressions = stepDefinitionsTable.rows().map(row => new CucumberExpression(row[0], parameterTypeRegistry))
})

When('I type {string}', function (this: World, text: string) {
  const suggest = makeSuggest(this.steps, this.expressions)
  this.suggestions = suggest(text)
})

Then('the suggestions should be:', function (this: World, expectedSuggetionsTable: DataTable) {
  const expectedSuggestions: readonly Suggestion[] = expectedSuggetionsTable.rows().map((row) => ({
    text: row[0]
  }))
  assert.deepStrictEqual(this.suggestions, expectedSuggestions)
})
