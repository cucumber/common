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
 * The options used to create a new comment.
 */
export interface IXmlCommentOptions {
    /**
     * The content of the comment.
     */
    charData: string;
    /**
     * Whether to replace any invalid characters in the content of the comment
     * with the Unicode replacement character. By default, this is disabled.
     */
    replaceInvalidCharsInCharData?: boolean;
}
/**
 * Represents a comment.
 *
 * A comment is structured as follows, where `{content}` is the text of the
 * comment:
 *
 * ```xml
 * <!--{content}-->
 * ```
 */
export default class XmlComment<Parent> {
    private readonly _replaceInvalidCharsInCharData;
    private readonly _parent;
    private readonly _validation;
    private _charData;
    constructor(parent: Parent, validation: boolean, options: IXmlCommentOptions);
    /**
     * Gets the text of this comment.
     */
    /**
    * Sets the text of this comment.
    */
    charData: string;
    /**
     * Returns an XML string representation of this comment.
     */
    toString(): string;
    /**
     * Returns the parent of this comment.
     */
    up(): Parent;
}
