"use strict";
/**
 * Copyright (C) 2019 Michael Kourlas
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
var XmlAttribute_1 = __importDefault(require("./nodes/XmlAttribute"));
var XmlDocument_1 = __importDefault(require("./nodes/XmlDocument"));
var XmlDtd_1 = __importDefault(require("./nodes/XmlDtd"));
var XmlElement_1 = __importDefault(require("./nodes/XmlElement"));
/**
 * Returns a context string for the specified node, for use in error messages.
 *
 * @private
 */
function getContext(obj) {
    if (obj instanceof XmlAttribute_1.default) {
        return getContext(obj.up()) + (" > attribute \"" + obj.name + "\"");
    }
    else if (obj instanceof XmlDocument_1.default) {
        return "in XML document";
    }
    else if (obj instanceof XmlDtd_1.default) {
        return getContext(obj.up()) + " > DTD";
    }
    else if (obj instanceof XmlElement_1.default) {
        return getContext(obj.up()) + (" > element \"" + obj.name + "\"");
    }
    else {
        throw new Error("Unrecognized object of type "
            + Object.prototype.toString.call(obj));
    }
}
exports.getContext = getContext;
