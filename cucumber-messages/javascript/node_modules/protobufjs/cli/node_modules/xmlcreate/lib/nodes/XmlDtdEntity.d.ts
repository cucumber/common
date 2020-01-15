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
 * The options used to create a new entity declaration.
 */
export interface IXmlDtdEntityOptions {
    /**
     * The text of the declaration.
     */
    charData: string;
}
/**
 * Represents an entity declaration in a document type definition.
 *
 * An entity declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!ENTITY {text}>
 * ```
 */
export default class XmlDtdEntity<Parent> {
    private readonly _validation;
    private readonly _parent;
    private _charData;
    constructor(parent: Parent, validation: boolean, options: IXmlDtdEntityOptions);
    /**
     * Gets the text of this entity declaration.
     */
    /**
    * Sets the text of this entity declaration.
    */
    charData: string;
    /**
     * Returns an XML string representation of this entity declaration.
     */
    toString(): string;
    /**
     * Returns the parent of this entity declaration.
     */
    up(): Parent;
}
