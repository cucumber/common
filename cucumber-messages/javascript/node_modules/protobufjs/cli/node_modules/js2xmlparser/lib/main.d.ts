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
import { XmlElement } from "xmlcreate";
import { IOptions } from "./options";
/**
 * Indicates that an object of a particular type should be suppressed from the
 * XML output.
 *
 * See the `typeHandlers` property in {@link IOptions} for more details.
 */
export declare class Absent {
    private static _instance;
    private constructor();
    /**
     * Returns the sole instance of Absent.
     */
    static readonly instance: Absent;
}
/**
 * Converts the specified object to XML and adds the XML representation to the
 * specified XmlDocument object using the specified options.
 *
 * This function does not add a root element. In addition, it does not add an
 * XML declaration or DTD, and the associated options in {@link IOptions} are
 * ignored. If desired, these must be added manually.
 */
export declare function parseToExistingElement(element: XmlElement<any>, object: any, options?: IOptions): void;
/**
 * Returns a XML string representation of the specified object using the
 * specified options.
 *
 * `root` is the name of the root XML element. When the object is converted
 * to XML, it will be a child of this root element.
 */
export declare function parse(root: string, object: any, options?: IOptions): string;
