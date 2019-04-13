import {io} from "cucumber-messages/src/cucumber-messages";
import * as Stream from "stream";
import Source = io.cucumber.messages.Source;

export interface IGherkinOptions {
    defaultDialect: string,
    includeSource: boolean,
    includeGherkinDocument: boolean,
    includePickles: boolean,
}

export interface IGherkinDialect {
    and: []string,
    background: []string,
    but: []string,
    examples: []string,
    feature: []string,
    given: []string,
    name: string,
    native: string,
    rule: []string,
    scenario: []string,
    scenarioOutline: []string,
    then: []string,
    when: []string,
}

export interface IGherkinDialectMap {
    [language: string]: IGherkinDialect,
}

export function fromPaths(args: string[], options?: IGherkinOptions): Stream.Readable;
export function fromSources(args: Source[], options?: IGherkinOptions): Stream.Readable;
export function dialects(): IGherkinDialectMap;
