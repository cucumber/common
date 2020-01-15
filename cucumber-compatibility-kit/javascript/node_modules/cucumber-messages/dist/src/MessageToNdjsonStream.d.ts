/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
/**
 * Transforms a stream of message objects to NDJSON
 */
export default class MessageToNdjsonStream<T> extends Transform {
    constructor();
    _transform(message: T, encoding: string, callback: TransformCallback): void;
}
