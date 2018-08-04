"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = function () {
  function Group(value, start, end, children) {
    _classCallCheck(this, Group);

    this._value = value;
    this._start = start;
    this._end = end;
    this._children = children;
  }

  _createClass(Group, [{
    key: "value",
    get: function get() {
      return this._value;
    }
  }, {
    key: "start",
    get: function get() {
      return this._start;
    }
  }, {
    key: "end",
    get: function get() {
      return this._end;
    }
  }, {
    key: "children",
    get: function get() {
      return this._children;
    }
  }, {
    key: "values",
    get: function get() {
      return (this.children.length === 0 ? [this] : this.children).map(function (g) {
        return g.value;
      }).filter(function (v) {
        return v !== undefined;
      });
    }
  }]);

  return Group;
}();

module.exports = Group;