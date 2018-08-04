'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParameterTypeMatcher = function () {
  function ParameterTypeMatcher(parameter, regexp, text, matchPosition) {
    _classCallCheck(this, ParameterTypeMatcher);

    this._parameterType = parameter;
    this._treeRegexp = regexp;
    this._text = text;
    this._matchPosition = matchPosition || 0;

    var captureGroupRegexp = new RegExp('(' + regexp + ')');
    this._match = captureGroupRegexp.exec(text.slice(this._matchPosition));
  }

  _createClass(ParameterTypeMatcher, [{
    key: 'advanceTo',
    value: function advanceTo(newMatchPosition) {
      return new ParameterTypeMatcher(this._parameterType, this._treeRegexp, this._text, newMatchPosition);
    }
  }, {
    key: 'parameterType',
    get: function get() {
      return this._parameterType;
    }
  }, {
    key: 'find',
    get: function get() {
      return this._match && this.group !== '';
    }
  }, {
    key: 'start',
    get: function get() {
      return this._matchPosition + this._match.index;
    }
  }, {
    key: 'group',
    get: function get() {
      return this._match[0];
    }
  }], [{
    key: 'compare',
    value: function compare(a, b) {
      var posComparison = a.start - b.start;
      if (posComparison !== 0) return posComparison;
      var lengthComparison = b.group.length - a.group.length;
      if (lengthComparison !== 0) return lengthComparison;
      return 0;
    }
  }]);

  return ParameterTypeMatcher;
}();

module.exports = ParameterTypeMatcher;