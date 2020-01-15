"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var xmlcreate_1 = require("xmlcreate");
var options_1 = require("./options");
var utils_1 = require("./utils");
/**
 * Indicates that an object of a particular type should be suppressed from the
 * XML output.
 *
 * See the `typeHandlers` property in {@link IOptions} for more details.
 */
var Absent = /** @class */ (function () {
    function Absent() {
    }
    Object.defineProperty(Absent, "instance", {
        /**
         * Returns the sole instance of Absent.
         */
        get: function () {
            return Absent._instance;
        },
        enumerable: true,
        configurable: true
    });
    Absent._instance = new Absent();
    return Absent;
}());
exports.Absent = Absent;
/**
 * Gets the type handler associated with a value.
 *
 * @private
 */
function getHandler(value, options) {
    var type = Object.prototype.toString.call(value);
    var handler;
    if (options.typeHandlers.hasOwnProperty("*")) {
        handler = options.typeHandlers["*"];
    }
    if (options.typeHandlers.hasOwnProperty(type)) {
        handler = options.typeHandlers[type];
    }
    return handler;
}
/**
 * Parses a string into XML and adds it to the parent element or attribute.
 *
 * @private
 */
function parseString(str, parentElement, options) {
    var requiresCdata = function (s) {
        return (options.cdataInvalidChars && (s.indexOf("<") !== -1
            || s.indexOf("&") !== -1))
            || options.cdataKeys.indexOf(parentElement.name) !== -1
            || options.cdataKeys.indexOf("*") !== -1;
    };
    if (parentElement instanceof xmlcreate_1.XmlElement) {
        if (requiresCdata(str)) {
            var cdataStrs = str.split("]]>");
            for (var i = 0; i < cdataStrs.length; i++) {
                if (requiresCdata(cdataStrs[i])) {
                    parentElement.cdata({
                        charData: cdataStrs[i],
                        replaceInvalidCharsInCharData: options.replaceInvalidChars
                    });
                }
                else {
                    parentElement.charData({
                        charData: cdataStrs[i],
                        replaceInvalidCharsInCharData: options.replaceInvalidChars
                    });
                }
                if (i < cdataStrs.length - 1) {
                    parentElement.charData({
                        charData: "]]>",
                        replaceInvalidCharsInCharData: options.replaceInvalidChars
                    });
                }
            }
        }
        else {
            parentElement.charData({
                charData: str,
                replaceInvalidCharsInCharData: options.replaceInvalidChars
            });
        }
    }
    else {
        parentElement.text({
            charData: str,
            replaceInvalidCharsInCharData: options.replaceInvalidChars
        });
    }
}
/**
 * Parses an attribute into XML and adds it to the parent element.
 *
 * @private
 */
function parseAttribute(name, value, parentElement, options) {
    var attribute = parentElement.attribute({
        name: name,
        replaceInvalidCharsInName: options.replaceInvalidChars
    });
    parseString(utils_1.stringify(value), attribute, options);
}
/**
 * Parses an object or Map entry into XML and adds it to the parent element.
 *
 * @private
 */
function parseObjectOrMapEntry(key, value, parentElement, options) {
    // Alias key
    if (key === options.aliasString) {
        parentElement.name = utils_1.stringify(value);
        return;
    }
    // Attributes key
    if (key.indexOf(options.attributeString) === 0) {
        for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
            var subkey = _a[_i];
            parseAttribute(subkey, utils_1.stringify(value[subkey]), parentElement, options);
        }
        return;
    }
    // Value key
    if (key.indexOf(options.valueString) === 0) {
        parseValue(key, utils_1.stringify(value), parentElement, options);
        return;
    }
    // Standard handling (create new element for entry)
    var element = parentElement;
    if (!utils_1.isArray(value) && !utils_1.isSet(value)) {
        // If handler for value returns absent, then do not add element
        var handler = getHandler(value, options);
        if (!utils_1.isUndefined(handler)) {
            if (handler(value) === Absent.instance) {
                return;
            }
        }
        element = parentElement.element({
            name: key,
            replaceInvalidCharsInName: options.replaceInvalidChars,
            useSelfClosingTagIfEmpty: options.useSelfClosingTagIfEmpty
        });
    }
    parseValue(key, value, element, options);
}
/**
 * Parses an Object or Map into XML and adds it to the parent element.
 *
 * @private
 */
