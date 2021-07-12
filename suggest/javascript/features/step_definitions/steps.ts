import { DataTable, Given, Then, When } from '@cucumber/cucumber'
import World from '../support/World'
import assert from 'assert'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import bruteForceIndex from '../../src/bruteForceIndex'
import buildPermutationExpressions from '../../src/buildPermutationExpressions'
import lspCompletionSnippet from '../../src/lspCompletionSnippet'

Given('the following Gherkin steps exist:', function (this: World, stepsTable: DataTable) {
  this.steps = stepsTable.rows().map(row => row[0])
})

Given('the following Step Definitions exist:', function (this: World, stepDefinitionsTable: DataTable) {
  const parameterTypeRegistry = new ParameterTypeRegistry()
  this.expressions = stepDefinitionsTable.rows().map(row => new CucumberExpression(row[0], parameterTypeRegistry))
})

When('I type {string}', function (this: World, text: string) {
  const permutationExpressions = buildPermutationExpressions(this.steps, this.expressions)
  const index = bruteForceIndex(permutationExpressions)
  this.permutationExpressions = index(text)
})

Then('the lsp completion snippets should be:', function (this: World, expectedSuggetionsTable: DataTable) {
  const expectedSuggestions: readonly string[] = expectedSuggetionsTable.rows().map((row) => (row[0]))
  assert.deepStrictEqual(this.permutationExpressions.map(lspCompletionSnippet), expectedSuggestions)
})

Then('the lsp completion snippets should be empty', function (this: World) {
  assert.deepStrictEqual(this.permutationExpressions, [])
})
