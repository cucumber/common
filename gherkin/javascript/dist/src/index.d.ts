/// <reference types="node" />
import { messages } from 'cucumber-messages';
import { Readable } from 'stream';
declare function fromPaths(paths: string[], options?: IGherkinOptions): Readable;
declare function fromSources(sources: messages.Source[], options?: IGherkinOptions): Readable;
declare function fromSourcesWasm(): Promise<void>;
export interface IGherkinOptions {
    includeSource: boolean;
    includeGherkinDocument: boolean;
    includePickles: boolean;
}
declare const _default: {
    fromPaths: typeof fromPaths;
    fromSources: typeof fromSources;
    fromSourcesWasm: typeof fromSourcesWasm;
};
export default _default;
