"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cucumber_messages_1 = require("cucumber-messages");
var cucumber_react_1 = require("cucumber-react");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var cucumber_query_1 = __importDefault(require("cucumber-query"));
var envelopes = window.CUCUMBER_MESSAGES.map(function (message) {
    return cucumber_messages_1.messages.Envelope.fromObject(message);
});
var gherkinDocuments = envelopes
    .filter(function (e) { return e.gherkinDocument; })
    .map(function (e) { return e.gherkinDocument; });
var cucumberQuery = envelopes.reduce(function (q, e) { return q.update(e); }, new cucumber_query_1.default());
var app = (react_1.default.createElement(cucumber_react_1.GherkinDocumentList, { gherkinDocuments: gherkinDocuments, cucumberQuery: cucumberQuery }));
react_dom_1.default.render(app, document.getElementById('content'));
//# sourceMappingURL=main.js.map