function parseObjectOrMap(objectOrMap, parentElement, options) {
    if (utils_1.isMap(objectOrMap)) {
        objectOrMap.forEach(function (value, key) {
            parseObjectOrMapEntry(utils_1.stringify(key), value, parentElement, options);
        });
    }
    else {
        for (var _i = 0, _a = Object.keys(objectOrMap); _i < _a.length; _i++) {
            var key = _a[_i];
            parseObjectOrMapEntry(key, objectOrMap[key], parentElement, options);
        }
    }
}
/**
 * Parses an array or Set into XML and adds it to the parent element.
 *
 * @private
 */
function parseArrayOrSet(key, arrayOrSet, parentElement, options) {
    var arrayNameFunc;
    if (options.wrapHandlers.hasOwnProperty("*")) {
        arrayNameFunc = options.wrapHandlers["*"];
    }
    if (options.wrapHandlers.hasOwnProperty(key)) {
        arrayNameFunc = options.wrapHandlers[key];
    }
    var arrayKey = key;
    var arrayElement = parentElement;
    if (!utils_1.isUndefined(arrayNameFunc)) {
        var arrayNameFuncKey = arrayNameFunc(arrayKey, arrayOrSet);
        if (!utils_1.isNull(arrayNameFuncKey)) {
            arrayKey = arrayNameFuncKey;
            arrayElement = parentElement.element({
                name: key,
                replaceInvalidCharsInName: options.replaceInvalidChars,
                useSelfClosingTagIfEmpty: options.useSelfClosingTagIfEmpty
            });
        }
    }
    arrayOrSet.forEach(function (item) {
        var element = arrayElement;
        if (!utils_1.isArray(item) && !utils_1.isSet(item)) {
            // If handler for value returns absent, then do not add element
            var handler = getHandler(item, options);
            if (!utils_1.isUndefined(handler)) {
                if (handler(item) === Absent.instance) {
                    return;
                }
            }
            element = arrayElement.element({
                name: arrayKey,
                replaceInvalidCharsInName: options.replaceInvalidChars,
                useSelfClosingTagIfEmpty: options.useSelfClosingTagIfEmpty
            });
        }
        parseValue(arrayKey, item, element, options);
    });
}
/**
 * Parses an arbitrary JavaScript value into XML and adds it to the parent
 * element.
 *
 * @private
 */
function parseValue(key, value, parentElement, options) {
    // If a handler for a particular type is user-defined, use that handler
    // instead of the defaults
    var handler = getHandler(value, options);
    if (!utils_1.isUndefined(handler)) {
        value = handler(value);
    }
    if (utils_1.isObject(value) || utils_1.isMap(value)) {
        parseObjectOrMap(value, parentElement, options);
        return;
    }
    if (utils_1.isArray(value) || utils_1.isSet(value)) {
        parseArrayOrSet(key, value, parentElement, options);
        return;
    }
    parseString(utils_1.stringify(value), parentElement, options);
}
/**
 * Converts the specified object to XML and adds the XML representation to the
 * specified XmlDocument object using the specified options.
 *
 * This function does not add a root element. In addition, it does not add an
 * XML declaration or DTD, and the associated options in {@link IOptions} are
 * ignored. If desired, these must be added manually.
 */
function parseToExistingElement(element, object, options) {
    var opts = new options_1.Options(options);
    parseValue(element.name, object, element, opts);
}
exports.parseToExistingElement = parseToExistingElement;
/**
 * Returns a XML string representation of the specified object using the
 * specified options.
 *
 * `root` is the name of the root XML element. When the object is converted
 * to XML, it will be a child of this root element.
 */
function parse(root, object, options) {
    var opts = new options_1.Options(options);
    var document = new xmlcreate_1.XmlDocument({
        validation: opts.validation
    });
    if (opts.declaration.include) {
        document.decl(opts.declaration);
    }
    if (opts.dtd.include) {
        document.dtd({
            // Validated in options.ts
            name: opts.dtd.name,
            pubId: opts.dtd.pubId,
            sysId: opts.dtd.sysId
        });
    }
    var rootElement = document.element({
        name: root,
        replaceInvalidCharsInName: opts.replaceInvalidChars,
        useSelfClosingTagIfEmpty: opts.useSelfClosingTagIfEmpty
    });
    parseToExistingElement(rootElement, object, options);
    return document.toString(opts.format);
}
exports.parse = parse;
