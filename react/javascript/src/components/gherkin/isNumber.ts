// Lifted from cucumber-expressions/javascript/src/ParameterTypeRegistry#FLOAT_REGEXP
const numberPattern = /(?=.*\d.*)[-+]?\d*(?:\.(?=\d.*))?\d*(?:\d+[E][+-]?\d+)?/

export default function isNumber(s: string): boolean {
  return !!s.match(numberPattern)
}
