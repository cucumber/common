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
import XmlDecl, { IXmlDeclOptions } from "./XmlDecl";
import XmlDtd, { IXmlDtdOptions } from "./XmlDtd";
import XmlElement, { IXmlElementOptions } from "./XmlElement";
import XmlProcInst, { IXmlProcInstOptions } from "./XmlProcInst";
/**
 * The options used to create a new document.
 */
export interface IXmlDocumentOptions {
    /**
     * Whether to throw an exception if basic XML validation fails while
     * building the document.
     */
    validation?: boolean;
}
/**
 * Represents a document.
 *
 * A sample document is structured as follows:
 *
 * ```xml
 * <?xml version="1.0" encoding="UTF-8"?>
 * <DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 *                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 * <html>
 *     <head>
 *         <title>My page title</title>
 *     </head>
 *     <body>
 *         <h1>Welcome!</h1>
 *         <p>I hope you enjoy visiting my website.</p>
 *         <img src="picture.png"/>
 *     </body>
 * </html>
 * ```
 *
 * Each component of the document, such as the declaration, document type
 * definition, and root element, are children of this node.
 *
 * Documents must have exactly one element, which is the document's root
 * element.
 *
 * Documents can have exactly one declaration and one document type definition
 * in that order, so long as they precede the element.
 *
 * Documents can have an unlimited number of comments or processing
 * instructions, so long as they follow the declaration, if one exists.
 */
export default class XmlDocument {
    private readonly _children;
    private readonly _validation;
    constructor(options: IXmlDocumentOptions);
    /**
     * Adds a comment to this document and returns the new comment.
     */
    comment(options: IXmlCommentOptions): XmlComment<this>;
    /**
     * Adds a declaration to this document and returns the new declaration.
     */
    decl(options?: IXmlDeclOptions): XmlDecl<this>;
    /**
     * Adds a document type definition to this document and returns the new
     * document type definition.
     */
    dtd(options: IXmlDtdOptions): XmlDtd<this>;
    /**
     * Adds the root element to this document and returns the element.
     */
    element(options: IXmlElementOptions): XmlElement<this>;
    /**
     * Adds a processing instruction to this document and returns the new
     * processing instruction.
     */
    procInst(options: IXmlProcInstOptions): XmlProcInst<this>;
    /**
     * Returns an XML string representation of this document using the
     * specified options.
     */
    toString(options?: IStringOptions): string;
}
