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
var DataTable_1 = __importDefault(require("./DataTable"));
var Keyword_1 = __importDefault(require("./Keyword"));
var DocString_1 = __importDefault(require("./DocString"));
var cucumber_messages_1 = require("cucumber-messages");
var styled_components_1 = __importDefault(require("styled-components"));
var statusColor_1 = __importDefault(require("./statusColor"));
var html_1 = require("./html");
var CucumberQueryContext_1 = __importDefault(require("../../CucumberQueryContext"));
var UriContext_1 = __importDefault(require("../../UriContext"));
var StepLi = styled_components_1.default.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0.5em;\n  margin-left: 0;\n  margin-top: 0;\n  border-bottom: 1px #ccc solid;\n  border-left: 1px #ccc solid;\n  border-right: 1px #ccc solid;\n  background-color: ", ";\n\n  &:nth-child(1) {\n    border-top: 1px #ccc solid;\n  }\n"], ["\n  padding: 0.5em;\n  margin-left: 0;\n  margin-top: 0;\n  border-bottom: 1px #ccc solid;\n  border-left: 1px #ccc solid;\n  border-right: 1px #ccc solid;\n  background-color: ", ";\n\n  &:nth-child(1) {\n    border-top: 1px #ccc solid;\n  }\n"])), function (props) { return statusColor_1.default(props.status).hex(); });
var ErrorMessage = styled_components_1.default.pre(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0.5em;\n  background-color: ", ";\n  overflow: scroll;\n"], ["\n  padding: 0.5em;\n  background-color: ", ";\n  overflow: scroll;\n"])), function (props) { return statusColor_1.default(props.status).darken(0.1).hex(); });
var Step = function (_a) {
    var step = _a.step;
    var cucumberQuery = react_1.default.useContext(CucumberQueryContext_1.default);
    var uri = react_1.default.useContext(UriContext_1.default);
    var testResults = cucumberQuery.getStepResults(uri, step.location.line);
    var status = testResults.length > 0 ? testResults[0].status : cucumber_messages_1.messages.TestResult.Status.UNKNOWN;
    var resultsWithMessage = testResults.filter(function (tr) { return tr.message; });
    var stepTextElements = [];
    var args = cucumberQuery.getStepMatchArguments(uri, step.location.line);
    if (args) {
        // Step is defined
        var offset_1 = 0;
        args.forEach(function (argument, index) {
            var plain = step.text.slice(offset_1, argument.group.start);
            if (plain.length > 0) {
                stepTextElements.push(react_1.default.createElement(html_1.StepText, { key: "plain-" + index }, plain));
            }
            var arg = argument.group.value;
            if (arg.length > 0) {
                stepTextElements.push(react_1.default.createElement(html_1.StepParam, { key: "bold-" + index, status: status }, arg));
            }
            offset_1 += plain.length + arg.length;
        });
        var plain = step.text.slice(offset_1);
        if (plain.length > 0) {
            stepTextElements.push(react_1.default.createElement(html_1.StepText, { key: "plain-rest" }, plain));
        }
    }
    else if (args.length === 2) {
        // Step is ambiguous
        stepTextElements.push(react_1.default.createElement(html_1.StepText, { key: "plain-ambiguous" }, step.text));
    }
    else {
        // Step is undefined
        stepTextElements.push(react_1.default.createElement(html_1.StepText, { key: "plain-undefined" }, step.text));
    }
    return (react_1.default.createElement(StepLi, { status: status },
        react_1.default.createElement(html_1.H3, null,
            react_1.default.createElement(Keyword_1.default, null, step.keyword),
            stepTextElements),
        react_1.default.createElement(html_1.Indent, null,
            step.dataTable && react_1.default.createElement(DataTable_1.default, { dataTable: step.dataTable }),
            step.docString && react_1.default.createElement(DocString_1.default, { docString: step.docString })),
        resultsWithMessage.map(function (result, i) { return react_1.default.createElement(ErrorMessage, { key: i, status: status }, result.message); })));
};
exports.default = Step;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Step.js.map