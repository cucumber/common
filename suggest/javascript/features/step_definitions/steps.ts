import { DataTable, Given, Then, When } from '@cucumber/cucumber'
import World from '../support/World'
import assert from 'assert'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import bruteForceIndex from '../../test/bruteForceIndex'
import buildStepDocuments from '../../src/buildStepDocuments'
import { lspCompletionSnippet } from '../../src'

Given('the following Gherkin step texts exist:', function (this: World, stepsTable: DataTable) {
  this.steps = stepsTable.rows().map((row) => row[0])
})

Given(
  'the following Step Definitions exist:',
  function (this: World, stepDefinitionsTable: DataTable) {
    const parameterTypeRegistry = new ParameterTypeRegistry()
    this.expressions = stepDefinitionsTable
      .rows()
      .map((row) => new CucumberExpression(row[0], parameterTypeRegistry))
  }
)

When('I type {string}', function (this: World, text: string) {
  const permutationExpressions = buildStepDocuments(this.steps, this.expressions)
  const index = bruteForceIndex(permutationExpressions)
  this.suggestedStepDocuments = index(text)
})

When('I select the {ordinal} snippet', function (this: World, selectedSuggestionIndex: number) {
  this.selectedSuggestionIndex = selectedSuggestionIndex
})

Then('the suggestions should be:', function (this: World, expectedSuggetionsTable: DataTable) {
  const expectedSuggestions: readonly string[] = expectedSuggetionsTable.rows().map((row) => row[0])
  assert.deepStrictEqual(
    this.suggestedStepDocuments.map((doc) => doc.suggestion),
    expectedSuggestions
  )
})

Then('the suggestions should be empty', function (this: World) {
  assert.deepStrictEqual(this.suggestedStepDocuments, [])
})

Then('the inserted text should be {string}', function (this: World, expectedText: string) {
  const selectedSuggestion = this.suggestedStepDocuments[this.selectedSuggestionIndex]
  assert.strictEqual(lspCompletionSnippet(selectedSuggestion.segments), expectedText)
})
