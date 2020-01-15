"use strict";
/**
 * Copyright (C) 2016-2019 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Implementation of the IOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
var Options = /** @class */ (function () {
    function Options(options) {
        if (options === void 0) { options = {}; }
        this.aliasString = "=";
        this.attributeString = "@";
        this.cdataInvalidChars = false;
        this.cdataKeys = [];
        this.replaceInvalidChars = false;
        this.useSelfClosingTagIfEmpty = true;
        this.validation = true;
        this.valueString = "#";
        if (!utils_1.isUndefined(options.validation)) {
            this.validation = options.validation;
        }
        if (!utils_1.isUndefined(options.aliasString)) {
            this.aliasString = options.aliasString;
        }
        if (!utils_1.isUndefined(options.attributeString)) {
            this.attributeString = options.attributeString;
        }
        if (!utils_1.isUndefined(options.cdataInvalidChars)) {
            this.cdataInvalidChars = options.cdataInvalidChars;
        }
        if (!utils_1.isUndefined(options.cdataKeys)) {
            this.cdataKeys = options.cdataKeys;
        }
        this.declaration = new DeclarationOptions(options.declaration);
        this.dtd = new DtdOptions(this.validation, options.dtd);
        this.format = new FormatOptions(options.format);
        if (!utils_1.isUndefined(options.replaceInvalidChars)) {
            this.replaceInvalidChars = options.replaceInvalidChars;
        }
        this.typeHandlers = new TypeHandlers(options.typeHandlers);
        if (!utils_1.isUndefined(options.useSelfClosingTagIfEmpty)) {
            this.useSelfClosingTagIfEmpty = options.useSelfClosingTagIfEmpty;
        }
        if (!utils_1.isUndefined(options.valueString)) {
            this.valueString = options.valueString;
        }
        this.wrapHandlers = new WrapHandlers(options.wrapHandlers);
    }
    return Options;
}());
exports.Options = Options;
/**
 * Implementation of the IDeclarationOptions interface used to provide default
 * values to fields.
 *
 * @private
 */
var DeclarationOptions = /** @class */ (function () {
    function DeclarationOptions(declarationOptions) {
        if (declarationOptions === void 0) { declarationOptions = {}; }
        this.include = true;
        if (!utils_1.isUndefined(declarationOptions.include)) {
            this.include = declarationOptions.include;
        }
        // Validation performed by xmlcreate
        this.encoding = declarationOptions.encoding;
        this.standalone = declarationOptions.standalone;
        this.version = declarationOptions.version;
    }
    return DeclarationOptions;
}());
exports.DeclarationOptions = DeclarationOptions;
/**
 * Implementation of the IDtdOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
var DtdOptions = /** @class */ (function () {
    function DtdOptions(validation, dtdOptions) {
        if (dtdOptions === void 0) { dtdOptions = {}; }
        this.include = false;
        if (!utils_1.isUndefined(dtdOptions.include)) {
            this.include = dtdOptions.include;
        }
        if (validation && utils_1.isUndefined(dtdOptions.name) && this.include) {
            throw new Error("options.dtd.name should be defined if"
                + " options.dtd.include is true");
        }
        this.name = dtdOptions.name;
        this.sysId = dtdOptions.sysId;
        this.pubId = dtdOptions.pubId;
    }
    return DtdOptions;
}());
exports.DtdOptions = DtdOptions;
/**
 * Implementation of the IFormatOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
var FormatOptions = /** @class */ (function () {
    function FormatOptions(formatOptions) {
        if (formatOptions === void 0) { formatOptions = {}; }
        this.doubleQuotes = formatOptions.doubleQuotes;
        this.indent = formatOptions.indent;
        this.newline = formatOptions.newline;
        this.pretty = formatOptions.pretty;
    }
    return FormatOptions;
}());
exports.FormatOptions = FormatOptions;
/**
 * Implementation of the ITypeHandlers interface used to provide default values
 * to fields.
 *
 * @private
 */
var TypeHandlers = /** @class */ (function () {
    function TypeHandlers(typeHandlers) {
        if (typeHandlers === void 0) { typeHandlers = {}; }
        for (var key in typeHandlers) {
            if (typeHandlers.hasOwnProperty(key)) {
                this[key] = typeHandlers[key];
            }
        }
    }
    return TypeHandlers;
}());
exports.TypeHandlers = TypeHandlers;
/**
 * Implementation of the IWrapHandlers interface used to provide default values
 * to fields.
 *
 * @private
 */
var WrapHandlers = /** @class */ (function () {
    function WrapHandlers(wrapHandlers) {
        if (wrapHandlers === void 0) { wrapHandlers = {}; }
        for (var key in wrapHandlers) {
            if (wrapHandlers.hasOwnProperty(key)) {
                this[key] = wrapHandlers[key];
            }
        }
    }
    return WrapHandlers;
}());
exports.WrapHandlers = WrapHandlers;
