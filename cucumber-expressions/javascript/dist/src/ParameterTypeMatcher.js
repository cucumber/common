"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParameterTypeMatcher = /** @class */ (function () {
    function ParameterTypeMatcher(parameterType, regexpString, text, matchPosition) {
        if (matchPosition === void 0) { matchPosition = 0; }
        this.parameterType = parameterType;
        this.regexpString = regexpString;
        this.text = text;
        this.matchPosition = matchPosition;
        var captureGroupRegexp = new RegExp("(" + regexpString + ")");
        this.match = captureGroupRegexp.exec(text.slice(this.matchPosition));
    }
    ParameterTypeMatcher.prototype.advanceTo = function (newMatchPosition) {
        for (var advancedPos = newMatchPosition; advancedPos < this.text.length; advancedPos++) {
            var matcher = new ParameterTypeMatcher(this.parameterType, this.regexpString, this.text, advancedPos);
            if (matcher.find) {
                return matcher;
            }
        }
        return new ParameterTypeMatcher(this.parameterType, this.regexpString, this.text, this.text.length);
    };
    Object.defineProperty(ParameterTypeMatcher.prototype, "find", {
        get: function () {
            return this.match && this.group !== "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterTypeMatcher.prototype, "start", {
        get: function () {
            return this.matchPosition + this.match.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterTypeMatcher.prototype, "group", {
        get: function () {
            return this.match[0];
        },
        enumerable: true,
        configurable: true
    });
    ParameterTypeMatcher.compare = function (a, b) {
        var posComparison = a.start - b.start;
        if (posComparison !== 0) {
            return posComparison;
        }
        var lengthComparison = b.group.length - a.group.length;
        if (lengthComparison !== 0) {
            return lengthComparison;
        }
        return 0;
    };
    return ParameterTypeMatcher;
}());
exports.default = ParameterTypeMatcher;
module.exports = ParameterTypeMatcher;
//# sourceMappingURL=ParameterTypeMatcher.js.map