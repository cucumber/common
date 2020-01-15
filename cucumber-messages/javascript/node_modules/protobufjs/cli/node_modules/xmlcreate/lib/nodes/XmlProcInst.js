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
 * Represents a processing instruction.
 *
 * A processing instruction is structured as follows, where `{target}` and
 * `{content}` are the target and content of the processing instruction
 * respectively:
 *
 * ```xml
 * <?{target} {content}?>
 * ```
 */
var XmlProcInst = /** @class */ (function () {
    function XmlProcInst(parent, validation, options) {
        this._validation = validation;
        this._parent = parent;
        this.content = options.content;
        this.target = options.target;
    }
    Object.defineProperty(XmlProcInst.prototype, "content", {
        /**
         * Gets the content of this processing instruction.
         */
        get: function () {
            return this._content;
        },
        /**
         * Sets the content of this processing instruction.
         */
        set: function (content) {
            if (!validate_1.isUndefined(content)) {
                if (this._validation && !validate_1.validateChar(content)) {
                    throw new Error(error_1.getContext(this.up()) + ": processing"
                        + (" instruction content \"" + content + "\" should")
                        + " not contain characters not allowed in XML");
                }
                else if (this._validation && content.indexOf("?>") !== -1) {
                    throw new Error(error_1.getContext(this.up()) + ": processing"
                        + (" instruction content \"" + content + "\" should")
                        + " not contain the string '?>'");
                }
            }
            this._content = content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlProcInst.prototype, "target", {
        /**
         * Gets the target of this processing instruction.
         */
        get: function () {
            return this._target;
        },
        /**
         * Sets the content of this processing instruction.
         */
        set: function (target) {
            if (this._validation && !validate_1.validateName(target)) {
                throw new Error(error_1.getContext(this.up()) + ": processing"
                    + (" instruction target \"" + target + "\" should")
                    + " not contain characters not allowed in XML"
                    + " names");
            }
            if (this._validation && target === "xml") {
                throw new Error(error_1.getContext(this.up()) + ": processing"
                    + (" instruction target \"" + target + "\" should")
                    + " not be the string 'xml'");
            }
            this._target = target;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an XML string representation of this processing instruction.
     */
    XmlProcInst.prototype.toString = function () {
        if (validate_1.isUndefined(this._content)) {
            return "<?" + this._target + "?>";
        }
        else {
            return "<?" + this._target + " " + this._content + "?>";
        }
    };
    /**
     * Returns the parent of this processing instruction.
     */
    XmlProcInst.prototype.up = function () {
        return this._parent;
    };
    return XmlProcInst;
}());
exports.default = XmlProcInst;
