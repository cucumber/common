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
var XmlComment_1 = __importDefault(require("./XmlComment"));
var XmlDtdAttlist_1 = __importDefault(require("./XmlDtdAttlist"));
var XmlDtdElement_1 = __importDefault(require("./XmlDtdElement"));
var XmlDtdEntity_1 = __importDefault(require("./XmlDtdEntity"));
var XmlDtdNotation_1 = __importDefault(require("./XmlDtdNotation"));
var XmlDtdParamEntityRef_1 = __importDefault(require("./XmlDtdParamEntityRef"));
var XmlProcInst_1 = __importDefault(require("./XmlProcInst"));
/**
 * Represents an XML document type definition (DTD).
 *
 * A document type definition  is structured as follows, where `{name}` is
 * the name of the DTD, `{sysId}` is the system identifier of the DTD,
 * `{pubId}` is the public identifier of the DTD, and `{intSubset}` is the
 * internal subset of the DTD:
 *
 * ```xml
 * <!DOCTYPE {name} SYSTEM "{sysId}" PUBLIC "{pubId}" [
 *     {intSubset}
 * ]>
 * ```
 *
 * DTDs can have an unlimited number of comments, attribute-list declarations,
 * element declarations, entity declarations, notation declarations, parameter
 * entity references, and processing instructions.
 */
