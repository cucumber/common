"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Argument_1 = __importDefault(require("./Argument"));
var TreeRegexp_1 = __importDefault(require("./TreeRegexp"));
var ParameterType_1 = __importDefault(require("./ParameterType"));
var RegularExpression = /** @class */ (function () {
    function RegularExpression(regexp, parameterTypeRegistry) {
        this.regexp = regexp;
        this.parameterTypeRegistry = parameterTypeRegistry;
        this.treeRegexp = new TreeRegexp_1.default(regexp);
    }
    RegularExpression.prototype.match = function (text) {
        var _this = this;
        var parameterTypes = this.treeRegexp.groupBuilder.children.map(function (groupBuilder) {
            var parameterTypeRegexp = groupBuilder.source;
            return (_this.parameterTypeRegistry.lookupByRegexp(parameterTypeRegexp, _this.regexp, text) ||
                new ParameterType_1.default(null, parameterTypeRegexp, String, function (s) { return (s === undefined ? null : s); }, false, false));
        });
        return Argument_1.default.build(this.treeRegexp, text, parameterTypes);
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
//# sourceMappingURL=RegularExpression.js.map