import { isArray } from 'is-what'

export function concatArrays (originVal, newVal) {
  if (isArray(originVal) && isArray(newVal)) {
    // concat logic
    return originVal.concat(newVal)
  }
  return newVal // always return newVal as fallback!!
}
