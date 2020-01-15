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
 * Represents a CDATA section.
 *
 * A CDATA section is structured as follows, where `{data}` is the
 * character data of the section:
 *
 * ```xml
 * <![CDATA[{data}]]>
 * ```
 */
var XmlCdata = /** @class */ (function () {
    function XmlCdata(parent, validation, options) {
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
    Object.defineProperty(XmlCdata.prototype, "charData", {
        /**
         * Gets the character data of this CDATA section.
         */
        get: function () {
            return this._charData;
        },
        /**
         * Sets the character data of this CDATA section.
         */
        set: function (charData) {
            if (this._replaceInvalidCharsInCharData) {
                charData = validate_1.fixChar(charData);
            }
            else if (this._validation && !validate_1.validateChar(charData)) {
                throw new Error(error_1.getContext(this.up()) + ": CDATA section"
                    + (" \"" + charData + "\" should not contain characters")
                    + " not allowed in XML");
            }
            if (this._replaceInvalidCharsInCharData) {
                charData = charData.replace("]]>", "\uFFFD\uFFFD\uFFFD");
            }
            else if (this._validation && charData.indexOf("]]>") !== -1) {
                throw new Error(error_1.getContext(this.up()) + ": CDATA section"
                    + (" \"" + charData + "\" should not contain the string")
                    + " ']]>'");
            }
            this._charData = charData;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an XML string representation of this CDATA section.
     */
    XmlCdata.prototype.toString = function () {
        return "<![CDATA[" + this._charData + "]]>";
    };
    /**
     * Returns the parent of this CDATA section.
     */
    XmlCdata.prototype.up = function () {
        return this._parent;
    };
    return XmlCdata;
}());
exports.default = XmlCdata;
