"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var MILLISECONDS_PER_SECOND = 1000;
var NANOSECONDS_PER_MILLISECOND = 1000000;
function millisecondsSinceEpochToTimestamp(millisecondsSinceEpoch) {
    return new index_1.messages.Timestamp(toSecondsAndNanos(millisecondsSinceEpoch));
}
exports.millisecondsSinceEpochToTimestamp = millisecondsSinceEpochToTimestamp;
function millisecondsToDuration(durationInMilliseconds) {
    return new index_1.messages.Duration(toSecondsAndNanos(durationInMilliseconds));
}
exports.millisecondsToDuration = millisecondsToDuration;
function timestampToMillisecondsSinceEpoch(timestamp) {
    var nanos = timestamp.nanos, seconds = timestamp.seconds;
    return toMillis(seconds, nanos);
}
exports.timestampToMillisecondsSinceEpoch = timestampToMillisecondsSinceEpoch;
function durationToMilliseconds(duration) {
    var nanos = duration.nanos, seconds = duration.seconds;
    return toMillis(seconds, nanos);
}
exports.durationToMilliseconds = durationToMilliseconds;
function toSecondsAndNanos(milliseconds) {
    var seconds = Math.floor(milliseconds / MILLISECONDS_PER_SECOND);
    var nanos = Math.floor((milliseconds % MILLISECONDS_PER_SECOND) * NANOSECONDS_PER_MILLISECOND);
    return { seconds: seconds, nanos: nanos };
}
function toMillis(seconds, nanos) {
    var secondMillis;
    if (typeof seconds === 'number') {
        secondMillis = seconds * MILLISECONDS_PER_SECOND;
    }
    else {
        secondMillis = seconds
            .multiply(MILLISECONDS_PER_SECOND)
            .toNumber();
    }
    var nanoMillis = nanos / NANOSECONDS_PER_MILLISECOND;
    return secondMillis + nanoMillis;
}
//# sourceMappingURL=TimeConversion.js.map