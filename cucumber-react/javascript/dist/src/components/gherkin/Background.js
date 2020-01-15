"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Keyword_1 = __importDefault(require("./Keyword"));
var Description_1 = __importDefault(require("./Description"));
var StepList_1 = __importDefault(require("./StepList"));
var html_1 = require("./html");
var Background = function (_a) {
    var background = _a.background;
    return (react_1.default.createElement(html_1.Section, null,
        react_1.default.createElement(html_1.H2, null,
            react_1.default.createElement(Keyword_1.default, null,
                background.keyword,
                ":"),
            " ",
            react_1.default.createElement(html_1.StepText, null, background.name)),
        react_1.default.createElement(html_1.Indent, null,
            react_1.default.createElement(Description_1.default, { description: background.description }),
            react_1.default.createElement(StepList_1.default, { steps: background.steps || [] }))));
};
exports.default = Background;
//# sourceMappingURL=Background.js.map