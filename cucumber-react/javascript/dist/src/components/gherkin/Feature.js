"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Tags_1 = __importDefault(require("./Tags"));
var Keyword_1 = __importDefault(require("./Keyword"));
var Description_1 = __importDefault(require("./Description"));
var Scenario_1 = __importDefault(require("./Scenario"));
var Rule_1 = __importDefault(require("./Rule"));
var Background_1 = __importDefault(require("./Background"));
var html_1 = require("./html");
var Feature = function (_a) {
    var feature = _a.feature;
    return (react_1.default.createElement(html_1.Section, null,
        react_1.default.createElement(Tags_1.default, { tags: feature.tags }),
        react_1.default.createElement(html_1.H1, null,
            react_1.default.createElement(Keyword_1.default, null,
                feature.keyword,
                ":"),
            " ",
            react_1.default.createElement(html_1.StepText, null, feature.name)),
        react_1.default.createElement(html_1.Indent, null,
            feature.description ? react_1.default.createElement(Description_1.default, { description: feature.description }) : null,
            (feature.children || []).map(function (child, index) {
                if (child.background) {
                    return react_1.default.createElement(Background_1.default, { key: index, background: child.background });
                }
                else if (child.scenario) {
                    return react_1.default.createElement(Scenario_1.default, { key: index, scenario: child.scenario });
                }
                else if (child.rule) {
                    return react_1.default.createElement(Rule_1.default, { key: index, rule: child.rule });
                }
                else {
                    throw new Error('Expected background, scenario or rule');
                }
            }))));
};
exports.default = Feature;
//# sourceMappingURL=Feature.js.map