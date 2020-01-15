import {
  isObject,
  isPlainObject,
  isAnyObject,
  isUndefined,
  isNull,
  isFunction,
  isArray,
  isString,
  isEmptyString,
  isFullString,
  isBoolean,
  isRegExp,
  isNumber,
  isDate,
  isSymbol,
  isPrimitive,
  isType,
  isBlob,
  isFile,
} from '../dist/index.cjs'

test('Basic true tests', () => {
  expect(isUndefined(undefined)).toBe(true)
  expect(isNull(null)).toBe(true)
  expect(isObject({})).toBe(true)
  expect(isObject(new Object())).toBe(true)
  expect(isFunction(_ => {})).toBe(true)
  expect(isArray([])).toBe(true)
  expect(isArray(new Array())).toBe(true)
  expect(isString('')).toBe(true)
  expect(isString('_')).toBe(true)
  expect(isEmptyString('')).toBe(true)
  expect(isFullString(' ')).toBe(true)
  expect(isBoolean(true)).toBe(true)
  expect(isBoolean(false)).toBe(true)
  expect(isRegExp(/./)).toBe(true)
  expect(isRegExp(/./gi)).toBe(true)
  expect(isNumber(0)).toBe(true)
  expect(isNumber(1)).toBe(true)
  expect(isDate(new Date())).toBe(true)
  expect(isSymbol(Symbol())).toBe(true)
  expect(isBlob(new Blob())).toBe(true)
  expect(isFile(new File([''], '', { type: 'text/html' }))).toBe(true)
})

test('Basic false tests', () => {
  expect(isNumber(NaN)).toBe(false)
  expect(isDate(new Date('_'))).toBe(false)
  expect(isDate(NaN)).toBe(false)
  expect(isUndefined(NaN)).toBe(false)
  expect(isNull(NaN)).toBe(false)
  expect(isObject(NaN)).toBe(false)
  expect(isFunction(NaN)).toBe(false)
  expect(isArray(NaN)).toBe(false)
  expect(isString(NaN)).toBe(false)
  expect(isEmptyString(' ')).toBe(false)
  expect(isFullString('')).toBe(false)
  expect(isBoolean(NaN)).toBe(false)
  expect(isRegExp(NaN)).toBe(false)
  expect(isSymbol(NaN)).toBe(false)
})

test('Primitive tests', () => {
  // true
  expect(isPrimitive(0)).toBe(true)
  expect(isPrimitive('')).toBe(true)
  expect(isPrimitive('str')).toBe(true)
  expect(isPrimitive(Symbol())).toBe(true)
  expect(isPrimitive(true)).toBe(true)
  expect(isPrimitive(false)).toBe(true)
  expect(isPrimitive(null)).toBe(true)
  expect(isPrimitive(undefined)).toBe(true)
  // false
  expect(isPrimitive(NaN)).toBe(false)
  expect(isPrimitive([])).toBe(false)
  expect(isPrimitive(new Array())).toBe(false)
  expect(isPrimitive({})).toBe(false)
  expect(isPrimitive(new Object())).toBe(false)
  expect(isPrimitive(new Date())).toBe(false)
  expect(isPrimitive(_ => {})).toBe(false)
})

test('Date exception', () => {
  expect(isDate(new Date('_'))).toBe(false)
})

test('Generic isType', () => {
  function MyClass () {}
  // This is correct old fashion syntax for classes, if this is missing
  MyClass.prototype.constructor = MyClass
  class MyOtherClass {}
  const myClass = new MyClass()
  // this is expected behaviour
  expect(isType('', String)).toBe(true)
  expect(isType('_', String)).toBe(true)
  expect(isType('Hello World', String)).toBe(true)
  expect(isType(NaN, Number)).toBe(true)
  expect(isType(0, Number)).toBe(true)
  expect(isType(1, Number)).toBe(true)
  expect(isType({}, Object)).toBe(true)
  expect(isType(new Object(), Object)).toBe(true)
  expect(isType([], Array)).toBe(true)
  expect(isType(new Array(), Array)).toBe(true)
  expect(isType(_ => {}, Function)).toBe(true)
  expect(isType(true, Boolean)).toBe(true)
  expect(isType(false, Boolean)).toBe(true)
  expect(isType(new Date('_'), Date)).toBe(true)
  expect(isType(new Date(), Date)).toBe(true)
  expect(isType(/./, RegExp)).toBe(true)
  expect(isType(/./gi, RegExp)).toBe(true)
  expect(isType(myClass, MyClass)).toBe(true)
  expect(isType(new MyOtherClass(), MyOtherClass)).toBe(true)
  expect(isType(myClass, MyOtherClass)).toBe(false)
  expect(isType(Symbol(), Symbol)).toBe(true)
  // expect(isType(null, Null)).toBe(true)
  // expect(isType(undefined, Undefined)).toBe(true)
  // It SHOULD fail
  expect(isType(5, String)).toBe(false)
  expect(isType(null, Object)).toBe(false)
  // Not sure if this would be the expected behaviour but everything is an object
  // so I would say so
  expect(isType(myClass, Object)).toBe(true)
})

test('isObject vs isAnyObject', () => {
  function MyClass () {}
  // This is correct old fashion syntax for classes, if this is missing
  MyClass.prototype.constructor = MyClass
  const myClass = new MyClass()
  class MyClass2 {}
  const myClass2 = new MyClass()
  const mySpecialObject = {}
  Object.setPrototypeOf(mySpecialObject, {toDate: function () { return new Date() }})
  // IS OBJECT
  // plain object
  expect(isObject({})).toBe(true)
  expect(isObject(new Object())).toBe(true)
  expect(isPlainObject({})).toBe(true)
  expect(isPlainObject(new Object())).toBe(true)
  // classes & prototypes
  expect(isObject(myClass)).toBe(false)
  expect(isObject(myClass2)).toBe(false)
  expect(isObject(mySpecialObject)).toBe(false)
  expect(isPlainObject(myClass)).toBe(false)
  expect(isPlainObject(myClass2)).toBe(false)
  expect(isPlainObject(mySpecialObject)).toBe(false)
  // arrays and dates
  expect(isObject([])).toBe(false)
  expect(isObject(new Array())).toBe(false)
  expect(isObject(new Date('_'))).toBe(false)
  expect(isObject(new Date())).toBe(false)
  expect(isPlainObject([])).toBe(false)
  expect(isPlainObject(new Array())).toBe(false)
  expect(isPlainObject(new Date('_'))).toBe(false)
  expect(isPlainObject(new Date())).toBe(false)
  // IS ANY OBJECT
  // plain object
  expect(isAnyObject({})).toBe(true)
  expect(isAnyObject(new Object())).toBe(true)
  // classes & prototypes
  expect(isAnyObject(myClass)).toBe(true)
  expect(isAnyObject(myClass2)).toBe(true)
  expect(isAnyObject(mySpecialObject)).toBe(true)
  // arrays and dates
  expect(isAnyObject([])).toBe(false)
  expect(isAnyObject(new Array())).toBe(false)
  expect(isAnyObject(new Date('_'))).toBe(false)
  expect(isAnyObject(new Date())).toBe(false)
})
