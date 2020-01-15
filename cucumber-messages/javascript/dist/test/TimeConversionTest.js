"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var src_1 = require("../src");
var durationToMilliseconds = src_1.TimeConversion.durationToMilliseconds, millisecondsSinceEpochToTimestamp = src_1.TimeConversion.millisecondsSinceEpochToTimestamp, millisecondsToDuration = src_1.TimeConversion.millisecondsToDuration, timestampToMillisecondsSinceEpoch = src_1.TimeConversion.timestampToMillisecondsSinceEpoch;
describe('TimeConversion', function () {
    it('converts to and from milliseconds since epoch', function () {
        var millisecondsSinceEpoch = Date.now();
        var timestamp = millisecondsSinceEpochToTimestamp(millisecondsSinceEpoch);
        var jsEpochMillisAgain = timestampToMillisecondsSinceEpoch(timestamp);
        assert_1.default.strictEqual(jsEpochMillisAgain, millisecondsSinceEpoch);
    });
    it('converts to and from milliseconds duration', function () {
        var durationInMilliseconds = 1234;
        var duration = millisecondsToDuration(durationInMilliseconds);
        var durationMillisAgain = durationToMilliseconds(duration);
        assert_1.default.strictEqual(durationMillisAgain, durationInMilliseconds);
    });
    it('converts to and from milliseconds duration (with decimal places)', function () {
        var durationInMilliseconds = 1.234;
        var duration = millisecondsToDuration(durationInMilliseconds);
        var durationMillisAgain = durationToMilliseconds(duration);
        assert_1.default.strictEqual(durationMillisAgain, durationInMilliseconds);
    });
});
//# sourceMappingURL=TimeConversionTest.js.map