const Argument = require('./argument')

const buildArguments = (regexp, text, parameters) => {
  const m = regexp.exec(text)
  if (!m) return null
  let parameterIndex = 0
  let offset = 0
  return m.slice(1).map(value => {
    offset = text.indexOf(value, offset)
    const transformedValue = parameters[parameterIndex++].transform(value)
    return new Argument(offset, value, transformedValue)
  })
}

module.exports = buildArguments
