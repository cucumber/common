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
var options_1 = require("../options");
var validate_1 = require("../validate");
var XmlComment_1 = __importDefault(require("./XmlComment"));
var XmlDecl_1 = __importDefault(require("./XmlDecl"));
var XmlDtd_1 = __importDefault(require("./XmlDtd"));
var XmlElement_1 = __importDefault(require("./XmlElement"));
var XmlProcInst_1 = __importDefault(require("./XmlProcInst"));
/**
 * Represents a document.
 *
 * A sample document is structured as follows:
 *
 * ```xml
 * <?xml version="1.0" encoding="UTF-8"?>
 * <DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 *                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 * <html>
 *     <head>
 *         <title>My page title</title>
 *     </head>
 *     <body>
 *         <h1>Welcome!</h1>
 *         <p>I hope you enjoy visiting my website.</p>
 *         <img src="picture.png"/>
 *     </body>
 * </html>
 * ```
 *
 * Each component of the document, such as the declaration, document type
 * definition, and root element, are children of this node.
 *
 * Documents must have exactly one element, which is the document's root
 * element.
 *
 * Documents can have exactly one declaration and one document type definition
 * in that order, so long as they precede the element.
 *
 * Documents can have an unlimited number of comments or processing
 * instructions, so long as they follow the declaration, if one exists.
 */
var XmlDocument = /** @class */ (function () {
    function XmlDocument(options) {
        this._children = [];
        this._validation = !validate_1.isUndefined(options.validation)
            ? options.validation
            : true;
    }
    /**
     * Adds a comment to this document and returns the new comment.
     */
    XmlDocument.prototype.comment = function (options) {
        var comment = new XmlComment_1.default(this, this._validation, options);
        this._children.push(comment);
        return comment;
    };
    /**
     * Adds a declaration to this document and returns the new declaration.
     */
    XmlDocument.prototype.decl = function (options) {
        if (options === void 0) { options = {}; }
        if (this._validation && this._children.length !== 0) {
            throw new Error("in XML document: declaration must be the first"
                + " child");
        }
        var declaration = new XmlDecl_1.default(this, this._validation, options);
        this._children.push(declaration);
        return declaration;
    };
    /**
     * Adds a document type definition to this document and returns the new
     * document type definition.
     */
    XmlDocument.prototype.dtd = function (options) {
        var filteredChildren = this._children.filter(function (value) {
            return value instanceof XmlElement_1.default;
        });
        if (this._validation && filteredChildren.length !== 0) {
            throw new Error("in XML document: DTD must precede the root"
                + " element");
        }
        var dtd = new XmlDtd_1.default(this, this._validation, options);
        this._children.push(dtd);
        return dtd;
    };
    /**
     * Adds the root element to this document and returns the element.
     */
    XmlDocument.prototype.element = function (options) {
        var filteredChildren = this._children.filter(function (value) {
            return value instanceof XmlElement_1.default;
        });
        if (this._validation && filteredChildren.length !== 0) {
            throw new Error("in XML document: only one root element is"
                + " permitted");
        }
        var element = new XmlElement_1.default(this, this._validation, options);
        this._children.push(element);
        return element;
    };
    /**
     * Adds a processing instruction to this document and returns the new
     * processing instruction.
     */
    XmlDocument.prototype.procInst = function (options) {
        var procInst = new XmlProcInst_1.default(this, this._validation, options);
        this._children.push(procInst);
        return procInst;
    };
    /**
     * Returns an XML string representation of this document using the
     * specified options.
     */
    XmlDocument.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var filteredChildren = this._children.filter(function (value) {
            return value instanceof XmlElement_1.default;
        });
        if (this._validation && filteredChildren.length !== 1) {
            throw new Error("in XML document: no more than one root element"
                + " is permitted");
        }
        var optionsObj = new options_1.StringOptions(options);
        var str = "";
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node instanceof XmlDecl_1.default
                || node instanceof XmlDtd_1.default
                || node instanceof XmlElement_1.default) {
                str += node.toString(options);
            }
            else {
                str += node.toString();
            }
            if (optionsObj.pretty) {
                str += optionsObj.newline;
            }
        }
        var len = str.length - optionsObj.newline.length;
        if (str.substr(len) === optionsObj.newline) {
            str = str.substr(0, len);
        }
        return str;
    };
    return XmlDocument;
}());
exports.default = XmlDocument;
