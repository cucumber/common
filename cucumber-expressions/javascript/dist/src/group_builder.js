'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Group = require('./group');

var GroupBuilder = function () {
  function GroupBuilder() {
    _classCallCheck(this, GroupBuilder);

    this._groupBuilders = [];
    this._capturing = true;
  }

  _createClass(GroupBuilder, [{
    key: 'add',
    value: function add(groupBuilder) {
      this._groupBuilders.push(groupBuilder);
    }
  }, {
    key: 'build',
    value: function build(match, nextGroupIndex) {
      var groupIndex = nextGroupIndex();
      var children = this._groupBuilders.map(function (gb) {
        return gb.build(match, nextGroupIndex);
      });
      return new Group(match[groupIndex], match.index[groupIndex], match.index[groupIndex] + (match[groupIndex] || '').length, children);
    }
  }, {
    key: 'setNonCapturing',
    value: function setNonCapturing() {
      this._capturing = false;
    }
  }, {
    key: 'moveChildrenTo',
    value: function moveChildrenTo(groupBuilder) {
      this._groupBuilders.forEach(function (child) {
        return groupBuilder.add(child);
      });
    }
  }, {
    key: 'capturing',
    get: function get() {
      return this._capturing;
    }
  }, {
    key: 'children',
    get: function get() {
      return this._groupBuilders;
    }
  }]);

  return GroupBuilder;
}();

module.exports = GroupBuilder;