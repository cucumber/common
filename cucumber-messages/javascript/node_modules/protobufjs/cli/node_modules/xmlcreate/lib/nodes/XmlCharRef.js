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
var validate_1 = require("../validate");
/**
 * Represents a character reference.
 *
 * A character reference is structured as follows, where `{dec}` is the
 * decimal representation code point corresponding to a particular Unicode
 * character:
 *
 * ```xml
 * &#{dec};
 * ```
 *
 * The corresponding hexadecimal version is structured as follows, where
 * `{hex}` is the hexadecimal representation code point corresponding to a
 * particular Unicode character:
 *
 * ```xml
 * &#x{hex};
 * ```
 *
 * Unicode characters outside of the Basic Multilingual Plane are represented
 * using a surrogate pair consisting of two character references.
 *
 * The `{dec}` and `{hex}` values are defined by the `char` and `hex`
 * properties of this node; the former is the character to be represented while
 * the latter indicates whether the decimal or hexadecimal representation
 * should be used.
 */
var XmlCharRef = /** @class */ (function () {
    function XmlCharRef(parent, validation, options) {
        this._hex = false;
        this._validation = validation;
        this._parent = parent;
        this.char = options.char;
        if (!validate_1.isUndefined(options.hex)) {
            this.hex = options.hex;
        }
    }
    Object.defineProperty(XmlCharRef.prototype, "char", {
        /**
         * Gets the character of this character reference.
         */
        get: function () {
            return this._char;
        },
        /**
         * Sets the character of this character reference.
         */
        set: function (char) {
            if (this._validation && !validate_1.validateSingleChar(char)) {
                throw new Error(error_1.getContext(this.up()) + ": character reference"
                    + (" \"" + char + "\" should reference a single character,")
                    + " and this character should be allowed in XML");
            }
            this._char = char;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlCharRef.prototype, "hex", {
        /**
         * Gets whether the decimal or hexadecimal representation should be used
         * for this character reference.
         */
        get: function () {
            return this._hex;
        },
        /**
         * Sets whether the decimal or hexadecimal representation should be used
         * for this character reference.
         */
        set: function (hex) {
            this._hex = hex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an XML string representation of this character reference.
     */
    XmlCharRef.prototype.toString = function () {
        var char;
        if (this._char.length === 1) {
            char = this._char.charCodeAt(0);
        }
        else {
            var first = this._char.charCodeAt(0);
            if (first >= 0xD800 && first <= 0xDBFF && this._char.length > 1) {
                var second = this._char.charCodeAt(1);
                if (second >= 0xDC00 && second <= 0xDFFF) {
                    char = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
                else {
                    throw new Error(error_1.getContext(this.up()) + ": character"
                        + (" reference \"" + this.char + "\" should")
                        + " reference a valid Unicode character");
                }
            }
            else {
                char = first;
            }
        }
        if (this._hex) {
            return "&#x" + char.toString(16) + ";";
        }
        else {
            return "&#" + char + ";";
        }
    };
    /**
     * Returns the parent of this character reference.
     */
    XmlCharRef.prototype.up = function () {
        return this._parent;
    };
    return XmlCharRef;
}());
exports.default = XmlCharRef;
