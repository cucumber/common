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
 * The options used to create a new character reference.
 */
export interface IXmlCharRefOptions {
    /**
     * The character to represent using the reference.
     */
    char: string;
    /**
     * Whether to use the hexadecimal or decimal representation for the
     * reference. Defaults to false.
     */
    hex?: boolean;
}
/**
 * Represents a character reference.
 *
 * A character reference is structured as follows, where `{dec}` is the
 * decimal representation code point corresponding to a particular Unicode
 * character:
 *
 * ```xml
 * &#{dec};
 * ```
 *
 * The corresponding hexadecimal version is structured as follows, where
 * `{hex}` is the hexadecimal representation code point corresponding to a
 * particular Unicode character:
 *
 * ```xml
 * &#x{hex};
 * ```
 *
 * Unicode characters outside of the Basic Multilingual Plane are represented
 * using a surrogate pair consisting of two character references.
 *
 * The `{dec}` and `{hex}` values are defined by the `char` and `hex`
 * properties of this node; the former is the character to be represented while
 * the latter indicates whether the decimal or hexadecimal representation
 * should be used.
 */
export default class XmlCharRef<Parent> {
    private readonly _validation;
    private readonly _parent;
    private _char;
    private _hex;
    constructor(parent: Parent, validation: boolean, options: IXmlCharRefOptions);
    /**
     * Gets the character of this character reference.
     */
    /**
    * Sets the character of this character reference.
    */
    char: string;
    /**
     * Gets whether the decimal or hexadecimal representation should be used
     * for this character reference.
     */
    /**
    * Sets whether the decimal or hexadecimal representation should be used
    * for this character reference.
    */
    hex: boolean;
    /**
     * Returns an XML string representation of this character reference.
     */
    toString(): string;
    /**
     * Returns the parent of this character reference.
     */
    up(): Parent;
}
