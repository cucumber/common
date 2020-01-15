/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
export function getType (payload: any): string {
  return Object.prototype.toString.call(payload).slice(8, -1)
}

/**
 * Returns whether the payload is undefined
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */
export function isUndefined (payload: any): payload is undefined {
  return getType(payload) === 'Undefined'
}

/**
 * Returns whether the payload is null
 *
 * @param {*} payload
 * @returns {payload is null}
 */
export function isNull (payload: any): payload is null {
  return getType(payload) === 'Null'
}

/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is {[key: string]: any}}
 */
export function isPlainObject (payload: any): payload is {[key: string]: any} {
  if (getType(payload) !== 'Object') return false
  return (payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype)
}

/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is {[key: string]: any}}
 */
export function isObject (payload: any): payload is {[key: string]: any} {
  return isPlainObject(payload)
}

/**
 * Returns whether the payload is an any kind of object (including special classes or objects with different prototypes)
 *
 * @param {*} payload
 * @returns {payload is {[key: string]: any}}
 */
export function isAnyObject (payload: any): payload is {[key: string]: any} {
  return getType(payload) === 'Object'
}

/**
 * Returns whether the payload is an object like a type passed in < >
 *
 * Usage: isObjectLike<{id: any}>(payload) // will make sure it's an object and has an `id` prop.
 *
 * @template T this must be passed in < >
 * @param {*} payload
 * @returns {payload is T}
 */
export function isObjectLike<T extends object> (payload: any): payload is T {
  return isAnyObject(payload)
}

/**
 * Returns whether the payload is a function
 *
 * @param {*} payload
 * @returns {payload is Function}
 */
export function isFunction (payload: any): payload is Function {
  return getType(payload) === 'Function'
}

/**
 * Returns whether the payload is an array
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */
export function isArray (payload: any): payload is any[] {
  return getType(payload) === 'Array'
}

/**
 * Returns whether the payload is a string
 *
 * @param {*} payload
 * @returns {payload is string}
 */
export function isString (payload: any): payload is string {
  return getType(payload) === 'String'
}

/**
 * Returns whether the payload is a string, BUT returns false for ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
export function isFullString (payload: any): payload is string {
  return isString(payload) && payload !== ''
}

/**
 * Returns whether the payload is ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
export function isEmptyString (payload: any): payload is string {
  return payload === ''
}

/**
 * Returns whether the payload is a number
 *
 * This will return false for NaN
 *
 * @param {*} payload
 * @returns {payload is number}
 */
export function isNumber (payload: any): payload is number {
  return (getType(payload) === 'Number' && !isNaN(payload))
}

/**
 * Returns whether the payload is a boolean
 *
 * @param {*} payload
 * @returns {payload is boolean}
 */
export function isBoolean (payload: any): payload is boolean {
  return getType(payload) === 'Boolean'
}

/**
 * Returns whether the payload is a regular expression
 *
 * @param {*} payload
 * @returns {payload is RegExp}
 */
export function isRegExp (payload: any): payload is RegExp {
  return getType(payload) === 'RegExp'
}

/**
 * Returns whether the payload is a Symbol
 *
 * @param {*} payload
 * @returns {payload is symbol}
 */
export function isSymbol (payload: any): payload is symbol {
  return (getType(payload) === 'Symbol')
}

/**
 * Returns whether the payload is a date, and that the date is Valid
 *
 * @param {*} payload
 * @returns {payload is Date}
 */
export function isDate (payload: any): payload is Date {
  return (getType(payload) === 'Date' && !isNaN(payload))
}

/**
 * Returns whether the payload is a blob
 *
 * @param {*} payload
 * @returns {payload is Blob}
 */
export function isBlob (payload: any): payload is Blob {
  return getType(payload) === 'Blob'
}

/**
 * Returns whether the payload is a file
 *
 * @param {*} payload
 * @returns {payload is File}
 */
export function isFile (payload: any): payload is File {
  return getType(payload) === 'File'
}

/**
 * Returns whether the payload is a primitive type (eg. Boolean | Null | Undefined | Number | String | Symbol)
 *
 * @param {*} payload
 * @returns {(payload is boolean | null | undefined | number | string | symbol)}
 */
export function isPrimitive (payload: any): payload is boolean | null | undefined | number | string | symbol {
  return (
    isBoolean(payload) ||
    isNull(payload) ||
    isUndefined(payload) ||
    isNumber(payload) ||
    isString(payload) ||
    isSymbol(payload)
  )
}

/**
 * Does a generic check to check that the given payload is of a given type.
 * In cases like Number, it will return true for NaN as NaN is a Number (thanks javascript!);
 * It will, however, differentiate between object and null
 *
 * @template T
 * @param {*} payload
 * @param {T} type
 * @throws {TypeError} Will throw type error if type is an invalid type
 * @returns {payload is T}
 */
export function isType<T extends Function> (payload: any, type: T): payload is T {
  if (!(type instanceof Function)) {
    throw new TypeError('Type must be a function')
  }
  if (!type.hasOwnProperty('prototype')) {
    throw new TypeError('Type is not a class')
  }
  // Classes usually have names (as functions usually have names)
  const name: string | undefined | null = (<any>type).name
  return (getType(payload) === name) || Boolean(payload && (payload.constructor === type))
}
