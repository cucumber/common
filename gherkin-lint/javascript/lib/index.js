import Gherkin from "gherkin"
import ImplementionDetail from './rules/implementation_detail'
const parser = new Gherkin.Parser()

class GherkinLint {
  // TODO: Pass in a list of "configured" rule objects, or perhaps just pass in
  // a config object here
  constructor(enabledRuleNames) {
    this._enabledRuleNames = enabledRuleNames
  }

  lint(path, source) {
    let errorEvents = []

    try {
      const gherkinDocument = parser.parse(source)
      if(this._enabledRuleNames[0] == 'implementation-detail') {
        const rule = new ImplementionDetail()
        const ruleErrorEvents = rule.validate(gherkinDocument, path)
        errorEvents = errorEvents.concat(ruleErrorEvents)
      }
    } catch (err) {
      // If err is a Gherkin.Errors.CompositeParserException then there are more errors on the .errors property
      const errors = err.errors || [err]
      for (const e of errors) {
        errorEvents.push({
          "type": "error",
          "source": {
            "uri": path,
            "start": e.location
          },
          "message": e.message
        })
      }
    }

    return errorEvents
  }
}

export default GherkinLint
