"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var html_1 = require("./html");
var TableBody = function (_a) {
    var rows = _a.rows;
    return (react_1.default.createElement("tbody", null, rows.map(function (row, i) { return (react_1.default.createElement("tr", { key: i }, (row.cells || []).map(function (cell, j) { return (react_1.default.createElement(html_1.Td, { key: j }, cell.value)); }))); })));
};
exports.default = TableBody;
//# sourceMappingURL=TableBody.js.map