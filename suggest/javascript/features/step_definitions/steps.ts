import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import World from '../support/World'
import makeSuggest, { Suggestion } from '../../src/makeSuggest'
import assert from "assert";

Given('the following Gherkin steps exist:', function (this: World, stepsTable: DataTable) {
  this.steps = stepsTable.rows().map(row => row[0])
})

When('I type {string}', function (this: World, text: string) {
  const suggest = makeSuggest(this.steps)
  this.suggestions = suggest(text)
})

Then('the suggestions should be:', function (this: World, expectedSuggetionsTable: DataTable) {
  const expectedSuggestions: readonly Suggestion[] = expectedSuggetionsTable.rows().map((row) => ({
    text: row[0]
  }))
  assert.deepStrictEqual(this.suggestions, expectedSuggestions)
})
