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
 * The options used to create attribute text.
 */
export interface IXmlAttributeTextOptions {
    /**
     * The attribute text.
     */
    charData: string;
    /**
     * Whether to replace any invalid characters in the attribute text with the
     * Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInCharData?: boolean;
}
/**
 * Represents text in an attribute value.
 *
 * Restricted characters, such as the ampersand (`&`) and the opening angle
 * bracket (`<`), are all automatically escaped.
 */
export default class XmlAttributeText<Parent> {
    private readonly _replaceInvalidCharsInCharData;
    private readonly _parent;
    private readonly _validation;
    private _charData;
    constructor(parent: Parent, validation: boolean, options: IXmlAttributeTextOptions);
    /**
     * Gets this attribute text.
     */
    /**
    * Sets this attribute text.
    */
    charData: string;
    /**
     * Returns an XML string representation of this attribute text.
     */
    toString(): string;
    /**
     * Returns the parent of this attribute text.
     */
    up(): Parent;
}
