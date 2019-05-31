"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
// A better assert.error that allows an exact error message
exports.default = (function (fn, message) {
    var regexp = new RegExp(message.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"));
    assert_1.default.throws(fn, regexp);
});
//# sourceMappingURL=assert_throws.js.map