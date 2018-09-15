import {io} from "cucumber-messages/src/cucumber-messages";
import * as Stream from "stream";
import Source = io.cucumber.messages.Source;

export interface IGherkinOptions {
    includeSource: boolean,
    includeGherkinDocument: boolean,
    includePickles: boolean,
}

export function fromPaths(args: string[], options?: IGherkinOptions): Stream.Readable;
export function fromSources(args: Source[], options?: IGherkinOptions): Stream.Readable;
