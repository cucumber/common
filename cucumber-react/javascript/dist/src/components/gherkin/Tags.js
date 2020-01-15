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
var Tag_1 = __importDefault(require("./Tag"));
var styled_components_1 = __importDefault(require("styled-components"));
var TagList = styled_components_1.default.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0;\n  margin-bottom: 0;\n"], ["\n  padding: 0;\n  margin-bottom: 0;\n"])));
var Tags = function (_a) {
    var tags = _a.tags;
    if (!tags)
        return null;
    return (react_1.default.createElement(TagList, null, tags.map(function (tag, index) { return (react_1.default.createElement(Tag_1.default, { key: index }, tag.name)); })));
};
exports.default = Tags;
var templateObject_1;
//# sourceMappingURL=Tags.js.map