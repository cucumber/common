import { isArray, isPlainObject, isSymbol } from 'is-what'

type Extension = (param1: any, param2: any) => any

interface IConfig {
  extensions: Extension[]
}

function assignProp (carry, key, newVal, originalObject) {
  const propType = originalObject.propertyIsEnumerable(key)
    ? 'enumerable'
    : 'nonenumerable'
  if (propType === 'enumerable') carry[key] = newVal
  if (propType === 'nonenumerable') {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    })
  }
}

function mergeRecursively(origin: any, newComer: any, extensions: Extension[]) {
  // work directly on newComer if its not an object
  if (!isPlainObject(newComer)) {
    // extend merge rules
    if (extensions && isArray(extensions)) {
      extensions.forEach(extend => {
        newComer = extend(origin, newComer)
      })
    }
    return newComer
  }
  // define newObject to merge all values upon
  let newObject = {}
  if (isPlainObject(origin)) {
    const props = Object.getOwnPropertyNames(origin)
    const symbols = Object.getOwnPropertySymbols(origin)
    newObject = [...props, ...symbols]
      .reduce((carry, key) => {
        // @ts-ignore
        const targetVal = origin[key]
        if (
          (!isSymbol(key) && !Object.getOwnPropertyNames(newComer).includes(key)) ||
          (isSymbol(key) && !Object.getOwnPropertySymbols(newComer).includes(key))
        ) {
          assignProp(carry, key, targetVal, origin)
        }
        return carry
      }, {})
  }
  const props = Object.getOwnPropertyNames(newComer)
  const symbols = Object.getOwnPropertySymbols(newComer)
  let result = [...props, ...symbols]
    .reduce((carry, key) => {
      // re-define the origin and newComer as targetVal and newVal
      let newVal = newComer[key]
      const targetVal = (isPlainObject(origin))
        // @ts-ignore
        ? origin[key]
        : undefined
      // extend merge rules
      if (extensions && isArray(extensions)) {
        extensions.forEach(extend => {
          newVal = extend(targetVal, newVal)
        })
      }
      // When newVal is an object do the merge recursively
      if (targetVal !== undefined && isPlainObject(newVal)) {
        newVal = mergeRecursively(targetVal, newVal, extensions)
      }
      assignProp(carry, key, newVal, newComer)
      return carry
    }, newObject)
  return result
}

/**
 * Merge anything recursively.
 * Objects get merged, special objects (classes etc.) are re-assigned "as is".
 * Basic types overwrite objects or other basic types.
 *
 * @param {(IConfig | any)} origin
 * @param {...any[]} newComers
 * @returns the result
 */
export default function merge (origin: IConfig | any, ...newComers: any[]) {
  let extensions = null
  let base = origin
  if (isPlainObject(origin) && origin.extensions && Object.keys(origin).length === 1) {
    base = {}
    extensions = origin.extensions
  }
  return newComers.reduce((result, newComer) => {
    return mergeRecursively(result, newComer, extensions)
  }, base)
}
