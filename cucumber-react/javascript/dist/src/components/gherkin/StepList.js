"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Step_1 = __importDefault(require("./Step"));
var html_1 = require("./html");
var StepList = function (_a) {
    var steps = _a.steps;
    return (react_1.default.createElement(html_1.Ol, null, steps.map(function (step, index) { return (react_1.default.createElement(Step_1.default, { key: index, step: step })); })));
};
exports.default = StepList;
//# sourceMappingURL=StepList.js.map