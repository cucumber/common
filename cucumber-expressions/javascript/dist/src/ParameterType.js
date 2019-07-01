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
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var ILLEGAL_PARAMETER_NAME_PATTERN = /([[\]()$.|?*+])/;
var UNESCAPE_PATTERN = function () { return /(\\([[$.|?*+\]]))/g; };
var ParameterType = /** @class */ (function () {
    /**
     * @param name {String} the name of the type
     * @param regexps {Array.<RegExp>,RegExp,Array.<String>,String} that matches the type
     * @param type {Function} the prototype (constructor) of the type. May be null.
     * @param transform {Function} function transforming string to another type. May be null.
     * @param useForSnippets {boolean} true if this should be used for snippets. Defaults to true.
     * @param preferForRegexpMatch {boolean} true if this is a preferential type. Defaults to false.
     */
    function ParameterType(name, regexps, type, transform, useForSnippets, preferForRegexpMatch) {
        this.name = name;
        this.type = type;
        this.useForSnippets = useForSnippets;
        this.preferForRegexpMatch = preferForRegexpMatch;
        if (transform === undefined) {
            transform = function (s) { return s; };
        }
        if (useForSnippets === undefined) {
            this.useForSnippets = true;
        }
        if (preferForRegexpMatch === undefined) {
            this.preferForRegexpMatch = false;
        }
        if (name) {
            ParameterType.checkParameterTypeName(name);
        }
        this.regexpStrings = stringArray(regexps);
        this.transformFn = transform;
    }
    ParameterType.compare = function (pt1, pt2) {
        if (pt1.preferForRegexpMatch && !pt2.preferForRegexpMatch) {
            return -1;
        }
        if (pt2.preferForRegexpMatch && !pt1.preferForRegexpMatch) {
            return 1;
        }
        return pt1.name.localeCompare(pt2.name);
    };
    ParameterType.checkParameterTypeName = function (typeName) {
        var unescapedTypeName = typeName.replace(UNESCAPE_PATTERN(), '$2');
        var match = unescapedTypeName.match(ILLEGAL_PARAMETER_NAME_PATTERN);
        if (match) {
            throw new Errors_1.CucumberExpressionError("Illegal character '" + match[1] + "' in parameter name {" + unescapedTypeName + "}");
        }
    };
    ParameterType.prototype.transform = function (thisObj, groupValues) {
        var result = this.transformFn.apply(thisObj, groupValues);
        return result;
    };
    return ParameterType;
}());
exports.default = ParameterType;
function stringArray(regexps) {
    var array = Array.isArray(regexps) ? regexps : [regexps];
    return array.map(function (r) {
        return r instanceof RegExp ? regexpSource(r) : r;
    });
}
function regexpSource(regexp) {
    var e_1, _a;
    var flags = regexpFlags(regexp);
    try {
        for (var _b = __values(['g', 'i', 'm', 'y']), _c = _b.next(); !_c.done; _c = _b.next()) {
            var flag = _c.value;
            if (flags.indexOf(flag) !== -1) {
                throw new Errors_1.CucumberExpressionError("ParameterType Regexps can't use flag '" + flag + "'");
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
    return regexp.source;
}
// Backport RegExp.flags for Node 4.x
// https://github.com/nodejs/node/issues/8390
function regexpFlags(regexp) {
    var flags = regexp.flags;
    if (flags === undefined) {
        flags = '';
        if (regexp.ignoreCase) {
            flags += 'i';
        }
        if (regexp.global) {
            flags += 'g';
        }
        if (regexp.multiline) {
            flags += 'm';
        }
    }
    return flags;
}
//# sourceMappingURL=ParameterType.js.map