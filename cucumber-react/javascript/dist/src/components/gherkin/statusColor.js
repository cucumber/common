"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __importDefault(require("color"));
var cucumber_messages_1 = require("cucumber-messages");
var Status = cucumber_messages_1.messages.TestResult.Status;
var statusColor = function (status) {
    var _a;
    return (_a = {},
        // Keep the same order as in messages.proto - for readability's sake
        _a[Status.PASSED] = color_1.default('lime').lighten(0.9),
        _a[Status.SKIPPED] = color_1.default('cyan').lighten(0.9),
        _a[Status.PENDING] = color_1.default('yellow').lighten(0.9),
        _a[Status.UNDEFINED] = color_1.default('orange').lighten(0.9),
        _a[Status.AMBIGUOUS] = color_1.default('rebeccapurple').lighten(0.9),
        _a[Status.FAILED] = color_1.default('red').lighten(0.9),
        _a[Status.UNKNOWN] = color_1.default('gray').lighten(0.9),
        _a)[status];
};
exports.default = statusColor;
//# sourceMappingURL=statusColor.js.map