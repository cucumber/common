"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var DocString = function (_a) {
    var docString = _a.docString;
    return (react_1.default.createElement("pre", null, docString.content));
};
exports.default = DocString;
//# sourceMappingURL=DocString.js.map