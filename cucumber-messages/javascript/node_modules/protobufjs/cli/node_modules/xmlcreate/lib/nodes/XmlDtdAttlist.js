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
 * Represents an attribute-list declaration in a document type definition.
 *
 * An attribute-list declaration is structured as follows, where `{text}`
 * is the text of the declaration:
 *
 * ```xml
 * <!ATTLIST {text}>
 * ```
 */
var XmlDtdAttlist = /** @class */ (function () {
    function XmlDtdAttlist(parent, validation, options) {
        this._validation = validation;
        this._parent = parent;
        this.charData = options.charData;
    }
    Object.defineProperty(XmlDtdAttlist.prototype, "charData", {
        /**
         * Gets the text of this entity declaration.
         */
        get: function () {
            return this._charData;
        },
        /**
         * Sets the text of this entity declaration.
         */
        set: function (charData) {
            if (this._validation && !validate_1.validateChar(charData)) {
                throw new Error(error_1.getContext(this.up()) + ": attribute-list"
                    + (" declaration \"" + charData + "\" should not contain")
                    + " characters not allowed in XML");
            }
            this._charData = charData;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an XML string representation of this entity declaration.
     */
    XmlDtdAttlist.prototype.toString = function () {
        return "<!ATTLIST " + this._charData + ">";
    };
    /**
     * Returns the parent of this entity declaration.
     */
    XmlDtdAttlist.prototype.up = function () {
        return this._parent;
    };
    return XmlDtdAttlist;
}());
exports.default = XmlDtdAttlist;
