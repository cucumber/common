class ImplementionDetail {
  validate(gherkinDocument, uri) {
    const errors = []
    for (const featureChild of gherkinDocument.feature.children) {
      for (const step of featureChild.steps) {
        if (step.text.match(/button/)) {
          errors.push({
            message: 'Implementation detail: button',
            source: {
              uri: uri,
              start: {
                line: step.location.line
                // TODO: Add the column where the bad word was found
              }
            }
          })
        }
      }
    }
    return errors
  }
}

export default ImplementionDetail