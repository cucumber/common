"use strict";
/* eslint-disable no-fallthrough */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const util = __importStar(require("../util"));
exports.DEFAULT_IGNORED_REGEX_STRING = '^_';
exports.default = util.createRule({
    name: 'no-unused-vars-experimental',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow unused variables and arguments.',
            category: 'Best Practices',
            recommended: false,
            requiresTypeChecking: true,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    ignoredNamesRegex: {
                        oneOf: [
                            {
                                type: 'string',
                            },
                            {
                                type: 'boolean',
                                enum: [false],
                            },
                        ],
                    },
                    ignoreArgsIfArgsAfterAreUsed: {
                        type: 'boolean',
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            unused: "{{type}} '{{name}}' is declared but its value is never read.",
            unusedWithIgnorePattern: "{{type}} '{{name}}' is declared but its value is never read. Allowed unused names must match {{pattern}}",
            unusedImport: 'All imports in import declaration are unused.',
            unusedTypeParameters: 'All type parameters are unused.',
        },
    },
    defaultOptions: [
        {
            ignoredNamesRegex: exports.DEFAULT_IGNORED_REGEX_STRING,
            ignoreArgsIfArgsAfterAreUsed: false,
        },
    ],
    create(context, [userOptions]) {
        var _a;
        const parserServices = util.getParserServices(context);
        const tsProgram = parserServices.program;
        const afterAllDiagnosticsCallbacks = [];
        const options = {
            ignoredNames: userOptions && typeof userOptions.ignoredNamesRegex === 'string'
                ? new RegExp(userOptions.ignoredNamesRegex)
                : null,
            ignoreArgsIfArgsAfterAreUsed: (_a = userOptions.ignoreArgsIfArgsAfterAreUsed, (_a !== null && _a !== void 0 ? _a : false)),
        };
        function handleIdentifier(identifier) {
            function report(type) {
                const node = parserServices.tsNodeToESTreeNodeMap.get(identifier);
                const regex = options.ignoredNames;
                const name = identifier.getText();
                if (regex) {
                    if (!regex.test(name)) {
                        context.report({
                            node,
                            messageId: 'unusedWithIgnorePattern',
                            data: {
                                name,
                                type,
                                pattern: regex.toString(),
                            },
                        });
                    }
                }
                else {
                    context.report({
                        node,
                        messageId: 'unused',
                        data: {
                            name,
                            type,
                        },
                    });
                }
            }
            const parent = identifier.parent;
            // is a single variable diagnostic
            switch (parent.kind) {
                case typescript_1.default.SyntaxKind.BindingElement:
                case typescript_1.default.SyntaxKind.ObjectBindingPattern:
                    report('Destructured Variable');
                    break;
                case typescript_1.default.SyntaxKind.ClassDeclaration:
                    report('Class');
                    break;
                case typescript_1.default.SyntaxKind.EnumDeclaration:
                    report('Enum');
                    break;
                case typescript_1.default.SyntaxKind.FunctionDeclaration:
                    report('Function');
                    break;
                // this won't happen because there are specific nodes that wrap up named/default import identifiers
                // case ts.SyntaxKind.ImportDeclaration:
                // import equals is always treated as a variable
                case typescript_1.default.SyntaxKind.ImportEqualsDeclaration:
                // the default import is NOT used, but a named import is used
                case typescript_1.default.SyntaxKind.ImportClause:
                // a named import is NOT used, but either another named import, or the default import is used
                case typescript_1.default.SyntaxKind.ImportSpecifier:
                // a namespace import is NOT used, but the default import is used
                case typescript_1.default.SyntaxKind.NamespaceImport:
                    report('Import');
                    break;
                case typescript_1.default.SyntaxKind.InterfaceDeclaration:
                    report('Interface');
                    break;
                case typescript_1.default.SyntaxKind.MethodDeclaration:
                    report('Method');
                    break;
                case typescript_1.default.SyntaxKind.Parameter:
                    handleParameterDeclaration(identifier, parent);
                    break;
                case typescript_1.default.SyntaxKind.PropertyDeclaration:
                    report('Property');
                    break;
                case typescript_1.default.SyntaxKind.TypeAliasDeclaration:
                    report('Type');
                    break;
                case typescript_1.default.SyntaxKind.TypeParameter:
                    handleTypeParam(identifier);
                    break;
                case typescript_1.default.SyntaxKind.VariableDeclaration:
                    report('Variable');
                    break;
                default:
                    throw new Error(`Unknown node with kind ${parent.kind}.`);
                // TODO - should we just handle this gracefully?
                // report('Unknown Node');
                // break;
            }
        }
        const unusedParameters = new Set();
        function handleParameterDeclaration(identifier, parent) {
            const name = identifier.getText();
            // regardless of if the paramter is ignored, track that it had a diagnostic fired on it
            unusedParameters.add(identifier);
            /*
            NOTE - Typescript will automatically ignore parameters that have a
                   leading underscore in their name. We cannot do anything about this.
            */
            function report() {
                const node = parserServices.tsNodeToESTreeNodeMap.get(identifier);
                context.report({
                    node,
                    messageId: 'unused',
                    data: {
                        name,
                        type: 'Parameter',
                    },
                });
            }
            const isLastParameter = parent.parent.parameters.indexOf(parent) ===
                parent.parent.parameters.length - 1;
            if (!isLastParameter && options.ignoreArgsIfArgsAfterAreUsed) {
                // once all diagnostics are processed, we can check if the following args are unused
                afterAllDiagnosticsCallbacks.push(() => {
                    for (const param of parent.parent.parameters) {
                        if (!unusedParameters.has(param.name)) {
                            return;
                        }
                    }
                    // none of the following params were unused, so report
                    report();
                });
            }
            else {
                report();
            }
        }
        function handleImportDeclaration(parent) {
            // the entire import statement is unused
            /*
            NOTE - Typescript will automatically ignore imports that have a
                   leading underscore in their name. We cannot do anything about this.
            */
            context.report({
                messageId: 'unusedImport',
                node: parserServices.tsNodeToESTreeNodeMap.get(parent),
            });
        }
        function handleDestructure(parent) {
            // the entire desctructure is unused
            // note that this case only ever triggers for simple, single-level destructured objects
            // i.e. these will not trigger it:
            // - const {a:_a, b, c: {d}} = z;
            // - const [a, b] = c;
            parent.elements.forEach(element => {
                if (element.kind === typescript_1.default.SyntaxKind.BindingElement) {
                    const name = element.name;
                    if (name.kind === typescript_1.default.SyntaxKind.Identifier) {
                        handleIdentifier(name);
                    }
                }
            });
        }
        function handleTypeParamList(node) {
            // the entire generic decl list is unused
            /*
            NOTE - Typescript will automatically ignore generics that have a
                   leading underscore in their name. We cannot do anything about this.
            */
            const parent = parserServices.tsNodeToESTreeNodeMap.get(node);
            context.report({
                messageId: 'unusedTypeParameters',
                node: parent.typeParameters,
            });
        }
        function handleTypeParam(identifier) {
            context.report({
                node: parserServices.tsNodeToESTreeNodeMap.get(identifier),
                messageId: 'unused',
                data: {
                    name: identifier.getText(),
                    type: 'Type Parameter',
                },
            });
        }
        return {
            'Program:exit'(program) {
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(program);
                const sourceFile = util.getSourceFileOfNode(tsNode);
                const diagnostics = tsProgram.getSemanticDiagnostics(sourceFile);
                diagnostics.forEach(diag => {
                    if (isUnusedDiagnostic(diag.code)) {
                        if (diag.start !== undefined) {
                            const node = util.getTokenAtPosition(sourceFile, diag.start);
                            const parent = node.parent;
                            if (isIdentifier(node)) {
                                handleIdentifier(node);
                            }
                            else if (isImport(parent)) {
                                handleImportDeclaration(parent);
                            }
                            else if (isDestructure(parent)) {
                                handleDestructure(parent);
                            }
                            else if (isGeneric(node, parent)) {
                                handleTypeParamList(parent);
                            }
                        }
                    }
                });
                // trigger all the checks to be done after all the diagnostics have been evaluated
                afterAllDiagnosticsCallbacks.forEach(cb => cb());
            },
        };
    },
});
/**
 * Checks if the diagnostic code is one of the expected "unused var" codes
 */
function isUnusedDiagnostic(code) {
    return [
        6133,
        6138,
        6192,
        6196,
        6198,
        6199,
        6205,
    ].includes(code);
}
/**
 * Checks if the given node is a destructuring pattern
 */
function isDestructure(node) {
    return (node.kind === typescript_1.default.SyntaxKind.ObjectBindingPattern ||
        node.kind === typescript_1.default.SyntaxKind.ArrayBindingPattern);
}
function isImport(node) {
    return node.kind === typescript_1.default.SyntaxKind.ImportDeclaration;
}
function isIdentifier(node) {
    return node.kind === typescript_1.default.SyntaxKind.Identifier;
}
function isGeneric(node, parent) {
    return (node.kind === typescript_1.default.SyntaxKind.LessThanToken &&
        parent.typeParameters !== undefined);
}
//# sourceMappingURL=no-unused-vars-experimental.js.map