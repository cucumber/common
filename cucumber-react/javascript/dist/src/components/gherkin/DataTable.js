"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TableBody_1 = __importDefault(require("./TableBody"));
var html_1 = require("./html");
var DataTable = function (_a) {
    var dataTable = _a.dataTable;
    return (react_1.default.createElement(html_1.Table, null,
        react_1.default.createElement(TableBody_1.default, { rows: dataTable.rows || [] })));
};
exports.default = DataTable;
//# sourceMappingURL=DataTable.js.map