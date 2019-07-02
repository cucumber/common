"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GroupBuilder_1 = __importDefault(require("./GroupBuilder"));
// @ts-ignore
var becke_ch__regex__s0_0_v1__base__pl__lib_1 = __importDefault(require("becke-ch--regex--s0-0-v1--base--pl--lib"));
var TreeRegexp = /** @class */ (function () {
    function TreeRegexp(regexp) {
        var _this = this;
        this.regexp = 'string' === typeof regexp ? new RegExp(regexp) : regexp;
        this.regex = new becke_ch__regex__s0_0_v1__base__pl__lib_1.default(this.regexp.source, this.regexp.flags);
        var stack = [new GroupBuilder_1.default()];
        var groupStartStack = [];
        var last = null;
        var escaping = false;
        var nonCapturingMaybe = false;
        var charClass = false;
        this.regexp.source.split('').forEach(function (c, n) {
            if (c === '[' && !escaping) {
                charClass = true;
            }
            else if (c === ']' && !escaping) {
                charClass = false;
            }
            else if (c === '(' && !escaping && !charClass) {
                stack.push(new GroupBuilder_1.default());
                groupStartStack.push(n + 1);
                nonCapturingMaybe = false;
            }
            else if (c === ')' && !escaping && !charClass) {
                var gb = stack.pop();
                var groupStart = groupStartStack.pop();
                if (gb.capturing) {
                    gb.source = _this.regexp.source.substring(groupStart, n);
                    stack[stack.length - 1].add(gb);
                }
                else {
                    gb.moveChildrenTo(stack[stack.length - 1]);
                }
                nonCapturingMaybe = false;
            }
            else if (c === '?' && last === '(') {
                nonCapturingMaybe = true;
            }
            else if ((c === ':' || c === '!' || c === '=') && nonCapturingMaybe) {
                stack[stack.length - 1].setNonCapturing();
                nonCapturingMaybe = false;
            }
            escaping = c === '\\' && !escaping;
            last = c;
        });
        this.groupBuilder = stack.pop();
    }
    TreeRegexp.prototype.match = function (s) {
        var match = this.regex.exec(s);
        if (!match) {
            return null;
        }
        var groupIndex = 0;
        var nextGroupIndex = function () { return groupIndex++; };
        return this.groupBuilder.build(match, nextGroupIndex);
    };
    return TreeRegexp;
}());
exports.default = TreeRegexp;
//# sourceMappingURL=TreeRegexp.js.map