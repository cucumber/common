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
 * The options used to create a CDATA section.
 */
export interface IXmlCdataOptions {
    /**
     * The character data of the CDATA section.
     */
    charData: string;
    /**
     * Whether to replace any invalid characters in the character data of the
     * CDATA section with the Unicode replacement character. By default, this
     * is disabled.
     */
    replaceInvalidCharsInCharData?: boolean;
}
/**
 * Represents a CDATA section.
 *
 * A CDATA section is structured as follows, where `{data}` is the
 * character data of the section:
 *
 * ```xml
 * <![CDATA[{data}]]>
 * ```
 */
export default class XmlCdata<Parent> {
    private readonly _replaceInvalidCharsInCharData;
    private readonly _parent;
    private readonly _validation;
    private _charData;
    constructor(parent: Parent, validation: boolean, options: IXmlCdataOptions);
    /**
     * Gets the character data of this CDATA section.
     */
    /**
    * Sets the character data of this CDATA section.
    */
    charData: string;
    /**
     * Returns an XML string representation of this CDATA section.
     */
    toString(): string;
    /**
     * Returns the parent of this CDATA section.
     */
    up(): Parent;
}
