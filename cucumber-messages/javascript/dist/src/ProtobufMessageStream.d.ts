/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
import { Reader } from 'protobufjs';
declare class ProtobufMessageStream<T> extends Transform {
    private readonly decodeDelimited;
    private buffer;
    constructor(decodeDelimited: (reader: Reader | Uint8Array) => T);
    _transform(chunk: any, encoding: string, callback: TransformCallback): void;
}
export default ProtobufMessageStream;
