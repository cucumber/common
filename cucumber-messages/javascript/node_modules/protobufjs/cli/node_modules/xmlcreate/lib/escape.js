"use strict";
/**
 * Copyright (C) 2016-2018 Michael Kourlas
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Replaces ampersands (&) with the appropriate XML character reference.
 *
 * @private
 */
function escapeAmpersands(str) {
    return str.replace(/&/g, "&amp;");
}
exports.escapeAmpersands = escapeAmpersands;
/**
 * Replaces left angle brackets (&lt;) with the appropriate XML character
 * reference.
 *
 * @private
 */
function escapeLeftAngleBrackets(str) {
    return str.replace(/</g, "&lt;");
}
exports.escapeLeftAngleBrackets = escapeLeftAngleBrackets;
/**
 * Replaces right angle brackets (&gt;) with the appropriate XML character
 * reference when part of the string "]]>".
 *
 * @private
 */
function escapeRightAngleBracketsInCdataTerminator(str) {
    return str.replace(/]]>/g, "]]&gt;");
}
exports.escapeRightAngleBracketsInCdataTerminator = escapeRightAngleBracketsInCdataTerminator;
/**
 * Replaces single quotes (") with the appropriate XML character reference.
 *
 * @private
 */
function escapeSingleQuotes(str) {
    return str.replace(/'/g, "&apos;");
}
exports.escapeSingleQuotes = escapeSingleQuotes;
/**
 * Replaces double quotes (") with the appropriate XML character reference.
 *
 * @private
 */
function escapeDoubleQuotes(str) {
    return str.replace(/"/g, "&quot;");
}
exports.escapeDoubleQuotes = escapeDoubleQuotes;
