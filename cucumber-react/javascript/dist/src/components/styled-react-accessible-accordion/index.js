"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_accessible_accordion_1 = require("react-accessible-accordion");
var styled_components_1 = __importDefault(require("styled-components"));
var statusColor_1 = __importDefault(require("../gherkin/statusColor"));
var Accordion = styled_components_1.default(react_accessible_accordion_1.Accordion)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 2px;\n"], ["\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 2px;\n"])));
exports.Accordion = Accordion;
var AccordionItem = styled_components_1.default(react_accessible_accordion_1.AccordionItem)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n"], ["\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n"])));
exports.AccordionItem = AccordionItem;
var AccordionItemButton = styled_components_1.default(react_accessible_accordion_1.AccordionItemButton)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: ", ";\n  cursor: pointer;\n  padding: 10px;\n  text-align: left;\n  border: none;\n  \n  &:hover {\n    background-color: ", ";\n  }\n  \n  &:before {\n    display: inline-block;\n    content: '';\n    height: 6px;\n    width: 6px;\n    margin-right: 12px;\n    border-bottom: 2px solid currentColor;\n    border-right: 2px solid currentColor;\n    transform: rotate(-45deg);\n  }\n  \n  &[aria-expanded=true]:before {\n    transform: rotate(45deg);\n  }\n"], ["\n  background-color: ", ";\n  cursor: pointer;\n  padding: 10px;\n  text-align: left;\n  border: none;\n  \n  &:hover {\n    background-color: ", ";\n  }\n  \n  &:before {\n    display: inline-block;\n    content: '';\n    height: 6px;\n    width: 6px;\n    margin-right: 12px;\n    border-bottom: 2px solid currentColor;\n    border-right: 2px solid currentColor;\n    transform: rotate(-45deg);\n  }\n  \n  &[aria-expanded=true]:before {\n    transform: rotate(45deg);\n  }\n"])), function (props) { return statusColor_1.default(props.status).hex(); }, function (props) { return statusColor_1.default(props.status).darken(0.1).hex(); });
exports.AccordionItemButton = AccordionItemButton;
var AccordionItemHeading = styled_components_1.default(react_accessible_accordion_1.AccordionItemHeading)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n"], ["\n"])));
exports.AccordionItemHeading = AccordionItemHeading;
var AccordionItemPanel = styled_components_1.default(react_accessible_accordion_1.AccordionItemPanel)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 20px;\n  animation: fadein 0.35s ease-in;\n"], ["\n  padding: 20px;\n  animation: fadein 0.35s ease-in;\n"])));
exports.AccordionItemPanel = AccordionItemPanel;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map