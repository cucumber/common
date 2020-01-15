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
var validate_1 = require("./validate");
/**
 * Implementation of the IStringOptions interface used to provide default
 * values to fields.
 *
 * @private
 */
var StringOptions = /** @class */ (function () {
    function StringOptions(options) {
        this.doubleQuotes = false;
        this.indent = "    ";
        this.newline = "\n";
        this.pretty = true;
        if (!validate_1.isUndefined(options.doubleQuotes)) {
            this.doubleQuotes = options.doubleQuotes;
        }
        if (!validate_1.isUndefined(options.indent)) {
            this.indent = options.indent;
        }
        if (!validate_1.isUndefined(options.newline)) {
            this.newline = options.newline;
        }
        if (!validate_1.isUndefined(options.pretty)) {
            this.pretty = options.pretty;
        }
    }
    return StringOptions;
}());
exports.StringOptions = StringOptions;
