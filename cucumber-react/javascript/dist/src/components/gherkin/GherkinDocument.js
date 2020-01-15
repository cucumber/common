"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Feature_1 = __importDefault(require("./Feature"));
var GherkinDocument = function (_a) {
    var gherkinDocument = _a.gherkinDocument;
    return (gherkinDocument.feature ? react_1.default.createElement(Feature_1.default, { feature: gherkinDocument.feature }) : null);
};
exports.default = GherkinDocument;
//# sourceMappingURL=GherkinDocument.js.map