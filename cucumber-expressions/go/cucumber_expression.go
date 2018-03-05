package cucumberexpressions

// const Argument = require('./argument')
// const TreeRegexp = require('./tree_regexp')
// const { UndefinedParameterTypeError } = require('./errors')
//
// class CucumberExpression {
//   /**
//    * @param expression
//    * @param parameterTypeRegistry
//    */
//   constructor(expression, parameterTypeRegistry) {
//     // Does not include (){} characters because they have special meaning
//     const ESCAPE_REGEXP = /([\\^[$.|?*+])/g
//     const PARAMETER_REGEXP = /{([^}]+)}/g
//     const OPTIONAL_REGEXP = /(\\\\)?\(([^)]+)\)/g
//     const ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = /([^\s^/]+)((\/[^\s^/]+)+)/g
//
//     this._expression = expression
//     this._parameterTypes = []
//     let regexp = '^'
//     let match
//     let matchOffset = 0
//
//     // Does not include (){} because they have special meaning
//
//     expression = expression.replace(ESCAPE_REGEXP, '\\$1')
//
//     // Create non-capturing, optional capture groups from parenthesis
//     expression = expression.replace(
//       OPTIONAL_REGEXP,
//       (match, p1, p2) => (p1 === '\\\\' ? `\\(${p2}\\)` : `(?:${p2})?`)
//     )
//
//     expression = expression.replace(
//       ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP,
//       (_, p1, p2) => `(?:${p1}${p2.replace(/\//g, '|')})`
//     )
//
//     while ((match = PARAMETER_REGEXP.exec(expression)) !== null) {
//       const typeName = match[1]
//
//       const parameterType = parameterTypeRegistry.lookupByTypeName(typeName)
//       if (!parameterType) throw new UndefinedParameterTypeError(typeName)
//       this._parameterTypes.push(parameterType)
//
//       const text = expression.slice(matchOffset, match.index)
//       const captureRegexp = buildCaptureRegexp(parameterType.regexps)
//       matchOffset = PARAMETER_REGEXP.lastIndex
//       regexp += text
//       regexp += captureRegexp
//     }
//     regexp += expression.slice(matchOffset)
//     regexp += '$'
//     this._treeRegexp = new TreeRegexp(regexp)
//   }
//
//   match(text) {
//     return Argument.build(this._treeRegexp, text, this._parameterTypes)
//   }
//
//   get regexp() {
//     return this._treeRegexp.regexp
//   }
//
//   get source() {
//     return this._expression
//   }
// }
//
// function buildCaptureRegexp(regexps) {
//   if (regexps.length === 1) {
//     return `(${regexps[0]})`
//   }
//
//   const captureGroups = regexps.map(group => {
//     return `(?:${group})`
//   })
//
//   return `(${captureGroups.join('|')})`
// }
//
// module.exports = CucumberExpression
