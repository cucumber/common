'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Regex = require('becke-ch--regex--s0-0-v1--base--pl--lib');
var GroupBuilder = require('./group_builder');

var TreeRegexp = function () {
  function TreeRegexp(regexp) {
    var _this = this;

    _classCallCheck(this, TreeRegexp);

    this._re = 'string' === typeof regexp ? new RegExp(regexp) : regexp;
    this._regex = new Regex(this._re.source, this._re.flags);

    var stack = [new GroupBuilder()];
    var groupStartStack = [];
    var last = null;
    var escaping = false;
    var nonCapturingMaybe = false;
    this._re.source.split('').forEach(function (c, n) {
      if (c === '(' && !escaping) {
        stack.push(new GroupBuilder());
        groupStartStack.push(n + 1);
        nonCapturingMaybe = false;
      } else if (c === ')' && !escaping) {
        var gb = stack.pop();
        var groupStart = groupStartStack.pop();
        if (gb.capturing) {
          gb.source = _this._re.source.substring(groupStart, n);
          stack[stack.length - 1].add(gb);
        } else {
          gb.moveChildrenTo(stack[stack.length - 1]);
        }
        nonCapturingMaybe = false;
      } else if (c === '?' && last === '(') {
        nonCapturingMaybe = true;
      } else if (c === ':' && nonCapturingMaybe) {
        stack[stack.length - 1].setNonCapturing();
        nonCapturingMaybe = false;
      }
      escaping = c === '\\' && !escaping;
      last = c;
    });
    this._groupBuilder = stack.pop();
  }

  _createClass(TreeRegexp, [{
    key: 'match',
    value: function match(s) {
      var match = this._regex.exec(s);
      if (!match) return null;
      var groupIndex = 0;
      var nextGroupIndex = function nextGroupIndex() {
        return groupIndex++;
      };
      return this._groupBuilder.build(match, nextGroupIndex);
    }
  }, {
    key: 'regexp',
    get: function get() {
      return this._re;
    }
  }, {
    key: 'groupBuilder',
    get: function get() {
      return this._groupBuilder;
    }
  }]);

  return TreeRegexp;
}();

module.exports = TreeRegexp;