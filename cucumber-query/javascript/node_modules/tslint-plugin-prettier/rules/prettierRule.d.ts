import * as tslint from 'tslint';
import * as ts from 'typescript';
export declare class Rule extends tslint.Rules.AbstractRule {
    apply(sourceFile: ts.SourceFile): tslint.RuleFailure[];
}
