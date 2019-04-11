"use strict";

const util = require('util');

class GeneratedExpression {
  constructor(expressionTemplate, parameterTypes) {
    this._expressionTemplate = expressionTemplate;
    this._parameterTypes = parameterTypes;
  }

  get source() {
    return util.format(this._expressionTemplate, ...this._parameterTypes.map(t => t.name));
  }
  /**
   * Returns an array of parameter names to use in generated function/method signatures
   *
   * @returns {Array.<String>}
   */


  get parameterNames() {
    const usageByTypeName = {};
    return this._parameterTypes.map(t => getParameterName(t.name, usageByTypeName));
  }
  /**
   * @returns {Array.<ParameterType>}
   */


  get parameterTypes() {
    return this._parameterTypes;
  }

}

function getParameterName(typeName, usageByTypeName) {
  let count = usageByTypeName[typeName];
  count = count ? count + 1 : 1;
  usageByTypeName[typeName] = count;
  return count === 1 ? typeName : `${typeName}${count}`;
}

module.exports = GeneratedExpression;