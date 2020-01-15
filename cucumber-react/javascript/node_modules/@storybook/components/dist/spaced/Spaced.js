"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spaced = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var toNumber = function toNumber(input) {
  return typeof input === 'number' ? input : Number(input);
};

var Container = _theming.styled.div(function (_ref) {
  var theme = _ref.theme,
      col = _ref.col,
      _ref$row = _ref.row,
      row = _ref$row === void 0 ? 1 : _ref$row;
  return col ? {
    display: 'inline-block',
    verticalAlign: 'inherit',
    '& > *': {
      marginLeft: col * theme.layoutMargin,
      verticalAlign: 'inherit'
    },
    '& > *:first-of-type': {
      marginLeft: 0
    }
  } : {
    '& > *': {
      marginTop: row * theme.layoutMargin
    },
    '& > *:first-of-type': {
      marginTop: 0
    }
  };
}, function (_ref2) {
  var theme = _ref2.theme,
      outer = _ref2.outer,
      col = _ref2.col,
      row = _ref2.row;

  switch (true) {
    case !!(outer && col):
      {
        return {
          marginLeft: outer * theme.layoutMargin,
          marginRight: outer * theme.layoutMargin
        };
      }

    case !!(outer && row):
      {
        return {
          marginTop: outer * theme.layoutMargin,
          marginBottom: outer * theme.layoutMargin
        };
      }

    default:
      {
        return {};
      }
  }
});

var Spaced = function Spaced(_ref3) {
  var col = _ref3.col,
      row = _ref3.row,
      outer = _ref3.outer,
      children = _ref3.children,
      rest = _objectWithoutProperties(_ref3, ["col", "row", "outer", "children"]);

  var outerAmount = toNumber(typeof outer === 'number' || !outer ? outer : col || row);
  return _react["default"].createElement(Container, _extends({
    col: col,
    row: row,
    outer: outerAmount
  }, rest), children);
};

exports.Spaced = Spaced;
Spaced.displayName = "Spaced";