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
var options_1 = require("../options");
var validate_1 = require("../validate");
var XmlAttribute_1 = __importDefault(require("./XmlAttribute"));
var XmlCdata_1 = __importDefault(require("./XmlCdata"));
var XmlCharData_1 = __importDefault(require("./XmlCharData"));
var XmlCharRef_1 = __importDefault(require("./XmlCharRef"));
var XmlComment_1 = __importDefault(require("./XmlComment"));
var XmlEntityRef_1 = __importDefault(require("./XmlEntityRef"));
var XmlProcInst_1 = __importDefault(require("./XmlProcInst"));
/**
 * Represents an XML element.
 *
 * A sample element is structured as follows, where `{name}` is the name
 * of the element:
 *
 * ```xml
 * <{name} attname="attvalue">
 *     <subelem/>
 *     <?pitarget picontent?>
 *     text
 * </{name}></pre>
 * ```
 *
 * XML elements can have an unlimited number of attributes, CDATA sections,
 * character references, comments, elements, entity references, processing
 * instructions, and character data.
 *
 * An element with no content will be represented using an empty element tag:
 *
 * ```xml
 * <{name}/>
 * ```
 */
var XmlElement = /** @class */ (function () {
    function XmlElement(parent, validation, options) {
        this._validation = validation;
        if (!validate_1.isUndefined(options.replaceInvalidCharsInName)) {
            this._replaceInvalidCharsInName = options.replaceInvalidCharsInName;
        }
        else {
            this._replaceInvalidCharsInName = false;
        }
        if (!validate_1.isUndefined(options.useSelfClosingTagIfEmpty)) {
            this._useSelfClosingTagIfEmpty = options.useSelfClosingTagIfEmpty;
        }
        else {
            this._useSelfClosingTagIfEmpty = true;
        }
        this._children = [];
        this._attributeNames = [];
        this._parent = parent;
        this.name = options.name;
    }
    Object.defineProperty(XmlElement.prototype, "name", {
        /**
         * Gets the name of this element.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of this element.
         */
        set: function (name) {
            if (this._replaceInvalidCharsInName) {
                name = validate_1.fixName(name);
                if (name.length === 0) {
                    throw new Error(error_1.getContext(this.up()) + ": element name should"
                        + " not be empty");
                }
            }
            else if (this._validation && !validate_1.validateName(name)) {
                if (name.length === 0) {
                    throw new Error(error_1.getContext(this.up()) + ": element name should"
                        + " not be empty");
                }
                else {
                    throw new Error(error_1.getContext(this.up()) + ": element name"
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
     * Adds an attribute to this element and returns the new attribute.
     */
    XmlElement.prototype.attribute = function (options) {
        if (this._validation
            && this._attributeNames.indexOf(options.name) !== -1) {
            throw new Error(error_1.getContext(this.up()) + ": element \"" + this.name + "\""
                + " already contains an attribute with the"
                + (" name \"" + options.name + "\""));
        }
        var attribute = new XmlAttribute_1.default(this, this._validation, options);
        this._children.push(attribute);
        this._attributeNames.push(options.name);
        return attribute;
    };
    /**
     * Adds a CDATA section to this element and returns the new CDATA section.
     */
    XmlElement.prototype.cdata = function (options) {
        var cdata = new XmlCdata_1.default(this, this._validation, options);
        this._children.push(cdata);
        return cdata;
    };
    /**
     * Adds character data to this element and returns the new character data.
     */
    XmlElement.prototype.charData = function (options) {
        var charDataNode = new XmlCharData_1.default(this, this._validation, options);
        this._children.push(charDataNode);
        return charDataNode;
    };
    /**
     * Adds a character reference to this element and returns the new
     * character reference.
     */
    XmlElement.prototype.charRef = function (options) {
        var charRef = new XmlCharRef_1.default(this, this._validation, options);
        this._children.push(charRef);
        return charRef;
    };
    /**
     * Adds a comment to this element and returns the new comment.
     */
    XmlElement.prototype.comment = function (options) {
        var comment = new XmlComment_1.default(this, this._validation, options);
        this._children.push(comment);
        return comment;
    };
    /**
     * Adds an element to this element and returns the new element.
     */
    XmlElement.prototype.element = function (options) {
        var element = new XmlElement(this, this._validation, options);
        this._children.push(element);
        return element;
    };
    /**
     * Adds an entity reference to this element and returns the new entity
     * reference.
     */
    XmlElement.prototype.entityRef = function (options) {
        var entityRef = new XmlEntityRef_1.default(this, this._validation, options);
        this._children.push(entityRef);
        return entityRef;
    };
    /**
     * Adds a processing instruction to this element and returns the new
     * processing instruction.
     */
    XmlElement.prototype.procInst = function (options) {
        var procInst = new XmlProcInst_1.default(this, this._validation, options);
        this._children.push(procInst);
        return procInst;
    };
    /**
     * Returns an XML string representation of this element using the specified
     * options.
     */
    XmlElement.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return this.toStringWithIndent(options, "");
    };
    /**
     * Returns the parent of this element.
     */
    XmlElement.prototype.up = function () {
        return this._parent;
    };
    /**
     * Returns an XML string representation of this element using the specified
     * options and initial indent.
     */
    XmlElement.prototype.toStringWithIndent = function (options, indent) {
        var optionsObj = new options_1.StringOptions(options);
        var newIndent = indent + optionsObj.indent;
        // Element tag start
        var str = "<" + this._name;
        // Attributes and other nodes
        var nodes = [];
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node instanceof XmlAttribute_1.default) {
                str += " " + node.toString(options);
            }
            else {
                nodes.push(node);
            }
        }
        // Child nodes
        if (nodes.length > 0) {
            var childStr = "";
            for (var i = 0; i < nodes.length; i++) {
                var next = nodes[i];
                var nextStr = "";
                if (next instanceof XmlElement) {
                    nextStr += next.toStringWithIndent(optionsObj, newIndent);
                }
                else {
                    nextStr += next.toString();
                }
                var prev = i > 0 ? nodes[i - 1] : undefined;
                // Skip empty nodes
                if (next instanceof XmlCharData_1.default && next.toString() === "") {
                    continue;
                }
                // Line break before child nodes unless all nodes, or at least
                // the most recent two, are of type XmlCharacterReference,
                // XmlEntityReference, or XmlCharData
                if (optionsObj.pretty) {
                    if (!this.allSameLineNodes(nodes)) {
                        if (!(i > 0 && this.onSameLine(next, prev))) {
                            nextStr = optionsObj.newline + newIndent + nextStr;
                        }
                    }
                }
                childStr += nextStr;
            }
            // Line break before end tag unless all nodes are of type
            // XmlCharacterReference, XmlEntityReference, or XmlCharData
            if (optionsObj.pretty) {
                if (!this.allSameLineNodes(nodes)) {
                    childStr += optionsObj.newline + indent;
                }
            }
            if (childStr.length === 0 && this._useSelfClosingTagIfEmpty) {
                // Element empty tag end
                str += "/>";
            }
            else {
                // Element start and end tags
                str += ">" + childStr + "</" + this._name + ">";
            }
        }
        else {
            // Element empty tag end
            str += "/>";
        }
        return str;
    };
    /**
     * Returns true if the specified nodes are all character references,
     * entity references, or character data.
     */
    XmlElement.prototype.allSameLineNodes = function (nodes) {
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            if (!((node instanceof XmlCharRef_1.default
                || node instanceof XmlEntityRef_1.default
                || node instanceof XmlCharData_1.default))) {
                return false;
            }
        }
        return true;
    };
    /**
     * Returns true if the specified nodes are all character references,
     * entity references, or character data.
     */
    XmlElement.prototype.onSameLine = function (prev, next) {
        return (prev instanceof XmlCharRef_1.default
            || prev instanceof XmlEntityRef_1.default
            || prev instanceof XmlCharData_1.default)
            && (!validate_1.isUndefined(next)
                && (next instanceof XmlCharRef_1.default
                    || next instanceof XmlEntityRef_1.default
                    || next instanceof XmlCharData_1.default));
    };
    return XmlElement;
}());
exports.default = XmlElement;
