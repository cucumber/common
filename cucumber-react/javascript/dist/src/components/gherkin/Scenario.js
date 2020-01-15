"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Tags_1 = __importDefault(require("./Tags"));
var Keyword_1 = __importDefault(require("./Keyword"));
var Description_1 = __importDefault(require("./Description"));
var Examples_1 = __importDefault(require("./Examples"));
var StepList_1 = __importDefault(require("./StepList"));
var html_1 = require("./html");
var Scenario = function (_a) {
    var scenario = _a.scenario;
    return (react_1.default.createElement(html_1.Section, null,
        react_1.default.createElement(Tags_1.default, { tags: scenario.tags }),
        react_1.default.createElement(html_1.H2, null,
            react_1.default.createElement(Keyword_1.default, null,
                scenario.keyword,
                ":"),
            " ",
            react_1.default.createElement(html_1.StepText, null, scenario.name)),
        react_1.default.createElement(html_1.Indent, null,
            react_1.default.createElement(Description_1.default, { description: scenario.description }),
            react_1.default.createElement(StepList_1.default, { steps: scenario.steps || [] }),
            (scenario.examples || []).map(function (examples, index) { return (react_1.default.createElement(Examples_1.default, { key: index, examples: examples })); }))));
};
exports.default = Scenario;
//# sourceMappingURL=Scenario.js.map