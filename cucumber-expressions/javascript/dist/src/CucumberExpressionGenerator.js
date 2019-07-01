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
var ParameterTypeMatcher_1 = __importDefault(require("./ParameterTypeMatcher"));
var ParameterType_1 = __importDefault(require("./ParameterType"));
var util_1 = __importDefault(require("util"));
var CombinatorialGeneratedExpressionFactory_1 = __importDefault(require("./CombinatorialGeneratedExpressionFactory"));
var CucumberExpressionGenerator = /** @class */ (function () {
    function CucumberExpressionGenerator(parameterTypeRegistry) {
        this.parameterTypeRegistry = parameterTypeRegistry;
    }
    CucumberExpressionGenerator.prototype.generateExpressions = function (text) {
        var parameterTypeCombinations = [];
        var parameterTypeMatchers = this._createParameterTypeMatchers(text);
        var expressionTemplate = '';
        var pos = 0;
        var _loop_1 = function () {
            var e_1, _a, e_2, _b;
            var matchingParameterTypeMatchers = [];
            try {
                for (var parameterTypeMatchers_1 = (e_1 = void 0, __values(parameterTypeMatchers)), parameterTypeMatchers_1_1 = parameterTypeMatchers_1.next(); !parameterTypeMatchers_1_1.done; parameterTypeMatchers_1_1 = parameterTypeMatchers_1.next()) {
                    var parameterTypeMatcher = parameterTypeMatchers_1_1.value;
                    var advancedParameterTypeMatcher = parameterTypeMatcher.advanceTo(pos);
                    if (advancedParameterTypeMatcher.find) {
                        matchingParameterTypeMatchers.push(advancedParameterTypeMatcher);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (parameterTypeMatchers_1_1 && !parameterTypeMatchers_1_1.done && (_a = parameterTypeMatchers_1.return)) _a.call(parameterTypeMatchers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (matchingParameterTypeMatchers.length > 0) {
                matchingParameterTypeMatchers = matchingParameterTypeMatchers.sort(ParameterTypeMatcher_1.default.compare);
                // Find all the best parameter type matchers, they are all candidates.
                var bestParameterTypeMatcher_1 = matchingParameterTypeMatchers[0];
                var bestParameterTypeMatchers = matchingParameterTypeMatchers.filter(function (m) { return ParameterTypeMatcher_1.default.compare(m, bestParameterTypeMatcher_1) === 0; });
                // Build a list of parameter types without duplicates. The reason there
                // might be duplicates is that some parameter types have more than one regexp,
                // which means multiple ParameterTypeMatcher objects will have a reference to the
                // same ParameterType.
                // We're sorting the list so preferential parameter types are listed first.
                // Users are most likely to want these, so they should be listed at the top.
                var parameterTypes = [];
                try {
                    for (var bestParameterTypeMatchers_1 = (e_2 = void 0, __values(bestParameterTypeMatchers)), bestParameterTypeMatchers_1_1 = bestParameterTypeMatchers_1.next(); !bestParameterTypeMatchers_1_1.done; bestParameterTypeMatchers_1_1 = bestParameterTypeMatchers_1.next()) {
                        var parameterTypeMatcher = bestParameterTypeMatchers_1_1.value;
                        if (parameterTypes.indexOf(parameterTypeMatcher.parameterType) === -1) {
                            parameterTypes.push(parameterTypeMatcher.parameterType);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (bestParameterTypeMatchers_1_1 && !bestParameterTypeMatchers_1_1.done && (_b = bestParameterTypeMatchers_1.return)) _b.call(bestParameterTypeMatchers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                parameterTypes = parameterTypes.sort(ParameterType_1.default.compare);
                parameterTypeCombinations.push(parameterTypes);
                expressionTemplate += escape(text.slice(pos, bestParameterTypeMatcher_1.start));
                expressionTemplate += '{%s}';
                pos =
                    bestParameterTypeMatcher_1.start + bestParameterTypeMatcher_1.group.length;
            }
            else {
                return "break";
            }
            if (pos >= text.length) {
                return "break";
            }
        };
        // eslint-disable-next-line no-constant-condition
        while (true) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        expressionTemplate += escape(text.slice(pos));
        return new CombinatorialGeneratedExpressionFactory_1.default(expressionTemplate, parameterTypeCombinations).generateExpressions();
    };
    /**
     * @deprecated
     */
    CucumberExpressionGenerator.prototype.generateExpression = function (text) {
        var _this = this;
        return util_1.default.deprecate(function () { return _this.generateExpressions(text)[0]; }, 'CucumberExpressionGenerator.generateExpression: Use CucumberExpressionGenerator.generateExpressions instead')();
    };
    CucumberExpressionGenerator.prototype._createParameterTypeMatchers = function (text) {
        var e_3, _a;
        var parameterMatchers = [];
        try {
            for (var _b = __values(this.parameterTypeRegistry.parameterTypes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var parameterType = _c.value;
                if (parameterType.useForSnippets) {
                    parameterMatchers = parameterMatchers.concat(CucumberExpressionGenerator.createParameterTypeMatchers2(parameterType, text));
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return parameterMatchers;
    };
    CucumberExpressionGenerator.createParameterTypeMatchers2 = function (parameterType, text) {
        var e_4, _a;
        // TODO: [].map
        var result = [];
        try {
            for (var _b = __values(parameterType.regexpStrings), _c = _b.next(); !_c.done; _c = _b.next()) {
                var regexp = _c.value;
                result.push(new ParameterTypeMatcher_1.default(parameterType, regexp, text));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return result;
    };
    return CucumberExpressionGenerator;
}());
exports.default = CucumberExpressionGenerator;
function escape(s) {
    return s
        .replace(/%/g, '%%') // for util.format
        .replace(/\(/g, '\\(')
        .replace(/{/g, '\\{')
        .replace(/\//g, '\\/');
}
module.exports = CucumberExpressionGenerator;
//# sourceMappingURL=CucumberExpressionGenerator.js.map