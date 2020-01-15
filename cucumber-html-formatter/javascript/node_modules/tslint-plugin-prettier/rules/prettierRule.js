"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var utils = require("eslint-plugin-prettier");
var lines_and_columns_1 = require("lines-and-columns");
var path = require("path");
var prettier = require("prettier");
var tslint = require("tslint");
var Rule = /** @class */ (function (_super) {
    tslib_1.__extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, this.ruleArguments));
    };
    return Rule;
}(tslint.Rules.AbstractRule));
exports.Rule = Rule;
var Walker = /** @class */ (function (_super) {
    tslib_1.__extends(Walker, _super);
    function Walker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Walker.prototype.walk = function (sourceFile) {
        var _a = this.options, ruleArgument1 = _a[0], _b = _a[1], ruleArgument2 = _b === void 0 ? {} : _b;
        var _c = ruleArgument2.editorconfig, editorconfig = _c === void 0 ? true : _c;
        var options = {};
        switch (typeof ruleArgument1) {
            case 'string': {
                var configFilePath = path.resolve(process.cwd(), ruleArgument1);
                var resolvedConfig = prettier.resolveConfig.sync(sourceFile.fileName, { config: configFilePath, editorconfig: editorconfig });
                // istanbul ignore next
                if (resolvedConfig === null) {
                    throw new Error("Config file not found: " + configFilePath);
                }
                options = resolvedConfig;
                break;
            }
            case 'object':
                if (ruleArgument1) {
                    options = ruleArgument1;
                    break;
                }
            // falls through for null
            default: {
                var resolvedConfig = prettier.resolveConfig.sync(sourceFile.fileName, { editorconfig: editorconfig });
                if (resolvedConfig !== null) {
                    options = resolvedConfig;
                }
                break;
            }
        }
        var source = sourceFile.getFullText();
        try {
            var formatted = prettier.format(source, tslib_1.__assign({ parser: 'typescript' }, options));
            if (source === formatted) {
                return;
            }
            reportDifferences(this, source, formatted);
        }
        catch (e) {
            // istanbul ignore else
            if (e.loc) {
                reportSyntaxError(this, source, e);
            }
            else {
                throw e;
            }
        }
    };
    return Walker;
}(tslint.AbstractWalker));
function reportSyntaxError(walkContext, source, error) {
    var locator = new lines_and_columns_1["default"](source);
    var offset = locator.indexForLocation({
        column: error.loc.start.column - 1,
        line: error.loc.start.line - 1
    });
    var message = error.message
        .split('\n')[0]
        .replace(/\s*\(\d+:\d+\)\s*$/, '');
    walkContext.addFailureAt(offset, 1, "SyntaxError: " + message);
}
function reportDifferences(walkContext, source, formatted) {
    utils.generateDifferences(source, formatted).forEach(function (difference) {
        var operation = difference.operation, start = difference.offset, _a = difference.deleteText, deleteText = _a === void 0 ? '' : _a, _b = difference.insertText, insertText = _b === void 0 ? '' : _b;
        var end = start + deleteText.length;
        var deleteCode = utils.showInvisibles(deleteText);
        var insertCode = utils.showInvisibles(insertText);
        switch (operation) {
            case 'insert':
                walkContext.addFailureAt(start, 1, "Insert `" + insertCode + "`", tslint.Replacement.appendText(start, insertText));
                break;
            case 'delete':
                walkContext.addFailure(start, end, "Delete `" + deleteCode + "`", tslint.Replacement.deleteFromTo(start, end));
                break;
            case 'replace':
                walkContext.addFailure(start, end, "Replace `" + deleteCode + "` with `" + insertCode + "`", tslint.Replacement.replaceFromTo(start, end, insertText));
                break;
            // istanbul ignore next
            default:
                throw new Error("Unexpected operation '" + operation + "'");
        }
    });
}
