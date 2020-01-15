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
 * The options used to create a new processing instruction.
 */
export interface IXmlProcInstOptions {
    /**
     * The target of the processing instruction.
     */
    target: string;
    /**
     * The data of the processing instruction, or undefined if there is no
     * content.
     */
    content?: string;
}
/**
 * Represents a processing instruction.
 *
 * A processing instruction is structured as follows, where `{target}` and
 * `{content}` are the target and content of the processing instruction
 * respectively:
 *
 * ```xml
 * <?{target} {content}?>
 * ```
 */
export default class XmlProcInst<Parent> {
    private readonly _validation;
    private readonly _parent;
    private _content;
    private _target;
    constructor(parent: Parent, validation: boolean, options: IXmlProcInstOptions);
    /**
     * Gets the content of this processing instruction.
     */
    /**
    * Sets the content of this processing instruction.
    */
    content: string | undefined;
    /**
     * Gets the target of this processing instruction.
     */
    /**
    * Sets the content of this processing instruction.
    */
    target: string;
    /**
     * Returns an XML string representation of this processing instruction.
     */
    toString(): string;
    /**
     * Returns the parent of this processing instruction.
     */
    up(): Parent;
}
