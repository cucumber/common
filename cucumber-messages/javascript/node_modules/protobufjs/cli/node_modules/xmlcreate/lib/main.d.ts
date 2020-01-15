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
import XmlDocument, { IXmlDocumentOptions } from "./nodes/XmlDocument";
export { default as XmlAttribute } from "./nodes/XmlAttribute";
export { default as XmlAttributeText } from "./nodes/XmlAttributeText";
export { default as XmlCdata } from "./nodes/XmlCdata";
export { default as XmlCharData } from "./nodes/XmlCharData";
export { default as XmlCharRef } from "./nodes/XmlCharRef";
export { default as XmlComment } from "./nodes/XmlComment";
export { default as XmlDecl } from "./nodes/XmlDecl";
export { default as XmlDocument } from "./nodes/XmlDocument";
export { default as XmlDtd } from "./nodes/XmlDtd";
export { default as XmlDtdAttlist } from "./nodes/XmlDtdAttlist";
export { default as XmlDtdElement } from "./nodes/XmlDtdElement";
export { default as XmlDtdEntity } from "./nodes/XmlDtdEntity";
export { default as XmlDtdNotation } from "./nodes/XmlDtdNotation";
export { default as XmlDtdParamEntityRef } from "./nodes/XmlDtdParamEntityRef";
export { default as XmlElement } from "./nodes/XmlElement";
export { default as XmlEntityRef } from "./nodes/XmlEntityRef";
export { default as XmlProcInst } from "./nodes/XmlProcInst";
/**
 * Returns a new XML document with the specified options.
 */
export declare function document(options?: IXmlDocumentOptions): XmlDocument;
