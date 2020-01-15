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
/**
 * The options used to create a new notation declaration.
 */
export interface IXmlDtdNotationOptions {
    /**
     * The text of the declaration.
     */
    charData: string;
}
/**
 * Represents a notation declaration in a document type definition.
 *
 * A notation declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!NOTATION {text}>
 * ```
 */
export default class XmlDtdNotation<Parent> {
    private readonly _validation;
    private readonly _parent;
    private _charData;
    constructor(parent: Parent, validation: boolean, options: IXmlDtdNotationOptions);
    /**
     * Gets the text of this notation declaration.
     */
    /**
    * Sets the text of this notation declaration.
    */
    charData: string;
    /**
     * Returns an XML string representation of this notation declaration.
     */
    toString(): string;
    /**
     * Returns the parent of this notation declaration.
     */
    up(): Parent;
}