var XmlDtd = /** @class */ (function () {
    function XmlDtd(parent, validation, options) {
        this._pubId = undefined;
        this._sysId = undefined;
        this._validation = validation;
        this._children = [];
        this._parent = parent;
        this.name = options.name;
        if (!validate_1.isUndefined(options.sysId)) {
            this.sysId = options.sysId;
        }
        if (!validate_1.isUndefined(options.pubId)) {
            this.pubId = options.pubId;
        }
    }
    Object.defineProperty(XmlDtd.prototype, "name", {
        /**
         * Gets the name of the DTD.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of the DTD.
         */
        set: function (name) {
            if (this._validation && !validate_1.validateName(name)) {
                throw new Error(error_1.getContext(this.up()) + ": DTD name \"" + name + "\""
                    + " should not contain characters not allowed in"
                    + " XML names");
            }
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDtd.prototype, "pubId", {
        /**
         * Gets the public identifier of the DTD.
         */
        get: function () {
            return this._pubId;
        },
        /**
         * Sets the public identifier of the DTD.
         */
        set: function (pubId) {
            if (!validate_1.isUndefined(pubId)) {
                if (this._validation && !validatePubId(pubId)) {
                    throw new Error(error_1.getContext(this.up()) + ": DTD public"
                        + (" identifier \"" + pubId + "\" should not contain")
                        + " characters not allowed in public"
                        + " identifiers");
                }
                if (this._validation && validate_1.isUndefined(this._sysId)) {
                    throw new Error(error_1.getContext(this.up()) + ": DTD public"
                        + (" identifier \"" + pubId + "\" should not be defined")
                        + " if system identifier is undefined");
                }
            }
            this._pubId = pubId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDtd.prototype, "sysId", {
        /**
         * Gets the system identifier of the DTD.
         */
        get: function () {
            return this._sysId;
        },
        /**
         * Sets the system identifier of the DTD.
         */
        set: function (sysId) {
            if (!validate_1.isUndefined(sysId)) {
                if (this._validation && !validate_1.validateChar(sysId)) {
                    throw new Error(error_1.getContext(this.up()) + ": DTD system"
                        + (" identifier \"" + sysId + "\" should not contain")
                        + " characters not allowed in XML");
                }
                else if (this._validation
                    && sysId.indexOf("'") !== -1
                    && sysId.indexOf("\"") !== -1) {
                    throw new Error(error_1.getContext(this.up()) + ": DTD system"
                        + (" identifier \"" + sysId + "\" should not contain")
                        + " both single quotes and double quotes");
                }
            }
            this._sysId = sysId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an attribute-list declaration to this document type declaration
     * and returns the new attribute-list declaration.
     */
    XmlDtd.prototype.attlist = function (options) {
        var attlist = new XmlDtdAttlist_1.default(this, this._validation, options);
        this._children.push(attlist);
        return attlist;
    };
    /**
     * Adds a comment to this document type declaration and returns the
     * new comment.
     */
    XmlDtd.prototype.comment = function (options) {
        var comment = new XmlComment_1.default(this, this._validation, options);
        this._children.push(comment);
        return comment;
    };
    /**
     * Adds an element declaration to this document type declaration
     * and returns the new element declaration.
     */
    XmlDtd.prototype.element = function (options) {
        var element = new XmlDtdElement_1.default(this, this._validation, options);
        this._children.push(element);
        return element;
    };
    /**
     * Adds an entity declaration to this document type declaration
     * and returns the new entity declaration.
     */
    XmlDtd.prototype.entity = function (options) {
        var entity = new XmlDtdEntity_1.default(this, this._validation, options);
        this._children.push(entity);
        return entity;
    };
    /**
     * Adds a notation declaration to this document type declaration
     * and returns the new notation declaration.
     */
    XmlDtd.prototype.notation = function (options) {
        var notation = new XmlDtdNotation_1.default(this, this._validation, options);
        this._children.push(notation);
        return notation;
    };
    /**
     * Adds a parameter entity reference to this document type declaration
     * and returns the new parameter entity reference.
     */
    XmlDtd.prototype.paramEntityRef = function (options) {
        var paramEntity = new XmlDtdParamEntityRef_1.default(this, this._validation, options);
        this._children.push(paramEntity);
        return paramEntity;
    };
    /**
     * Adds a processing instruction to this document type declaration
     * and returns the new processing instruction.
     */
    XmlDtd.prototype.procInst = function (options) {
        var procInst = new XmlProcInst_1.default(this, this._validation, options);
        this._children.push(procInst);
        return procInst;
    };
    /**
     * Returns an XML string representation of this document type declaration.
     */
    XmlDtd.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var str = "<!DOCTYPE " + this._name;
        if (validate_1.isUndefined(this._pubId)) {
            if (!validate_1.isUndefined(this._sysId)) {
                str += " ";
                str = this.appendId("SYSTEM", this._sysId, str, optionsObj);
            }
        }
        else {
            if (validate_1.isUndefined(this._sysId)) {
                throw new Error(error_1.getContext(this.up()) + ": DTD system"
                    + " identifier is not undefined");
            }
            str += " ";
            str = this.appendId("PUBLIC", this._pubId, str, optionsObj);
            str = this.appendId("", this._sysId, str, optionsObj);
        }
        if (this._children.length !== 0) {
            str += " [";
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var node = _a[_i];
                if (optionsObj.pretty) {
                    str += optionsObj.newline + optionsObj.indent;
                }
                str += node.toString();
            }
            if (optionsObj.pretty) {
                str += optionsObj.newline;
            }
            str += "]>";
        }
        else {
            str += ">";
        }
        return str;
    };
    /**
     * Returns the parent of this attribute.
     */
    XmlDtd.prototype.up = function () {
        return this._parent;
    };
    /**
     * Appends the XML string representation of a public or system identifier
     * to an existing string.
     */
    XmlDtd.prototype.appendId = function (type, value, str, options) {
        str += type + " ";
        if (options.doubleQuotes) {
            if (this._validation && value.indexOf("\"") !== -1) {
                throw new Error(error_1.getContext(this.up()) + ": doubleQuotes option"
                    + " inconsistent with DTD system identifier or"
                    + " public identifier");
            }
            str += "\"" + value + "\"";
        }
        else {
            if (this._validation && value.indexOf("'") !== -1) {
                throw new Error(error_1.getContext(this) + ": doubleQuotes option"
                    + " inconsistent with DTD system identifier or"
                    + " public identifier");
            }
            str += "'" + value + "'";
        }
        return str;
    };
    return XmlDtd;
}());
exports.default = XmlDtd;
/**
 * Returns true if the specified public identifier only contains characters
 * permitted by the XML specification.
 *
 * @private
 */
function validatePubId(str) {
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        if (char === 0xA
            || char === 0xD
            || char === 0x20
            || char === 0x21
            || (char >= 0x23 && char <= 0x25)
            || (char >= 0x27 && char <= 0x2F)
            || (char >= 0x30 && char <= 0x39)
            || char === 0x3A
            || char === 0x3B
            || char === 0x3D
            || char === 0x3F
            || (char >= 0x40 && char <= 0x5A)
            || char === 0x5F
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
exports.validatePubId = validatePubId;
