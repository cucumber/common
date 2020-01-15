"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Li = styled_components_1.default.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline;\n  list-style-type: none;\n  padding: 4px 8px 4px 8px;\n  margin-right: 6px;\n  background-color: #ddd;\n  border-radius: 6px;\n"], ["\n  display: inline;\n  list-style-type: none;\n  padding: 4px 8px 4px 8px;\n  margin-right: 6px;\n  background-color: #ddd;\n  border-radius: 6px;\n"])));
var Tag = function (_a) {
    var children = _a.children;
    return react_1.default.createElement(Li, null, children);
};
exports.default = Tag;
var templateObject_1;
//# sourceMappingURL=Tag.js.map