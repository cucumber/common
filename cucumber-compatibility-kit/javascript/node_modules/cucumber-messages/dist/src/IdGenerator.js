"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
function uuid() {
    return function () { return v4_1.default(); };
}
exports.uuid = uuid;
function incrementing() {
    var next = 0;
    return function () { return (next++).toString(); };
}
exports.incrementing = incrementing;
//# sourceMappingURL=IdGenerator.js.map