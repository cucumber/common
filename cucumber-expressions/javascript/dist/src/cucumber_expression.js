"use strict";

const Argument = require('./argument');

const TreeRegexp = require('./tree_regexp');

const ParameterType = require('./parameter_type');

const {
  UndefinedParameterTypeError,
  CucumberExpressionError
} = require('./errors'); // RegExps with the g flag are stateful in JavaScript. In order to be able
// to reuse them we have to wrap them in a function.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
// Does not include (){} characters because they have special meaning


const ESCAPE_REGEXP = () => /([\\^[$.|?*+])/g;

const PARAMETER_REGEXP = () => /(\\\\)?{([^}]*)}/g;

const OPTIONAL_REGEXP = () => /(\\\\)?\(([^)]+)\)/g;

const ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = () => /([^\s^/]+)((\/[^\s^/]+)+)/g;

const DOUBLE_ESCAPE = '\\\\';
const PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = 'Parameter types cannot be alternative: ';
const PARAMETER_TYPES_CANNOT_BE_OPTIONAL = 'Parameter types cannot be optional: ';

class CucumberExpression {
  /**
   * @param expression
   * @param parameterTypeRegistry
   */
  constructor(expression, parameterTypeRegistry) {
    this._expression = expression;
    this._parameterTypes = [];
    expression = this.processEscapes(expression);
    expression = this.processOptional(expression);
    expression = this.processAlternation(expression);
    expression = this.processParameters(expression, parameterTypeRegistry);
    expression = `^${expression}$`;
    this._treeRegexp = new TreeRegexp(expression);
  }

  processEscapes(expression) {
    return expression.replace(ESCAPE_REGEXP(), '\\$1');
  }

  processOptional(expression) {
    return expression.replace(OPTIONAL_REGEXP(), (match, p1, p2) => {
      if (p1 === DOUBLE_ESCAPE) {
        return `\\(${p2}\\)`;
      }

      this._checkNoParameterType(p2, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);

      return `(?:${p2})?`;
    });
  }

  processAlternation(expression) {
    return expression.replace(ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP(), match => {
      // replace \/ with /
      // replace / with |
      const replacement = match.replace(/\//g, '|').replace(/\\\|/g, '/');

      if (replacement.indexOf('|') !== -1) {
        for (const part of replacement.split(/\|/)) {
          this._checkNoParameterType(part, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
        }

        return `(?:${replacement})`;
      } else {
        return replacement;
      }
    });
  }

  processParameters(expression, parameterTypeRegistry) {
    return expression.replace(PARAMETER_REGEXP(), (match, p1, p2) => {
      if (p1 === DOUBLE_ESCAPE) return `\\{${p2}\\}`;
      const typeName = p2;
      ParameterType.checkParameterTypeName(typeName);
      const parameterType = parameterTypeRegistry.lookupByTypeName(typeName);
      if (!parameterType) throw new UndefinedParameterTypeError(typeName);

      this._parameterTypes.push(parameterType);

      return buildCaptureRegexp(parameterType.regexps);
    });
  }

  match(text) {
    return Argument.build(this._treeRegexp, text, this._parameterTypes);
  }

  get regexp() {
    return this._treeRegexp.regexp;
  }

  get source() {
    return this._expression;
  }

  _checkNoParameterType(s, message) {
    if (s.match(PARAMETER_REGEXP())) {
      throw new CucumberExpressionError(message + this.source);
    }
  }

}

function buildCaptureRegexp(regexps) {
  if (regexps.length === 1) {
    return `(${regexps[0]})`;
  }

  const captureGroups = regexps.map(group => {
    return `(?:${group})`;
  });
  return `(${captureGroups.join('|')})`;
}

module.exports = CucumberExpression;