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
var error_1 = require("../error");
var options_1 = require("../options");
var validate_1 = require("../validate");
/**
 * Represents a declaration.
 *
 * A declaration is structured as follows, where `{version}` is the XML
 * version, `{encoding}` is the encoding of the document, and `{standalone}`
 * is either "yes" or "no", depending on whether the document may contain
 * external markup declarations:
 *
 * ```xml
 * <?xml version="{version}" encoding="{encoding}" standalone="{standalone}"?>
 * ```
 */
var XmlDecl = /** @class */ (function () {
    function XmlDecl(parent, validation, options) {
        this._version = "1.0";
        this._validation = validation;
        this._parent = parent;
        this.encoding = options.encoding;
        this.standalone = options.standalone;
        if (!validate_1.isUndefined(options.version)) {
            this.version = options.version;
        }
    }
    Object.defineProperty(XmlDecl.prototype, "encoding", {
        /**
         * Gets the encoding associated with this declaration.
         */
        get: function () {
            return this._encoding;
        },
        /**
         * Sets the encoding associated with this declaration.
         */
        set: function (encoding) {
            if (this._validation && !validate_1.isUndefined(encoding)) {
                if (!validateEncoding(encoding)) {
                    throw new Error(error_1.getContext(this.up()) + ": declaration"
                        + (" encoding attribute " + encoding + " should be a")
                        + " valid encoding");
                }
            }
            this._encoding = encoding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDecl.prototype, "standalone", {
        /**
         * Gets the value of the standalone attribute associated with this
         * declaration.
         */
        get: function () {
            return this._standalone;
        },
        /**
         * Sets the value of the standalone attribute associated with this
         * declaration.
         */
        set: function (standalone) {
            if (this._validation && !validate_1.isUndefined(standalone)) {
                if (standalone !== "yes" && standalone !== "no") {
                    throw new Error(error_1.getContext(this.up()) + ": declaration"
                        + (" standalone attribute " + standalone + " should")
                        + " be the string 'yes' or the string 'no'");
                }
            }
            this._standalone = standalone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDecl.prototype, "version", {
        /**
         * Gets the XML version associated with this declaration.
         */
        get: function () {
            return this._version;
        },
        /**
         * Sets the XML version associated with this declaration.
         */
        set: function (version) {
            if (this._validation && !validateVersion(version)) {
                throw new Error(error_1.getContext(this.up()) + ": declaration version"
                    + (" attribute " + version + " should be a valid XML")
                    + " version");
            }
            this._version = version;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an XML string representation of this declaration.
     */
    XmlDecl.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var quote = optionsObj.doubleQuotes ? '"' : "'";
        var str = "<?xml version=" + quote + this._version + quote;
        if (!validate_1.isUndefined(this._encoding)) {
            str += " encoding=" + quote + this._encoding + quote;
        }
        if (!validate_1.isUndefined(this._standalone)) {
            str += " standalone=" + quote + this._standalone + quote;
        }
        str += "?>";
        return str;
    };
    /**
     * Returns the parent of this declaration.
     */
    XmlDecl.prototype.up = function () {
        return this._parent;
    };
    return XmlDecl;
}());
exports.default = XmlDecl;
/**
 * Returns true if the specified encoding only contains characters permitted by
 * the XML specification.
 *
 * @private
 */
function validateEncoding(str) {
    if (str.length === 0) {
        return false;
    }
    var initialChar = str.charCodeAt(0);
    if (!((initialChar >= 0x41 && initialChar <= 0x5A)
        || (initialChar >= 0x61 && initialChar <= 0x7A))) {
        return false;
    }
    for (var i = 1; i < str.length; i++) {
        var char = str.charCodeAt(i);
        if (char === 0x5F
            || char === 0x2D
            || char === 0x2E
            || (char >= 0x30 && char <= 0x39)
            || (char >= 0x41 && char <= 0x5A)
            || (char >= 0x61 && char <= 0x7A)) {
            continue;
        }
        if (i + 1 === str.length) {
            return false;
        }
        return false;
    }
    return true;
}
/**
 * Returns true if the specified version only contains characters permitted by
 * the XML specification.
 *
 * @private
 */
function validateVersion(str) {
    for (var i = 0; i <= 9; i++) {
        if (str === "1." + i) {
            return true;
        }
    }
    return false;
}
