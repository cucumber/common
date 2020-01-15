"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var statusColor_1 = __importDefault(require("./statusColor"));
var H1 = styled_components_1.default.h1(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0.1em;\n"], ["\n  margin: 0.1em;\n"])));
exports.H1 = H1;
var H2 = styled_components_1.default.h2(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0.1em;\n"], ["\n  margin: 0.1em;\n"])));
exports.H2 = H2;
var H3 = styled_components_1.default.h3(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0.1em;\n"], ["\n  margin: 0.1em;\n"])));
exports.H3 = H3;
var Indent = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-left: 1em;\n"], ["\n  margin-left: 1em;\n"])));
exports.Indent = Indent;
var Ol = styled_components_1.default.ol(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  list-style-type: none;\n  padding-left: 0;\n"], ["\n  list-style-type: none;\n  padding-left: 0;\n"])));
exports.Ol = Ol;
var StepText = styled_components_1.default.span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-weight: normal;\n"], ["\n  font-weight: normal;\n"])));
exports.StepText = StepText;
var StepParam = styled_components_1.default.span(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-weight: bold;\n  background-color: ", ";\n  color: #072a80;\n"], ["\n  font-weight: bold;\n  background-color: ", ";\n  color: #072a80;\n"])), function (props) { return statusColor_1.default(props.status).darken(0.1).hex(); });
exports.StepParam = StepParam;
var Section = styled_components_1.default.section(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin-bottom: 1em;\n"], ["\n  margin-bottom: 1em;\n"])));
exports.Section = Section;
var Table = styled_components_1.default.table(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  border: 1px solid black;\n  border-collapse: collapse;\n"], ["\n  border: 1px solid black;\n  border-collapse: collapse;\n"])));
exports.Table = Table;
var Th = styled_components_1.default.th(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  border: 1px solid black;\n  padding: 0.3em;\n"], ["\n  border: 1px solid black;\n  padding: 0.3em;\n"
    // Lifted from cucumber-expressions/javascript/src/ParameterTypeRegistry#FLOAT_REGEXP
])));
exports.Th = Th;
// Lifted from cucumber-expressions/javascript/src/ParameterTypeRegistry#FLOAT_REGEXP
var numberPattern = /(?=.*\d.*)[-+]?\d*(?:\.(?=\d.*))?\d*(?:\d+[E][+\-]?\d+)?/;
var Td = styled_components_1.default.td(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  border: 1px solid black;\n  padding: 0.3em;\n  text-align: ", ";\n"], ["\n  border: 1px solid black;\n  padding: 0.3em;\n  text-align: ", ";\n"])), function (props) { return props.children.match(numberPattern) ? 'right' : 'left'; });
exports.Td = Td;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
//# sourceMappingURL=html.js.map