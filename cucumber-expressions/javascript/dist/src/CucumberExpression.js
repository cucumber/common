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
var TreeRegexp_1 = __importDefault(require("./TreeRegexp"));
var Argument_1 = __importDefault(require("./Argument"));
var Errors_1 = require("./Errors");
// RegExps with the g flag are stateful in JavaScript. In order to be able
// to reuse them we have to wrap them in a function.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
// Does not include (){} characters because they have special meaning
var ESCAPE_REGEXP = function () { return /([\\^[$.|?*+])/g; };
var PARAMETER_REGEXP = function () { return /(\\\\)?{([^}]*)}/g; };
var OPTIONAL_REGEXP = function () { return /(\\\\)?\(([^)]+)\)/g; };
var ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = function () {
    return /([^\s^/]+)((\/[^\s^/]+)+)/g;
};
var DOUBLE_ESCAPE = '\\\\';
var PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = 'Parameter types cannot be alternative: ';
var PARAMETER_TYPES_CANNOT_BE_OPTIONAL = 'Parameter types cannot be optional: ';
var CucumberExpression = /** @class */ (function () {
    /**
     * @param expression
     * @param parameterTypeRegistry
     */
    function CucumberExpression(expression, parameterTypeRegistry) {
        this.expression = expression;
        this.parameterTypeRegistry = parameterTypeRegistry;
        this.parameterTypes = [];
        var expr = this.processEscapes(expression);
        expr = this.processOptional(expr);
        expr = this.processAlternation(expr);
        expr = this.processParameters(expr, parameterTypeRegistry);
        expr = "^" + expr + "$";
        this.treeRegexp = new TreeRegexp_1.default(expr);
    }
    CucumberExpression.prototype.processEscapes = function (expression) {
        return expression.replace(ESCAPE_REGEXP(), '\\$1');
    };
    CucumberExpression.prototype.processOptional = function (expression) {
        var _this = this;
        return expression.replace(OPTIONAL_REGEXP(), function (match, p1, p2) {
            if (p1 === DOUBLE_ESCAPE) {
                return "\\(" + p2 + "\\)";
            }
            _this.checkNoParameterType(p2, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);
            return "(?:" + p2 + ")?";
        });
    };
    CucumberExpression.prototype.processAlternation = function (expression) {
        var _this = this;
        return expression.replace(ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP(), function (match) {
            var e_1, _a;
            // replace \/ with /
            // replace / with |
            var replacement = match.replace(/\//g, '|').replace(/\\\|/g, '/');
            if (replacement.indexOf('|') !== -1) {
                try {
                    for (var _b = __values(replacement.split(/\|/)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var part = _c.value;
                        _this.checkNoParameterType(part, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return "(?:" + replacement + ")";
            }
            else {
                return replacement;
            }
        });
    };
    CucumberExpression.prototype.processParameters = function (expression, parameterTypeRegistry) {
        var _this = this;
        return expression.replace(PARAMETER_REGEXP(), function (match, p1, p2) {
            if (p1 === DOUBLE_ESCAPE) {
                return "\\{" + p2 + "\\}";
            }
            var typeName = p2;
            ParameterType_1.default.checkParameterTypeName(typeName);
            var parameterType = parameterTypeRegistry.lookupByTypeName(typeName);
            if (!parameterType) {
                throw new Errors_1.UndefinedParameterTypeError(typeName);
            }
            _this.parameterTypes.push(parameterType);
            return buildCaptureRegexp(parameterType.regexpStrings);
        });
    };
    CucumberExpression.prototype.match = function (text) {
        return Argument_1.default.build(this.treeRegexp, text, this.parameterTypes);
    };
    Object.defineProperty(CucumberExpression.prototype, "regexp", {
        get: function () {
            return this.treeRegexp.regexp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CucumberExpression.prototype, "source", {
        get: function () {
            return this.expression;
        },
        enumerable: true,
        configurable: true
    });
    CucumberExpression.prototype.checkNoParameterType = function (s, message) {
        if (s.match(PARAMETER_REGEXP())) {
            throw new Errors_1.CucumberExpressionError(message + this.source);
        }
    };
    return CucumberExpression;
}());
exports.default = CucumberExpression;
function buildCaptureRegexp(regexps) {
    if (regexps.length === 1) {
        return "(" + regexps[0] + ")";
    }
    var captureGroups = regexps.map(function (group) {
        return "(?:" + group + ")";
    });
    return "(" + captureGroups.join('|') + ")";
}
//# sourceMappingURL=CucumberExpression.js.map