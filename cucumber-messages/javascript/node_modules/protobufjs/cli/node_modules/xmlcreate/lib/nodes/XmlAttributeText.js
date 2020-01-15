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
var escape_1 = require("../escape");
var validate_1 = require("../validate");
/**
 * Represents text in an attribute value.
 *
 * Restricted characters, such as the ampersand (`&`) and the opening angle
 * bracket (`<`), are all automatically escaped.
 */
var XmlAttributeText = /** @class */ (function () {
    function XmlAttributeText(parent, validation, options) {
        this._validation = validation;
        if (!validate_1.isUndefined(options.replaceInvalidCharsInCharData)) {
            this._replaceInvalidCharsInCharData = (options.replaceInvalidCharsInCharData);
        }
        else {
            this._replaceInvalidCharsInCharData = false;
        }
        this._parent = parent;
        this.charData = options.charData;
    }
    Object.defineProperty(XmlAttributeText.prototype, "charData", {
        /**
         * Gets this attribute text.
         */
        get: function () {
            return this._charData;
        },
        /**
         * Sets this attribute text.
         */
        set: function (charData) {
            if (this._replaceInvalidCharsInCharData) {
                charData = validate_1.fixChar(charData);
            }
            else if (this._validation && !validate_1.validateChar(charData)) {
                throw new Error(error_1.getContext(this.up()) + ": attribute text"
                    + (" \"" + charData + "\" should not contain characters not")
                    + " allowed in XML");
            }
            this._charData = charData;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an XML string representation of this attribute text.
     */
    XmlAttributeText.prototype.toString = function () {
        var str = this._charData;
        str = escape_1.escapeAmpersands(str);
        str = escape_1.escapeLeftAngleBrackets(str);
        return str;
    };
    /**
     * Returns the parent of this attribute text.
     */
    XmlAttributeText.prototype.up = function () {
        return this._parent;
    };
    return XmlAttributeText;
}());
exports.default = XmlAttributeText;
