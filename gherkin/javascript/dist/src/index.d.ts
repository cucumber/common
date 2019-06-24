import { messages, ProtobufMessageStream } from 'cucumber-messages';
declare function fromPaths(paths: string[], options?: IGherkinOptions): ProtobufMessageStream<unknown>;
declare function fromSources(sources: messages.Source[], options?: IGherkinOptions): ProtobufMessageStream<unknown>;
export interface IGherkinOptions {
    includeSource: boolean;
    includeGherkinDocument: boolean;
    includePickles: boolean;
}
export { fromPaths, fromSources };
