"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var argument_1 = __importDefault(require("./argument"));
var tree_regexp_1 = __importDefault(require("./tree_regexp"));
var parameter_type_1 = __importDefault(require("./parameter_type"));
var RegularExpression = /** @class */ (function () {
    function RegularExpression(regexp, parameterTypeRegistry) {
        this.regexp = regexp;
        this.parameterTypeRegistry = parameterTypeRegistry;
        this.treeRegexp = new tree_regexp_1.default(regexp);
    }
    RegularExpression.prototype.match = function (text) {
        var _this = this;
        var parameterTypes = this.treeRegexp.groupBuilder.children.map(function (groupBuilder) {
            var parameterTypeRegexp = groupBuilder.source;
            return (_this.parameterTypeRegistry.lookupByRegexp(parameterTypeRegexp, _this.regexp, text) ||
                new parameter_type_1.default(null, parameterTypeRegexp, String, function (s) { return (s === undefined ? null : s); }, false, false));
        });
        return argument_1.default.build(this.treeRegexp, text, parameterTypes);
    };
    Object.defineProperty(RegularExpression.prototype, "source", {
        get: function () {
            return this.regexp.source;
        },
        enumerable: true,
        configurable: true
    });
    return RegularExpression;
}());
exports.default = RegularExpression;
//# sourceMappingURL=regular_expression.js.map