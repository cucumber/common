const Argument = require('./argument')

const buildArguments = (regexp, text, parameterTypes) => {
  const m = regexp.exec(text)
  if (!m) return null
  let parameterTypeIndex = 0
  let offset = 0
  return m.slice(1).map(value => {
    offset = text.indexOf(value, offset)
    const parameter = parameterTypes[parameterTypeIndex++]
    return new Argument(offset, value, parameter)
  })
}

module.exports = buildArguments
