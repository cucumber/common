"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if the specified string only contains characters permitted by
 * the XML specification.
 *
 * @private
 */
function validateChar(str) {
    for (var i = 0; i < str.length; i++) {
        var firstChar = str.charCodeAt(i);
        if (firstChar === 0x9 || firstChar === 0xA || firstChar === 0xD
            || (firstChar >= 0x20 && firstChar <= 0xD7FF)
            || (firstChar >= 0xE000 && firstChar <= 0xFFFD)) {
            continue;
        }
        if (i + 1 === str.length) {
            return false;
        }
        // UTF-16 surrogate characters
        var secondChar = str.charCodeAt(i + 1);
        if ((firstChar >= 0xD800 && firstChar <= 0xDBFF)
            && (secondChar >= 0xDC00 && secondChar <= 0xDFFF)) {
            i++;
            continue;
        }
        return false;
    }
    return true;
}
exports.validateChar = validateChar;
/**
 * Returns a version of the specified string that only contains characters
 * permitted by the XML specification, with invalid characters replaced
 * by the replacement character U+FFFD.
 *
 * @private
 */
function fixChar(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {
        var firstChar = str.charCodeAt(i);
        if (firstChar === 0x9 || firstChar === 0xA || firstChar === 0xD
            || (firstChar >= 0x20 && firstChar <= 0xD7FF)
            || (firstChar >= 0xE000 && firstChar <= 0xFFFD)) {
            newStr += str[i];
            continue;
        }
        if (i + 1 === str.length) {
            newStr += "\uFFFD";
            return newStr;
        }
        // UTF-16 surrogate characters
        var secondChar = str.charCodeAt(i + 1);
        if ((firstChar >= 0xD800 && firstChar <= 0xDBFF)
            && (secondChar >= 0xDC00 && secondChar <= 0xDFFF)) {
            newStr += str[i] + str[i + 1];
            i++;
            continue;
        }
        newStr += "\uFFFD";
    }
    return newStr;
}
exports.fixChar = fixChar;
/**
 * Returns true if the specified string only contains a single character, and
 * that this character is permitted by the XML specification.
 *
 * @private
 */
function validateSingleChar(str) {
    if (str.length === 0) {
        return false;
    }
    var firstChar = str.charCodeAt(0);
    if (str.length === 1) {
        return (firstChar === 0x9 || firstChar === 0xA || firstChar === 0xD
            || (firstChar >= 0x20 && firstChar <= 0xD7FF)
            || (firstChar >= 0xE000 && firstChar <= 0xFFFD));
    }
    if (str.length !== 2) {
        return false;
    }
    // UTF-16 surrogate characters
    var secondChar = str.charCodeAt(1);
    return ((firstChar >= 0xD800 && firstChar <= 0xDBFF)
        && (secondChar >= 0xDC00 && secondChar <= 0xDFFF));
}
exports.validateSingleChar = validateSingleChar;
/**
 * Returns true if the specified string only contains characters permitted by
 * the XML specification for names.
 *
 * @private
 */
function validateName(str) {
    if (str.length === 0) {
        return false;
    }
    var initialFirstChar = str.charCodeAt(0);
    var initialFirstCharMatch = (initialFirstChar === 0x3A
        || initialFirstChar === 0x5F
        || (initialFirstChar >= 0x41 && initialFirstChar <= 0x5A)
        || (initialFirstChar >= 0x61 && initialFirstChar <= 0x7A)
        || (initialFirstChar >= 0xC0 && initialFirstChar <= 0xD6)
        || (initialFirstChar >= 0xD8 && initialFirstChar <= 0xF6)
        || (initialFirstChar >= 0XF8 && initialFirstChar <= 0X2FF)
        || (initialFirstChar >= 0x370 && initialFirstChar <= 0x37D)
        || (initialFirstChar >= 0x37F && initialFirstChar <= 0X1FFF)
        || (initialFirstChar >= 0x200C && initialFirstChar <= 0x200D)
        || (initialFirstChar >= 0x2070 && initialFirstChar <= 0x218F)
        || (initialFirstChar >= 0x2C00 && initialFirstChar <= 0x2FEF)
        || (initialFirstChar >= 0x3001 && initialFirstChar <= 0xD7FF)
        || (initialFirstChar >= 0xF900 && initialFirstChar <= 0xFDCF)
        || (initialFirstChar >= 0xFDF0 && initialFirstChar <= 0xFFFD));
    if (str.length === 1) {
        return initialFirstCharMatch;
    }
    // UTF-16 surrogate characters
    var initialSecondChar = str.charCodeAt(1);
    var initialSecondCharMatch = ((initialFirstChar >= 0xD800 && initialFirstChar <= 0xDB7F)
        && (initialSecondChar >= 0xDC00 && initialSecondChar <= 0xDFFF));
    if (!initialFirstCharMatch && !initialSecondCharMatch) {
        return false;
    }
    var start = initialSecondCharMatch ? 2 : 1;
    for (var i = start; i < str.length; i++) {
        var firstChar = str.charCodeAt(i);
        if (firstChar === 0x3A
            || firstChar === 0x5F
            || firstChar === 0x2D
            || firstChar === 0x2E
            || firstChar === 0xB7
            || (firstChar >= 0x30 && firstChar <= 0x39)
            || (firstChar >= 0x41 && firstChar <= 0x5A)
            || (firstChar >= 0x61 && firstChar <= 0x7A)
            || (firstChar >= 0xC0 && firstChar <= 0xD6)
            || (firstChar >= 0xD8 && firstChar <= 0xF6)
            || (firstChar >= 0XF8 && firstChar <= 0X2FF)
            || (firstChar >= 0x300 && firstChar <= 0x36F)
            || (firstChar >= 0x370 && firstChar <= 0x37D)
            || (firstChar >= 0x37F && firstChar <= 0X1FFF)
            || (firstChar >= 0x200C && firstChar <= 0x200D)
            || (firstChar >= 0x203F && firstChar <= 0x2040)
            || (firstChar >= 0x2070 && firstChar <= 0x218F)
            || (firstChar >= 0x2C00 && firstChar <= 0x2FEF)
            || (firstChar >= 0x3001 && firstChar <= 0xD7FF)
            || (firstChar >= 0xF900 && firstChar <= 0xFDCF)
            || (firstChar >= 0xFDF0 && firstChar <= 0xFFFD)) {
            continue;
        }
        if (i + 1 === str.length) {
            return false;
        }
        // UTF-16 surrogate characters
        var secondChar = str.charCodeAt(i + 1);
        if ((firstChar >= 0xD800 && firstChar <= 0xDB7F)
            && (secondChar >= 0xDC00 && secondChar <= 0xDFFF)) {
            i++;
            continue;
        }
        return false;
    }
    return true;
}
exports.validateName = validateName;
/**
 * Returns a version of the specified string that only contains characters
 * permitted by the XML specification for names, with invalid characters
 * replaced by the replacement character U+FFFD.
 *
 * @private
 */
