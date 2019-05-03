"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("util"));
var GeneratedExpression = /** @class */ (function () {
    function GeneratedExpression(expressionTemplate, parameterTypes) {
        this.expressionTemplate = expressionTemplate;
        this.parameterTypes = parameterTypes;
    }
    Object.defineProperty(GeneratedExpression.prototype, "source", {
        get: function () {
            return util_1.default.format.apply(util_1.default, __spread([this.expressionTemplate], this.parameterTypes.map(function (t) { return t.name; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeneratedExpression.prototype, "parameterNames", {
        /**
         * Returns an array of parameter names to use in generated function/method signatures
         *
         * @returns {Array.<String>}
         */
        get: function () {
            var usageByTypeName = {};
            return this.parameterTypes.map(function (t) {
                return getParameterName(t.name, usageByTypeName);
            });
        },
        enumerable: true,
        configurable: true
    });
    return GeneratedExpression;
}());
exports.default = GeneratedExpression;
function getParameterName(typeName, usageByTypeName) {
    var count = usageByTypeName[typeName];
    count = count ? count + 1 : 1;
    usageByTypeName[typeName] = count;
    return count === 1 ? typeName : "" + typeName + count;
}
//# sourceMappingURL=generated_expression.js.map