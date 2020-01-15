"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Keyword_1 = __importDefault(require("./Keyword"));
var ExamplesTable_1 = __importDefault(require("./ExamplesTable"));
var Tags_1 = __importDefault(require("./Tags"));
var Description_1 = __importDefault(require("./Description"));
var html_1 = require("./html");
var Examples = function (_a) {
    var examples = _a.examples;
    return (react_1.default.createElement(html_1.Section, null,
        react_1.default.createElement(Tags_1.default, { tags: examples.tags }),
        react_1.default.createElement(html_1.H2, null,
            react_1.default.createElement(Keyword_1.default, null,
                examples.keyword,
                ":"),
            " ",
            react_1.default.createElement(html_1.StepText, null, examples.name)),
        react_1.default.createElement(html_1.Indent, null,
            react_1.default.createElement(Description_1.default, { description: examples.description }),
            examples.tableHeader && react_1.default.createElement(ExamplesTable_1.default, { tableHeader: examples.tableHeader, tableBody: examples.tableBody }))));
};
exports.default = Examples;
//# sourceMappingURL=Examples.js.map