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
import { IStringOptions } from "../options";
import XmlAttributeText, { IXmlAttributeTextOptions } from "./XmlAttributeText";
import XmlCharRef, { IXmlCharRefOptions } from "./XmlCharRef";
import XmlEntityRef, { IXmlEntityRefOptions } from "./XmlEntityRef";
/**
 * The options used to create a new attribute.
 */
export interface IXmlAttributeOptions {
    /**
     * The name of the attribute.
     */
    name: string;
    /**
     * Whether to replace any invalid characters in the name of the attribute
     * with the Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInName?: boolean;
}
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
export default class XmlAttribute<Parent> {
    private readonly _children;
    private readonly _replaceInvalidCharsInName;
    private readonly _parent;
    private readonly _validation;
    private _name;
    constructor(parent: Parent, validation: boolean, options: IXmlAttributeOptions);
    /**
     * Gets the name of this attribute.
     */
    /**
    * Sets the name of this attribute.
    */
    name: string;
    /**
     * Adds a character reference to this attribute and returns the new
     * character reference.
     */
    charRef(options: IXmlCharRefOptions): XmlCharRef<this>;
    /**
     * Adds an entity reference to this attribute and returns the new entity
     * reference.
     */
    entityRef(options: IXmlEntityRefOptions): XmlEntityRef<this>;
    /**
     * Adds attribute text to this attribute and returns the new text.
     */
    text(options: IXmlAttributeTextOptions): XmlAttributeText<this>;
    /**
     * Returns an XML string representation of this attribute.
     */
    toString(options?: IStringOptions): string;
    /**
     * Returns the parent of this attribute.
     */
    up(): Parent;
}
