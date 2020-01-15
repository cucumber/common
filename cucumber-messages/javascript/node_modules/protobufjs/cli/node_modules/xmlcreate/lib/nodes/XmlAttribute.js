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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../error");
var escape_1 = require("../escape");
var options_1 = require("../options");
var validate_1 = require("../validate");
var XmlAttributeText_1 = __importDefault(require("./XmlAttributeText"));
var XmlCharRef_1 = __importDefault(require("./XmlCharRef"));
var XmlEntityRef_1 = __importDefault(require("./XmlEntityRef"));
/**
 * Represents an attribute.
 *
 * An attribute is part of the start tag of an element and is
 * structured as follows, where `{name}` is the name of the attribute and
 * `{value}` is the value of the attribute:
 *
 * ```xml
 * <element {name}="{value}">
 * ```
 *
 * The `{name}` value is a property of this node, while the `{value}` property
 * consists of the children of this node.
 *
 * Attributes can have an unlimited number of attribute text, character
 * references, and entity references.
 */
var XmlAttribute = /** @class */ (function () {
    function XmlAttribute(parent, validation, options) {
        this._validation = validation;
        if (!validate_1.isUndefined(options.replaceInvalidCharsInName)) {
            this._replaceInvalidCharsInName = options.replaceInvalidCharsInName;
        }
        else {
            this._replaceInvalidCharsInName = false;
        }
        this._children = [];
        this._parent = parent;
        this.name = options.name;
    }
    Object.defineProperty(XmlAttribute.prototype, "name", {
        /**
         * Gets the name of this attribute.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of this attribute.
         */
        set: function (name) {
            if (this._replaceInvalidCharsInName) {
                name = validate_1.fixName(name);
                if (name.length === 0) {
                    throw new Error(error_1.getContext(this.up()) + ": attribute name"
                        + " should not be empty");
                }
            }
            else if (this._validation && !validate_1.validateName(name)) {
                if (name.length === 0) {
                    throw new Error(error_1.getContext(this.up()) + ": attribute name"
                        + " should not be empty");
                }
                else {
                    throw new Error(error_1.getContext(this.up()) + ": attribute name"
                        + (" \"" + name + "\" should not contain characters not")
                        + " allowed in XML names");
                }
            }
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a character reference to this attribute and returns the new
     * character reference.
     */
    XmlAttribute.prototype.charRef = function (options) {
        var charRef = new XmlCharRef_1.default(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    };
    /**
     * Adds an entity reference to this attribute and returns the new entity
     * reference.
     */
    XmlAttribute.prototype.entityRef = function (options) {
        var charRef = new XmlEntityRef_1.default(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    };
    /**
     * Adds attribute text to this attribute and returns the new text.
     */
    XmlAttribute.prototype.text = function (options) {
        var textNode = new XmlAttributeText_1.default(this, this._validation, options);
        this._children.push(textNode);
        return textNode;
    };
    /**
     * Returns an XML string representation of this attribute.
     */
    XmlAttribute.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var quote = optionsObj.doubleQuotes ? "\"" : "'";
        var str = this._name + "=" + quote;
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (optionsObj.doubleQuotes) {
                str += escape_1.escapeDoubleQuotes(child.toString());
            }
            else {
                str += escape_1.escapeSingleQuotes(child.toString());
            }
        }
        str += quote;
        return str;
    };
    /**
     * Returns the parent of this attribute.
     */
    XmlAttribute.prototype.up = function () {
        return this._parent;
    };
    return XmlAttribute;
}());
exports.default = XmlAttribute;
