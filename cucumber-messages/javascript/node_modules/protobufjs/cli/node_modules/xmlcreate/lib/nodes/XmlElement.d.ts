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
import { default as XmlAttribute, IXmlAttributeOptions as IXmlAttributeOptions } from "./XmlAttribute";
import XmlCdata, { IXmlCdataOptions } from "./XmlCdata";
import XmlCharData, { IXmlCharDataOptions } from "./XmlCharData";
import XmlCharRef, { IXmlCharRefOptions } from "./XmlCharRef";
import XmlComment, { IXmlCommentOptions } from "./XmlComment";
import XmlEntityRef, { IXmlEntityRefOptions } from "./XmlEntityRef";
import XmlProcInst, { IXmlProcInstOptions } from "./XmlProcInst";
/**
 * The options used to create a new element.
 */
export interface IXmlElementOptions {
    /**
     * The name of the element.
     */
    name: string;
    /**
     * Whether to replace any invalid characters in the name of the element
     * with the Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInName?: boolean;
    /**
     * Whether to use a self-closing tag if this element is empty.
     *
     * For example, use:
     * ```xml
     * <element/>
     * ```
     * instead of:
     * ```xml
     * <element></element>
     * ```
     *
     * By default, this is enabled.
     */
    useSelfClosingTagIfEmpty?: boolean;
}
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
export default class XmlElement<Parent> {
    private readonly _validation;
    private readonly _children;
    private readonly _attributeNames;
    private readonly _parent;
    private readonly _replaceInvalidCharsInName;
    private readonly _useSelfClosingTagIfEmpty;
    private _name;
    constructor(parent: Parent, validation: boolean, options: IXmlElementOptions);
    /**
     * Gets the name of this element.
     */
    /**
    * Sets the name of this element.
    */
    name: string;
    /**
     * Adds an attribute to this element and returns the new attribute.
     */
    attribute(options: IXmlAttributeOptions): XmlAttribute<this>;
    /**
     * Adds a CDATA section to this element and returns the new CDATA section.
     */
    cdata(options: IXmlCdataOptions): XmlCdata<this>;
    /**
     * Adds character data to this element and returns the new character data.
     */
    charData(options: IXmlCharDataOptions): XmlCharData<this>;
    /**
     * Adds a character reference to this element and returns the new
     * character reference.
     */
    charRef(options: IXmlCharRefOptions): XmlCharRef<this>;
    /**
     * Adds a comment to this element and returns the new comment.
     */
    comment(options: IXmlCommentOptions): XmlComment<this>;
    /**
     * Adds an element to this element and returns the new element.
     */
    element(options: IXmlElementOptions): XmlElement<this>;
    /**
     * Adds an entity reference to this element and returns the new entity
     * reference.
     */
    entityRef(options: IXmlEntityRefOptions): XmlEntityRef<this>;
    /**
     * Adds a processing instruction to this element and returns the new
     * processing instruction.
     */
    procInst(options: IXmlProcInstOptions): XmlProcInst<this>;
    /**
     * Returns an XML string representation of this element using the specified
     * options.
     */
    toString(options?: IStringOptions): string;
    /**
     * Returns the parent of this element.
     */
    up(): Parent;
    /**
     * Returns an XML string representation of this element using the specified
     * options and initial indent.
     */
    private toStringWithIndent;
    /**
     * Returns true if the specified nodes are all character references,
     * entity references, or character data.
     */
    private allSameLineNodes;
    /**
     * Returns true if the specified nodes are all character references,
     * entity references, or character data.
     */
    private onSameLine;
}
