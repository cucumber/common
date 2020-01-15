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
 * Returns true if the specified string only contains characters permitted by
 * the XML specification.
 *
 * @private
 */
export declare function validateChar(str: string): boolean;
/**
 * Returns a version of the specified string that only contains characters
 * permitted by the XML specification, with invalid characters replaced
 * by the replacement character U+FFFD.
 *
 * @private
 */
export declare function fixChar(str: string): string;
/**
 * Returns true if the specified string only contains a single character, and
 * that this character is permitted by the XML specification.
 *
 * @private
 */
export declare function validateSingleChar(str: string): boolean;
/**
 * Returns true if the specified string only contains characters permitted by
 * the XML specification for names.
 *
 * @private
 */
export declare function validateName(str: string): boolean;
/**
 * Returns a version of the specified string that only contains characters
 * permitted by the XML specification for names, with invalid characters
 * replaced by the replacement character U+FFFD.
 *
 * @private
 */
export declare function fixName(str: string): string;
/**
 * Returns true if the specified value is undefined.
 *
 * @private
 */
export declare function isUndefined(val: any): val is undefined;
