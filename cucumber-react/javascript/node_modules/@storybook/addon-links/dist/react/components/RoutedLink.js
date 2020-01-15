"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// NOTE: this is a copy of `lib/components/src/navigation/RoutedLink.js`.
// It's duplicated here because that copy has an explicit dependency on
// React 16.3+, which breaks older versions of React running in the preview.
// The proper DRY solution is to create a new package that doesn't depend
// on a specific react version. However, that's a heavy-handed solution for
// one trivial file.
var LEFT_BUTTON = 0; // Cmd/Ctrl/Shift/Alt + Click should trigger default browser behaviour. Same applies to non-left clicks

var isPlainLeftClick = function isPlainLeftClick(e) {
  return e.button === LEFT_BUTTON && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
};

var RoutedLink =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RoutedLink, _React$Component);

  function RoutedLink() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RoutedLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RoutedLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onClick = function (e) {
      var onClick = _this.props.onClick;

      if (isPlainLeftClick(e)) {
        e.preventDefault();
        onClick(e);
      }
    };

    return _this;
  }

  _createClass(RoutedLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          href = _this$props.href,
          children = _this$props.children,
          onClick = _this$props.onClick,
          className = _this$props.className,
          style = _this$props.style;
      var props = onClick ? {
        href: href,
        className: className,
        style: style,
        onClick: this.onClick
      } : {
        href: href,
        className: className,
        style: style
      };
      return _react["default"].createElement("a", props, children);
    }
  }]);

  return RoutedLink;
}(_react["default"].Component);

exports["default"] = RoutedLink;
RoutedLink.defaultProps = {
  onClick: null,
  href: '#',
  children: null,
  className: undefined,
  style: undefined
};
RoutedLink.propTypes = {
  onClick: _propTypes["default"].func,
  href: _propTypes["default"].string,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  // eslint-disable-next-line react/forbid-prop-types
  style: _propTypes["default"].object
};