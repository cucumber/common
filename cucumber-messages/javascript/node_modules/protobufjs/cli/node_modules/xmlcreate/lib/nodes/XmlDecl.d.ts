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
/**
 * The options used to create a new declaration.
 */
export interface IXmlDeclOptions {
    /**
     * The encoding attribute to be included in the declaration. If defined,
     * this value must be a valid encoding. By default, no encoding attribute
     * is included.
     */
    encoding?: string;
    /**
     * The value of the standalone attribute to be included in the declaration.
     * If defined, this value must be "yes" or "no". By default, no standalone
     * attribute is included.
     */
    standalone?: string;
    /**
     * The XML version to be included in the declaration. If defined, this
     * value must be a valid XML version number. Defaults to "1.0".
     */
    version?: string;
}
/**
 * Represents a declaration.
 *
 * A declaration is structured as follows, where `{version}` is the XML
 * version, `{encoding}` is the encoding of the document, and `{standalone}`
 * is either "yes" or "no", depending on whether the document may contain
 * external markup declarations:
 *
 * ```xml
 * <?xml version="{version}" encoding="{encoding}" standalone="{standalone}"?>
 * ```
 */
export default class XmlDecl<Parent> {
    private readonly _validation;
    private _encoding;
    private readonly _parent;
    private _standalone;
    private _version;
    constructor(parent: Parent, validation: boolean, options: IXmlDeclOptions);
    /**
     * Gets the encoding associated with this declaration.
     */
    /**
    * Sets the encoding associated with this declaration.
    */
    encoding: string | undefined;
    /**
     * Gets the value of the standalone attribute associated with this
     * declaration.
     */
    /**
    * Sets the value of the standalone attribute associated with this
    * declaration.
    */
    standalone: string | undefined;
    /**
     * Gets the XML version associated with this declaration.
     */
    /**
    * Sets the XML version associated with this declaration.
    */
    version: string;
    /**
     * Returns an XML string representation of this declaration.
     */
    toString(options?: IStringOptions): string;
    /**
     * Returns the parent of this declaration.
     */
    up(): Parent;
}
