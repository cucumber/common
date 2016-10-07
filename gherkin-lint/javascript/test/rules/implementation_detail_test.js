import assert from 'assert'
import ImplementationDetail from '../../lib/rules/implementation_detail'
import Gherkin from "gherkin"

describe(ImplementationDetail.name, () => {
  it("should emit warning when a stap has the word button", () => {
    const rule = new ImplementationDetail()
    const gherkinDocument = new Gherkin.Parser().parse(`Feature:
  Scenario: hello
    Given a button
`)

    const warnings = rule.validate(gherkinDocument, 'some/path.feature')
    assert.equal(warnings.length, 1)
    assert.equal(warnings[0].source.start.line, 3)
    assert.equal(warnings[0].source.uri, 'some/path.feature')
  })
})