"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Keyword_1 = __importDefault(require("./Keyword"));
var Description_1 = __importDefault(require("./Description"));
var Scenario_1 = __importDefault(require("./Scenario"));
var Background_1 = __importDefault(require("./Background"));
var html_1 = require("./html");
var Rule = function (_a) {
    var rule = _a.rule;
    return (react_1.default.createElement(html_1.Section, null,
        react_1.default.createElement(html_1.H2, null,
            react_1.default.createElement(Keyword_1.default, null,
                rule.keyword,
                ":"),
            " ",
            react_1.default.createElement(html_1.StepText, null, rule.name)),
        react_1.default.createElement(html_1.Indent, null,
            react_1.default.createElement(Description_1.default, { description: rule.description }),
            (rule.children || []).map(function (child, index) {
                if (child.background) {
                    return react_1.default.createElement(Background_1.default, { key: index, background: child.background });
                }
                else if (child.scenario) {
                    return react_1.default.createElement(Scenario_1.default, { key: index, scenario: child.scenario });
                }
                else {
                    throw new Error('Expected background or scenario');
                }
            }))));
};
exports.default = Rule;
//# sourceMappingURL=Rule.js.map