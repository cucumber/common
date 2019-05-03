"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var Argument = /** @class */ (function () {
    function Argument(group, parameterType) {
        this.group = group;
        this.parameterType = parameterType;
        this.group = group;
        this.parameterType = parameterType;
    }
    Argument.build = function (treeRegexp, text, parameterTypes) {
        var group = treeRegexp.match(text);
        if (!group) {
            return null;
        }
        var argGroups = group.children;
        if (argGroups.length !== parameterTypes.length) {
            throw new errors_1.CucumberExpressionError("Expression " + treeRegexp.regexp + " has " + argGroups.length + " capture groups (" + argGroups.map(function (g) { return g.value; }) + "), but there were " + parameterTypes.length + " parameter types (" + parameterTypes.map(function (p) { return p.name; }) + ")");
        }
        return parameterTypes.map(function (parameterType, i) { return new Argument(argGroups[i], parameterType); });
    };
    /**
     * Get the value returned by the parameter type's transformer function.
     *
     * @param thisObj the object in which the transformer function is applied.
     */
    Argument.prototype.getValue = function (thisObj) {
        var groupValues = this.group ? this.group.values : null;
        return this.parameterType.transform(thisObj, groupValues);
    };
    return Argument;
}());
exports.default = Argument;
module.exports = Argument;
//# sourceMappingURL=argument.js.map