'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('util');
var ParameterTypeMatcher = require('./parameter_type_matcher');
var ParameterType = require('./parameter_type');
var CombinatorialGeneratedExpressionFactory = require('./combinatorial_generated_expression_factory');

var CucumberExpressionGenerator = function () {
  function CucumberExpressionGenerator(parameterTypeRegistry) {
    _classCallCheck(this, CucumberExpressionGenerator);

    this._parameterTypeRegistry = parameterTypeRegistry;
  }

  _createClass(CucumberExpressionGenerator, [{
    key: 'generateExpressions',
    value: function generateExpressions(text) {
      var parameterTypeCombinations = [];
      var parameterTypeMatchers = this._createParameterTypeMatchers(text);
      var expressionTemplate = '';
      var pos = 0;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        var matchingParameterTypeMatchers = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = parameterTypeMatchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var parameterTypeMatcher = _step.value;

            var advancedParameterTypeMatcher = parameterTypeMatcher.advanceTo(pos);
            if (advancedParameterTypeMatcher.find) {
              matchingParameterTypeMatchers.push(advancedParameterTypeMatcher);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (matchingParameterTypeMatchers.length > 0) {
          (function () {
            matchingParameterTypeMatchers = matchingParameterTypeMatchers.sort(ParameterTypeMatcher.compare);

            // Find all the best parameter type matchers, they are all candidates.
            var bestParameterTypeMatcher = matchingParameterTypeMatchers[0];
            var bestParameterTypeMatchers = matchingParameterTypeMatchers.filter(function (m) {
              return ParameterTypeMatcher.compare(m, bestParameterTypeMatcher) === 0;
            });

            // Build a list of parameter types without duplicates. The reason there
            // might be duplicates is that some parameter types have more than one regexp,
            // which means multiple ParameterTypeMatcher objects will have a reference to the
            // same ParameterType.
            // We're sorting the list so preferential parameter types are listed first.
            // Users are most likely to want these, so they should be listed at the top.
            var parameterTypes = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = bestParameterTypeMatchers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _parameterTypeMatcher = _step2.value;

                if (parameterTypes.indexOf(_parameterTypeMatcher.parameterType) === -1) {
                  parameterTypes.push(_parameterTypeMatcher.parameterType);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            parameterTypes = parameterTypes.sort(ParameterType.compare);

            parameterTypeCombinations.push(parameterTypes);

            expressionTemplate += escape(text.slice(pos, bestParameterTypeMatcher.start));
            expressionTemplate += '{%s}';

            pos = bestParameterTypeMatcher.start + bestParameterTypeMatcher.group.length;
          })();
        } else {
          break;
        }

        if (pos >= text.length) {
          break;
        }
      }

      expressionTemplate += escape(text.slice(pos));
      return new CombinatorialGeneratedExpressionFactory(expressionTemplate, parameterTypeCombinations).generateExpressions();
    }

    /**
     * @deprecated
     */

  }, {
    key: 'generateExpression',
    value: function generateExpression(text) {
      var _this = this;

      return util.deprecate(function () {
        return _this.generateExpressions(text)[0];
      }, 'CucumberExpressionGenerator.generateExpression: Use CucumberExpressionGenerator.generateExpressions instead')();
    }
  }, {
    key: '_createParameterTypeMatchers',
    value: function _createParameterTypeMatchers(text) {
      var parameterMatchers = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._parameterTypeRegistry.parameterTypes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var parameterType = _step3.value;

          if (parameterType.useForSnippets) {
            parameterMatchers = parameterMatchers.concat(this._createParameterTypeMatchers2(parameterType, text));
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return parameterMatchers;
    }
  }, {
    key: '_createParameterTypeMatchers2',
    value: function _createParameterTypeMatchers2(parameterType, text) {
      // TODO: [].map
      var result = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = parameterType.regexps[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var regexp = _step4.value;

          result.push(new ParameterTypeMatcher(parameterType, regexp, text));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return result;
    }
  }]);

  return CucumberExpressionGenerator;
}();

function escape(s) {
  return s.replace(/%/g, '%%') // for util.format
  .replace(/\(/g, '\\(').replace(/{/g, '\\{').replace(/\//g, '\\/');
}

module.exports = CucumberExpressionGenerator;