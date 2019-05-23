"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CucumberExpressionError = /** @class */ (function (_super) {
    __extends(CucumberExpressionError, _super);
    function CucumberExpressionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CucumberExpressionError;
}(Error));
exports.CucumberExpressionError = CucumberExpressionError;
var AmbiguousParameterTypeError = /** @class */ (function (_super) {
    __extends(AmbiguousParameterTypeError, _super);
    function AmbiguousParameterTypeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmbiguousParameterTypeError.forConstructor = function (keyName, keyValue, parameterTypes, generatedExpressions) {
        return new this("parameter type with " + keyName + "=" + keyValue + " is used by several parameter types: " + parameterTypes + ", " + generatedExpressions);
    };
    AmbiguousParameterTypeError.forRegExp = function (parameterTypeRegexp, expressionRegexp, parameterTypes, generatedExpressions) {
        return new this("Your Regular Expression " + expressionRegexp + "\nmatches multiple parameter types with regexp " + parameterTypeRegexp + ":\n   " + this._parameterTypeNames(parameterTypes) + "\n\nI couldn't decide which one to use. You have two options:\n\n1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:\n   " + this._expressions(generatedExpressions) + "\n\n2) Make one of the parameter types preferential and continue to use a Regular Expression.\n");
    };
    AmbiguousParameterTypeError._parameterTypeNames = function (parameterTypes) {
        return parameterTypes.map(function (p) { return "{" + p.name + "}"; }).join("\n   ");
    };
    AmbiguousParameterTypeError._expressions = function (generatedExpressions) {
        return generatedExpressions.map(function (e) { return e.source; }).join("\n   ");
    };
    return AmbiguousParameterTypeError;
}(CucumberExpressionError));
exports.AmbiguousParameterTypeError = AmbiguousParameterTypeError;
var UndefinedParameterTypeError = /** @class */ (function (_super) {
    __extends(UndefinedParameterTypeError, _super);
    function UndefinedParameterTypeError(typeName) {
        return _super.call(this, "Undefined parameter type {" + typeName + "}") || this;
    }
    return UndefinedParameterTypeError;
}(CucumberExpressionError));
exports.UndefinedParameterTypeError = UndefinedParameterTypeError;
//# sourceMappingURL=Errors.js.map