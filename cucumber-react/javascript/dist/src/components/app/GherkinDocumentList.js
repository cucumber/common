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
var GherkinDocument_1 = __importDefault(require("../gherkin/GherkinDocument"));
var cucumber_messages_1 = require("cucumber-messages");
var styled_components_1 = __importDefault(require("styled-components"));
var styled_react_accessible_accordion_1 = require("../styled-react-accessible-accordion");
var CucumberQueryContext_1 = __importDefault(require("../../CucumberQueryContext"));
var UriContext_1 = __importDefault(require("../../UriContext"));
var Body = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font: 14px 'Open Sans', sans-serif;\n  color: #212121;\n  background: #fff;\n  overflow-x: hidden;\n"], ["\n  font: 14px 'Open Sans', sans-serif;\n  color: #212121;\n  background: #fff;\n  overflow-x: hidden;\n"])));
var GherkinDocumentList = function (_a) {
    var gherkinDocuments = _a.gherkinDocuments, cucumberQuery = _a.cucumberQuery;
    return (react_1.default.createElement(Body, null,
        react_1.default.createElement("link", { href: "https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css", rel: "stylesheet" }),
        react_1.default.createElement("link", { href: "https://fonts.googleapis.com/css?family=Open+Sans:300", rel: "stylesheet" }),
        react_1.default.createElement(CucumberQueryContext_1.default.Provider, { value: cucumberQuery },
            react_1.default.createElement(styled_react_accessible_accordion_1.Accordion, { allowMultipleExpanded: false, allowZeroExpanded: true }, gherkinDocuments.map(function (gherkinDocument) {
                var testResults = cucumberQuery.getDocumentResults(gherkinDocument.uri);
                var status = testResults.length > 0 ? testResults[0].status : cucumber_messages_1.messages.TestResult.Status.UNKNOWN;
                return (react_1.default.createElement(styled_react_accessible_accordion_1.AccordionItem, { key: gherkinDocument.uri, uuid: gherkinDocument.uri },
                    react_1.default.createElement(styled_react_accessible_accordion_1.AccordionItemHeading, null,
                        react_1.default.createElement(styled_react_accessible_accordion_1.AccordionItemButton, { status: status }, gherkinDocument.uri)),
                    react_1.default.createElement(styled_react_accessible_accordion_1.AccordionItemPanel, null,
                        react_1.default.createElement(UriContext_1.default.Provider, { value: gherkinDocument.uri },
                            react_1.default.createElement(GherkinDocument_1.default, { gherkinDocument: gherkinDocument })))));
            })))));
};
exports.default = GherkinDocumentList;
var templateObject_1;
//# sourceMappingURL=GherkinDocumentList.js.map