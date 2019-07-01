"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ParameterType_1 = __importDefault(require("./ParameterType"));
var CucumberExpressionGenerator_1 = __importDefault(require("./CucumberExpressionGenerator"));
var Errors_1 = require("./Errors");
var ParameterTypeRegistry = /** @class */ (function () {
    function ParameterTypeRegistry() {
        this.parameterTypeByName = new Map();
        this.parameterTypesByRegexp = new Map();
        this.defineParameterType(new ParameterType_1.default('int', ParameterTypeRegistry.INTEGER_REGEXPS, Number, function (s) { return (s === undefined ? null : Number(s)); }, true, true));
        this.defineParameterType(new ParameterType_1.default('float', ParameterTypeRegistry.FLOAT_REGEXP, Number, function (s) { return (s === undefined ? null : parseFloat(s)); }, true, false));
        this.defineParameterType(new ParameterType_1.default('word', ParameterTypeRegistry.WORD_REGEXP, String, function (s) { return s; }, false, false));
        this.defineParameterType(new ParameterType_1.default('string', ParameterTypeRegistry.STRING_REGEXP, String, function (s) { return s.replace(/\\"/g, '"').replace(/\\'/g, "'"); }, true, false));
        this.defineParameterType(new ParameterType_1.default('', ParameterTypeRegistry.ANONYMOUS_REGEXP, String, function (s) { return s; }, false, true));
    }
    Object.defineProperty(ParameterTypeRegistry.prototype, "parameterTypes", {
        get: function () {
            return this.parameterTypeByName.values();
        },
        enumerable: true,
        configurable: true
    });
    ParameterTypeRegistry.prototype.lookupByTypeName = function (typeName) {
        return this.parameterTypeByName.get(typeName);
    };
    ParameterTypeRegistry.prototype.lookupByRegexp = function (parameterTypeRegexp, expressionRegexp, text) {
        var parameterTypes = this.parameterTypesByRegexp.get(parameterTypeRegexp);
        if (!parameterTypes) {
            return null;
        }
        if (parameterTypes.length > 1 && !parameterTypes[0].preferForRegexpMatch) {
            // We don't do this check on insertion because we only want to restrict
            // ambiguiuty when we look up by Regexp. Users of CucumberExpression should
            // not be restricted.
            var generatedExpressions = new CucumberExpressionGenerator_1.default(this).generateExpressions(text);
            throw Errors_1.AmbiguousParameterTypeError.forRegExp(parameterTypeRegexp, expressionRegexp, parameterTypes, generatedExpressions);
        }
        return parameterTypes[0];
    };
    ParameterTypeRegistry.prototype.defineParameterType = function (parameterType) {
        var e_1, _a;
        if (parameterType.name !== undefined) {
            if (this.parameterTypeByName.has(parameterType.name)) {
                if (parameterType.name.length === 0) {
                    throw new Error("The anonymous parameter type has already been defined");
                }
                else {
                    throw new Error("There is already a parameter type with name " + parameterType.name);
                }
            }
            this.parameterTypeByName.set(parameterType.name, parameterType);
        }
        try {
            for (var _b = __values(parameterType.regexpStrings), _c = _b.next(); !_c.done; _c = _b.next()) {
                var parameterTypeRegexp = _c.value;
                if (!this.parameterTypesByRegexp.has(parameterTypeRegexp)) {
                    this.parameterTypesByRegexp.set(parameterTypeRegexp, []);
                }
                var parameterTypes = this.parameterTypesByRegexp.get(parameterTypeRegexp);
                var existingParameterType = parameterTypes[0];
                if (parameterTypes.length > 0 &&
                    existingParameterType.preferForRegexpMatch &&
                    parameterType.preferForRegexpMatch) {
                    throw new Errors_1.CucumberExpressionError('There can only be one preferential parameter type per regexp. ' +
                        ("The regexp /" + parameterTypeRegexp + "/ is used for two preferential parameter types, {" + existingParameterType.name + "} and {" + parameterType.name + "}"));
                }
                if (parameterTypes.indexOf(parameterType) === -1) {
                    parameterTypes.push(parameterType);
                    this.parameterTypesByRegexp.set(parameterTypeRegexp, parameterTypes.sort(ParameterType_1.default.compare));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ParameterTypeRegistry.INTEGER_REGEXPS = [/-?\d+/, /\d+/];
    ParameterTypeRegistry.FLOAT_REGEXP = /-?\d*(?:[.,]\d+)?/;
    ParameterTypeRegistry.WORD_REGEXP = /[^\s]+/;
    ParameterTypeRegistry.STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/;
    ParameterTypeRegistry.ANONYMOUS_REGEXP = /.*/;
    return ParameterTypeRegistry;
}());
exports.default = ParameterTypeRegistry;
module.exports = ParameterTypeRegistry;
//# sourceMappingURL=ParameterTypeRegistry.js.map