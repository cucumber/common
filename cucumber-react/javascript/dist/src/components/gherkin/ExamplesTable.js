"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var html_1 = require("./html");
var ExamplesTableBody_1 = __importDefault(require("./ExamplesTableBody"));
var ExamplesTable = function (_a) {
    var tableHeader = _a.tableHeader, tableBody = _a.tableBody;
    return (react_1.default.createElement(html_1.Table, null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null, tableHeader.cells.map(function (cell, j) { return (react_1.default.createElement(html_1.Th, { key: j }, cell.value)); }))),
        react_1.default.createElement(ExamplesTableBody_1.default, { rows: tableBody || [] })));
};
exports.default = ExamplesTable;
//# sourceMappingURL=ExamplesTable.js.map