function fixName(str) {
    var newStr = "";
    if (str.length === 0) {
        return newStr;
    }
    var initialFirstChar = str.charCodeAt(0);
    var initialFirstCharMatch = (initialFirstChar === 0x3A
        || initialFirstChar === 0x5F
        || (initialFirstChar >= 0x41 && initialFirstChar <= 0x5A)
        || (initialFirstChar >= 0x61 && initialFirstChar <= 0x7A)
        || (initialFirstChar >= 0xC0 && initialFirstChar <= 0xD6)
        || (initialFirstChar >= 0xD8 && initialFirstChar <= 0xF6)
        || (initialFirstChar >= 0XF8 && initialFirstChar <= 0X2FF)
        || (initialFirstChar >= 0x370 && initialFirstChar <= 0x37D)
        || (initialFirstChar >= 0x37F && initialFirstChar <= 0X1FFF)
        || (initialFirstChar >= 0x200C && initialFirstChar <= 0x200D)
        || (initialFirstChar >= 0x2070 && initialFirstChar <= 0x218F)
        || (initialFirstChar >= 0x2C00 && initialFirstChar <= 0x2FEF)
        || (initialFirstChar >= 0x3001 && initialFirstChar <= 0xD7FF)
        || (initialFirstChar >= 0xF900 && initialFirstChar <= 0xFDCF)
        || (initialFirstChar >= 0xFDF0 && initialFirstChar <= 0xFFFD));
    if (str.length === 1) {
        if (initialFirstCharMatch) {
            newStr = str[0];
        }
        else {
            newStr = "\uFFFD";
        }
        return newStr;
    }
    // UTF-16 surrogate characters
    var initialSecondChar = str.charCodeAt(1);
    var initialSecondCharMatch = ((initialFirstChar >= 0xD800 && initialFirstChar <= 0xDB7F)
        && (initialSecondChar >= 0xDC00 && initialSecondChar <= 0xDFFF));
    if (initialSecondCharMatch) {
        newStr = str[0] + str[1];
    }
    else if (initialFirstCharMatch) {
        newStr = str[0];
    }
    else {
        newStr = "\uFFFD";
    }
    var start = initialSecondCharMatch ? 2 : 1;
    for (var i = start; i < str.length; i++) {
        var firstChar = str.charCodeAt(i);
        if (firstChar === 0x3A
            || firstChar === 0x5F
            || firstChar === 0x2D
            || firstChar === 0x2E
            || firstChar === 0xB7
            || (firstChar >= 0x30 && firstChar <= 0x39)
            || (firstChar >= 0x41 && firstChar <= 0x5A)
            || (firstChar >= 0x61 && firstChar <= 0x7A)
            || (firstChar >= 0xC0 && firstChar <= 0xD6)
            || (firstChar >= 0xD8 && firstChar <= 0xF6)
            || (firstChar >= 0XF8 && firstChar <= 0X2FF)
            || (firstChar >= 0x300 && firstChar <= 0x36F)
            || (firstChar >= 0x370 && firstChar <= 0x37D)
            || (firstChar >= 0x37F && firstChar <= 0X1FFF)
            || (firstChar >= 0x200C && firstChar <= 0x200D)
            || (firstChar >= 0x203F && firstChar <= 0x2040)
            || (firstChar >= 0x2070 && firstChar <= 0x218F)
            || (firstChar >= 0x2C00 && firstChar <= 0x2FEF)
            || (firstChar >= 0x3001 && firstChar <= 0xD7FF)
            || (firstChar >= 0xF900 && firstChar <= 0xFDCF)
            || (firstChar >= 0xFDF0 && firstChar <= 0xFFFD)) {
            newStr += str[i];
            continue;
        }
        if (i + 1 === str.length) {
            newStr += "\uFFFD";
            return newStr;
        }
        // UTF-16 surrogate characters
        var secondChar = str.charCodeAt(i + 1);
        if ((firstChar >= 0xD800 && firstChar <= 0xDB7F)
            && (secondChar >= 0xDC00 && secondChar <= 0xDFFF)) {
            newStr += str[i] + str[i + 1];
            i++;
            continue;
        }
        newStr += "\uFFFD";
    }
    return newStr;
}
exports.fixName = fixName;
/**
 * Returns true if the specified value is undefined.
 *
 * @private
 */
function isUndefined(val) {
    return Object.prototype.toString.call(val) === "[object Undefined]";
}
exports.isUndefined = isUndefined;
