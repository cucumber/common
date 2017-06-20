const Argument = require('./argument')
const Group = require('./group')

const buildArguments = (regexp, text, parameterTypes) => {
  const m = regexp.exec(text)
  if (!m) return null

  const matchGroup = new Group(m, text)
  const argGroups = matchGroup.children

  const args = []
  for (let i = 0; i < parameterTypes.length; i++) {
    const argGroup = i < argGroups.length ? argGroups[i] : null
    let groupValues = null
    if (argGroup !== null) {
      if (argGroup.children.length === 0) {
        groupValues = [argGroup.value]
      } else {
        groupValues = argGroup.children.map(g => g.value)
      }
    }
    const parameterType = parameterTypes[i]
    const argument = new Argument(groupValues, parameterType)
    args.push(argument)
  }
  return args
}

module.exports = buildArguments
