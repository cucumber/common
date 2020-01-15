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
var cucumber_messages_1 = require("cucumber-messages");
var html_1 = require("./html");
var styled_components_1 = __importDefault(require("styled-components"));
var statusColor_1 = __importDefault(require("./statusColor"));
var CucumberQueryContext_1 = __importDefault(require("../../CucumberQueryContext"));
var UriContext_1 = __importDefault(require("../../UriContext"));
var Tr = styled_components_1.default.tr(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), function (props) { return statusColor_1.default(props.status).hex(); });
var ExamplesTableBody = function (_a) {
    var rows = _a.rows;
    var cucumberQuery = react_1.default.useContext(CucumberQueryContext_1.default);
    var uri = react_1.default.useContext(UriContext_1.default);
    return (react_1.default.createElement("tbody", null, rows.map(function (row, i) {
        // TODO: cucumberQuery.getRowResults???
        var testResults = cucumberQuery.getStepResults(uri, row.location.line);
        var status = testResults.length > 0 ? testResults[0].status : cucumber_messages_1.messages.TestResult.Status.UNKNOWN;
        return (react_1.default.createElement(Tr, { key: i, status: status }, (row.cells || []).map(function (cell, j) { return (react_1.default.createElement(html_1.Td, { key: j }, cell.value)); })));
    })));
};
exports.default = ExamplesTableBody;
var templateObject_1;
//# sourceMappingURL=ExamplesTableBody.js.map