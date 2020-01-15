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
 * Represents an entity reference.
 *
 * An entity reference is structured as follows, where `{name}` is the name of
 * the entity to be referenced:
 *
 * ```xml
 * &{entity};
 * ```
 */
var XmlEntityRef = /** @class */ (function () {
    function XmlEntityRef(parent, validation, options) {
        this._validation = validation;
        this._parent = parent;
        this.name = options.name;
    }
    Object.defineProperty(XmlEntityRef.prototype, "name", {
        /**
         * Gets the name of this entity reference.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of this entity reference.
         */
        set: function (name) {
            if (this._validation && !validate_1.validateName(name)) {
                throw new Error(error_1.getContext(this.up()) + ": entity reference name"
                    + (" \"" + name + "\" should not contain characters not")
                    + " allowed in XML names");
            }
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an XML string representation of this entity reference.
     */
    XmlEntityRef.prototype.toString = function () {
        return "&" + this._name + ";";
    };
    /**
     * Returns the parent of this entity reference.
     */
    XmlEntityRef.prototype.up = function () {
        return this._parent;
    };
    return XmlEntityRef;
}());
exports.default = XmlEntityRef;
