/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
/**
 * Transforms an NDJSON stream to a stream of message objects
 */
export default class NdjsonToMessageStream<T> extends Transform {
    private readonly fromObject;
    private buffer;
    constructor(fromObject: (object: any) => T);
    _transform(chunk: string, encoding: string, callback: TransformCallback): void;
    _flush(callback: TransformCallback): void;
}
