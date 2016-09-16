import GherkinLint from "../../lib"

module.exports = function () {
  this.Given(/^a Gherkin document at (.*) with contents:$/, function (path, source) {
    this.path = path
    this.source = source
  })

  this.When(/^the document is linted$/, function () {
    const enabledRuleNames = [this.ruleName]
    const linter = new GherkinLint(enabledRuleNames)
    this.warningEvents = linter.lint(this.path, this.source)
  })
}