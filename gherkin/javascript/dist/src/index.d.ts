import { messages, ProtobufMessageStream } from "cucumber-messages";
declare function fromPaths(paths: string[], options?: IGherkinOptions): ProtobufMessageStream<{}>;
declare function fromSources(sources: messages.Source[], options?: IGherkinOptions): ProtobufMessageStream<{}>;
export interface IGherkinOptions {
    includeSource: boolean;
    includeGherkinDocument: boolean;
    includePickles: boolean;
}
export { fromPaths, fromSources };
