import Argument from './argument'

const matchArguments = (regexp, text, transforms) => {
  const m = regexp.exec(text)
  if (!m) return null
  let transformIndex = 0
  let offset = 0
  return m.slice(1).map(value => {
    offset = text.indexOf(value, offset)
    const transformedValue = transforms[transformIndex++].transform(value)
    return new Argument(offset, value, transformedValue)
  })
}

export default matchArguments