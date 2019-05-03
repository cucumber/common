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
var parameter_type_1 = __importDefault(require("./parameter_type"));
var cucumber_expression_generator_1 = __importDefault(require("./cucumber_expression_generator"));
var errors_1 = require("./errors");
var INTEGER_REGEXPS = [/-?\d+/, /\d+/];
var FLOAT_REGEXP = /-?\d*\.?\d+/;
var WORD_REGEXP = /[^\s]+/;
var STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/;
var ANONYMOUS_REGEXP = /.*/;
var ParameterTypeRegistry = /** @class */ (function () {
    function ParameterTypeRegistry() {
        this.parameterTypeByName = new Map();
        this.parameterTypesByRegexp = new Map();
        this.defineParameterType(new parameter_type_1.default("int", INTEGER_REGEXPS, Number, function (s) { return (s === undefined ? null : Number(s)); }, true, true));
        this.defineParameterType(new parameter_type_1.default("float", FLOAT_REGEXP, Number, function (s) { return (s === undefined ? null : parseFloat(s)); }, true, false));
        this.defineParameterType(new parameter_type_1.default("word", WORD_REGEXP, String, function (s) { return s; }, false, false));
        this.defineParameterType(new parameter_type_1.default("string", STRING_REGEXP, String, function (s) { return s.replace(/\\"/g, '"').replace(/\\'/g, "'"); }, true, false));
        this.defineParameterType(new parameter_type_1.default("", ANONYMOUS_REGEXP, String, function (s) { return s; }, false, true));
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
            var generatedExpressions = new cucumber_expression_generator_1.default(this).generateExpressions(text);
            throw errors_1.AmbiguousParameterTypeError.forRegExp(parameterTypeRegexp, expressionRegexp, parameterTypes, generatedExpressions);
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
                    throw new errors_1.CucumberExpressionError("There can only be one preferential parameter type per regexp. " +
                        ("The regexp /" + parameterTypeRegexp + "/ is used for two preferential parameter types, {" + existingParameterType.name + "} and {" + parameterType.name + "}"));
                }
                if (parameterTypes.indexOf(parameterType) === -1) {
                    parameterTypes.push(parameterType);
                    this.parameterTypesByRegexp.set(parameterTypeRegexp, parameterTypes.sort(parameter_type_1.default.compare));
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
    return ParameterTypeRegistry;
}());
exports.default = ParameterTypeRegistry;
module.exports = ParameterTypeRegistry;
//# sourceMappingURL=parameter_type_registry.js.map