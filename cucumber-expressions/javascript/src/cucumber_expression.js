"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matchPattern = require('./build_arguments');

var CucumberExpression = function () {
    /**
     * @param expression
     * @param types Array of type name (String) or types (function). Functions can be a regular function or a constructor
     * @param parameterTypeRegistry
     */
    function CucumberExpression(expression, types, parameterTypeRegistry) {
        _classCallCheck(this, CucumberExpression);

        var PARAMETER_REGEXP = /[{\[]([^}\]:]+)(:([^}\]]+))?[}\]]/g;
        var OPTIONAL_REGEXP = /\(([^)]+)\)/g;
        var ALTERNATIVE_WORD_REGEXP = /(\w+)((\/\w+)+)/g;

        this._expression = expression;
        this._parameterTypes = [];
        var regexp = "^";
        var typeIndex = 0;
        var match = void 0;
        var matchOffset = 0;

        // Does not include (){}[] because they have special meaning
        expression = expression.replace(/([\\\^$.|?*+])/g, "\\$1");

        // Create non-capturing, optional capture groups from parenthesis
        expression = expression.replace(OPTIONAL_REGEXP, '(?:$1)?');

        expression = expression.replace(ALTERNATIVE_WORD_REGEXP, function (_, p1, p2) {
            return "(?:" + p1 + p2.replace(/\//g, '|') + ")";
        });

        while ((match = PARAMETER_REGEXP.exec(expression)) !== null) {
            var parameterName = match[1];
            var parameterTypeName = match[3];
            // eslint-disable-next-line no-console
            if (parameterTypeName && typeof console !== 'undefined' && typeof console.error == 'function') {
                // eslint-disable-next-line no-console
                console.error("Cucumber expression parameter syntax {" + parameterName + ":" + parameterTypeName + "} is deprecated. Please use {" + parameterTypeName + "} instead.");
            }

            var type = types.length <= typeIndex ? null : types[typeIndex++];

            var parameter = void 0;
            if (type) {
                parameter = parameterTypeRegistry.lookupByType(type);
            }
            if (!parameter && parameterTypeName) {
                parameter = parameterTypeRegistry.lookupByTypeName(parameterTypeName);
            }
            if (!parameter) {
                parameter = parameterTypeRegistry.lookupByTypeName(parameterName);
            }
            if (!parameter) {
                parameter = parameterTypeRegistry.createAnonymousLookup(function (s) {
                    return s;
                });
            }
            parameter.matchType = match[0].split("")[0] === "{" ? "capture" : "non-capture";
            this._parameterTypes.push(parameter);

            var text = expression.slice(matchOffset, match.index);
            var captureRegexp = getCaptureRegexp(parameter.regexps, parameter.matchType);
            matchOffset = PARAMETER_REGEXP.lastIndex;
            regexp += text;
            regexp += captureRegexp;
        }
        regexp += expression.slice(matchOffset);
        regexp += "$";
        this._regexp = new RegExp(regexp);
    }

    _createClass(CucumberExpression, [{
        key: "match",
        value: function match(text) {
            return matchPattern(this._regexp, text, this._parameterTypes);
        }
    }, {
        key: "source",
        get: function get() {
            return this._expression;
        }
    }]);

    return CucumberExpression;
}();

function getCaptureRegexp(regexps, matchType) {
    if (regexps.length === 1) {
        return matchType === "capture" ? "(" + regexps[0] + ")" : "(?:" + regexps[0] + ")";
    }

    var captureGroups = regexps.map(function (group) {
        return "(?:" + group + ")";
    });

    return "(" + captureGroups.join('|') + ")";
}

module.exports = CucumberExpression;