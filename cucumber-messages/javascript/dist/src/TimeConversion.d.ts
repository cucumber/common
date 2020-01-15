import { messages } from './index';
export declare function millisecondsSinceEpochToTimestamp(millisecondsSinceEpoch: number): messages.ITimestamp;
export declare function millisecondsToDuration(durationInMilliseconds: number): messages.IDuration;
export declare function timestampToMillisecondsSinceEpoch(timestamp: messages.ITimestamp): number;
export declare function durationToMilliseconds(duration: messages.IDuration): number;
