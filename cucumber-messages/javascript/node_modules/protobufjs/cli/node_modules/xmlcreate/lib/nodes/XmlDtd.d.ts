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
import XmlComment, { IXmlCommentOptions } from "./XmlComment";
import XmlDtdAttlist, { IXmlDtdAttlistOptions } from "./XmlDtdAttlist";
import XmlDtdElement, { IXmlDtdElementOptions } from "./XmlDtdElement";
import XmlDtdEntity, { IXmlDtdEntityOptions } from "./XmlDtdEntity";
import XmlDtdNotation, { IXmlDtdNotationOptions } from "./XmlDtdNotation";
import { default as XmlDtdParamEntityRef, IXmlDtdParamEntityRefOptions } from "./XmlDtdParamEntityRef";
import XmlProcInst, { IXmlProcInstOptions } from "./XmlProcInst";
/**
 * The options used to create a new document type definition.
 */
export interface IXmlDtdOptions {
    /**
     * The name of the DTD.
     */
    name: string;
    /**
     * The system identifier of the DTD, excluding quotation marks. By default,
     * no system identifier is included.
     */
    sysId?: string;
    /**
     * The public identifier of the DTD, excluding quotation marks. If a public
     * identifier is provided, a system identifier must be provided as well.
     * By default, no public identifier is included.
     */
    pubId?: string;
}
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
export default class XmlDtd<Parent> {
    private readonly _children;
    private readonly _parent;
    private _name;
    private readonly _validation;
    private _pubId;
    private _sysId;
    constructor(parent: Parent, validation: boolean, options: IXmlDtdOptions);
    /**
     * Gets the name of the DTD.
     */
    /**
    * Sets the name of the DTD.
    */
    name: string;
    /**
     * Gets the public identifier of the DTD.
     */
    /**
    * Sets the public identifier of the DTD.
    */
    pubId: string | undefined;
    /**
     * Gets the system identifier of the DTD.
     */
    /**
    * Sets the system identifier of the DTD.
    */
    sysId: string | undefined;
    /**
     * Adds an attribute-list declaration to this document type declaration
     * and returns the new attribute-list declaration.
     */
    attlist(options: IXmlDtdAttlistOptions): XmlDtdAttlist<this>;
    /**
     * Adds a comment to this document type declaration and returns the
     * new comment.
     */
    comment(options: IXmlCommentOptions): XmlComment<this>;
    /**
     * Adds an element declaration to this document type declaration
     * and returns the new element declaration.
     */
    element(options: IXmlDtdElementOptions): XmlDtdElement<this>;
    /**
     * Adds an entity declaration to this document type declaration
     * and returns the new entity declaration.
     */
    entity(options: IXmlDtdEntityOptions): XmlDtdEntity<this>;
    /**
     * Adds a notation declaration to this document type declaration
     * and returns the new notation declaration.
     */
    notation(options: IXmlDtdNotationOptions): XmlDtdNotation<this>;
    /**
     * Adds a parameter entity reference to this document type declaration
     * and returns the new parameter entity reference.
     */
    paramEntityRef(options: IXmlDtdParamEntityRefOptions): XmlDtdParamEntityRef<this>;
    /**
     * Adds a processing instruction to this document type declaration
     * and returns the new processing instruction.
     */
    procInst(options: IXmlProcInstOptions): XmlProcInst<this>;
    /**
     * Returns an XML string representation of this document type declaration.
     */
    toString(options?: IStringOptions): string;
    /**
     * Returns the parent of this attribute.
     */
    up(): Parent;
    /**
     * Appends the XML string representation of a public or system identifier
     * to an existing string.
     */
    private appendId;
}
/**
 * Returns true if the specified public identifier only contains characters
 * permitted by the XML specification.
 *
 * @private
 */
export declare function validatePubId(str: string): boolean;
