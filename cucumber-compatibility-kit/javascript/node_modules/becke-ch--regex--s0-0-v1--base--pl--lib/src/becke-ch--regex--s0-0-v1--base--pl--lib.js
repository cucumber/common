/*
 * Copyright (c) 2017. becke.ch - All Rights Reserved.
 * Use is subject to (MIT-style) License terms.
 * You may obtain a copy of the License at http://becke.ch/tool/becke-ch--regex--s0-v1/becke-ch--regex--s0-v1--license.txt
 */

/**
 * Created by raoul-becke--s0-v1 on 08.12.16. A JavaScript Regular Expression library, extending the standard RegExp
 * class with missing functionality.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-regular-expression-objects
 */

//Fixes issue for browsers (IE, Safari - respective in general WebKit based browsers e.g. JavaFX) not supporting
// JavaScript "Symbol"
Symbol = (typeof Symbol === "undefined") ? [] : Symbol;

/**
 * This class is an extension of the standard {@linkcode RegExp} class adding missing functionality.
 * For further descriptions see the corresponding overridden methods.
 * @param {string|RegExp} [pattern]
 * @param {string} [options]
 * @constructor
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-regular-expression-objects
 */
function Regex(pattern, options) {
    var patternInstanceofRegExp = false;
    if (pattern instanceof RegExp) {
        pattern = pattern.source;
        patternInstanceofRegExp = true;
    }
    if (pattern) {
        this.regexGroupStructure = getRegexCompleteGroupingStructure(pattern);
        if (patternInstanceofRegExp) {
            this.source = pattern;
        } else {
            this.source = this.regexGroupStructure[2][0];
        }
        try {
            this.regex = new RegExp(this.regexGroupStructure[0][2], options);
        } catch (e) {
            new RegExp(pattern, options);
        }
    } else {
        this.regex = new RegExp(pattern, options);
        this.source = this.regex.source;
    }
    this.flags = this.regex.flags;
    this.global = this.regex.global;
    this.ignoreCase = this.regex.ignoreCase;
    this.multiline = this.regex.multiline;
    this.sticky = this.regex.sticky;
    this.unicode = this.regex.unicode;
    this.lastIndex = this.regex.lastIndex;
}

Regex.prototype = Object.create(RegExp.prototype, {
    flags: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    global: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    ignoreCase: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    multiline: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    source: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    sticky: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    unicode: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    }
});

Regex.prototype.constructor = Regex;

/**
 * Returns the same string format as {@linkcode RegExp#toString} for the initial pattern that was provided to the
 * {@linkcode Regex} constructor.<br>
 * The string is constructed as follows: "/"+{@linkcode Regex#source}+"/"+{@linkcode Regex#flags}
 * @return {string}
 */
Regex.prototype.toString = function () {
    return ('/' + this.source + '/' + this.flags);
}

/**
 * Simply invokes the inherited method {@linkcode RegExp#test}.
 * @param {string} [str]
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.test
 */
Regex.prototype.test = function (str) {
    return this.regex.test(str);
}

/**
 * Simply invokes the inherited method {@linkcode RegExp[Symbol.search]}.
 * @param {string} str
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@search
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype-@@search
 * @alias Regex.search
 */
Regex.prototype[Symbol.search] = function (str) {
    return this.regex[Symbol.search](str);
}

/**
 * Simply invokes the inherited method {@linkcode RegExp[Symbol.split]}.
 * @param {string} str
 * @param {number} [limit]
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@split
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype-@@split
 * @alias Regex.split
 */
Regex.prototype[Symbol.split] = function (str, limit) {
    return this.regex[Symbol.split](str);
}

/**
 * Full indexed exec method: Based on {@linkcode RegExp#exec} but instead of simply getting "index" in the return which
 * only tells the starting of the first group (0 group) we are getting "index[0..n]" which tells us the starting index
 * of each matching group.<br>
 * <code>
 * Syntax: <b>(new Regex(pattern, flags)).exec(string) = {string[0..n], index:number[0..n], input:string}</b><br>
 * Example:<br>
 * //Retrieve content and position of: opening-, closing tags and body content for: non-nested html-tags.
 * var pattern = '(&lt;([^ &gt;]+)[^&gt;]*&gt;)([^&lt;]*)(&lt;\\/\\2&gt;)';<br>
 * var str = '&lt;html&gt;&lt;code class="html plain"&gt;first&lt;/code&gt;&lt;div class="content"&gt;second&lt;/div&gt;&lt;/html&gt;';<br>
 * var regex = new Regex(pattern, 'g');<br>
 * var result = regex.exec(str);<br>
 * <br>
 * console.log(5 === result.length);<br>
 * console.log('&lt;code class="html plain"&gt;first&lt;/code&gt;'=== result[0]);<br>
 * console.log('&lt;code class="html plain"&gt;'=== result[1]);<br>
 * console.log('first'=== result[3]);<br>
 * console.log('&lt;/code&gt;'=== result[4]);<br>
 * console.log(5=== result.index.length);<br>
 * console.log(6=== result.index[0]);<br>
 * console.log(6=== result.index[1]);<br>
 * console.log(31=== result.index[3]);<br>
 * console.log(36=== result.index[4]);<br>
 * </code>
 * <br>
 * @param {string} [str]
 * @return {Object} {string[0..n], index:number[0..n], input:string}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.exec
 */
Regex.prototype.exec = function (str) {
    var result = [];
    result.index = [];
    var resultRegex = this.regex.exec(str);
    this.lastIndex = this.regex.lastIndex;

    if (!resultRegex) {
        return resultRegex;
    }
    result[0] = resultRegex[0];
    result.index[0] = resultRegex.index;
    result.input = str;

    var execInternal = function (strPosition, regexGroupStructureChildren) {
        var currentStrPos = strPosition;
        for (var i = 0; i < regexGroupStructureChildren.length; i++) {
            var index = regexGroupStructureChildren[i][0];
            var originalIndex = regexGroupStructureChildren[i][1];
            if (originalIndex) {
                result[originalIndex] = resultRegex[index];
                if (typeof result[originalIndex] === "undefined") {
                    result.index[originalIndex] = undefined;
                } else {
                    result.index[originalIndex] = currentStrPos;
                }
            }
            if (regexGroupStructureChildren[i][3]) {
                execInternal(currentStrPos, regexGroupStructureChildren[i][3]);
            }
            if (typeof resultRegex[index] !== "undefined") {
                currentStrPos += resultRegex[index].length;
            }
        }
    };
    if (this.regexGroupStructure && this.regexGroupStructure[0][3]) {
        execInternal(resultRegex.index, this.regexGroupStructure[0][3]);
    }
    return result;
};

/**
 * Full detailed match. Based on {@linkcode RegExp[Symbol.match]} with some improvements regarding the return value. Analogue to the base
 * method {@linkcode RegExp[Symbol.match]} internally the method {@linkcode Regex#exec} is called. And there are 2
 * improvements related to this: First improvement is that {@linkcode Regex#exec} returns the index for all matching
 * groups and Second improvement is that we always return a 2-dimensional array independent of whether the global 'g'
 * flag is set or not. If the 'g' flag is not set then first dimension only contains one element which is the result
 * of {@linkcode Regex#exec} and if the flag is set the size of the first dimension equals the number of matches we had
 * and each match contains the {@linkcode Regex#exec} result for the corresponding execution.
 * @param [str] {String}
 * @return {Object} Array[{string[0..n], index:number[0..n], input:string}]
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype-@@match
 * @alias Regex.match
 */
Regex.prototype[Symbol.match] = function (str) {
    this.lastIndex = 0;
    this.regex.lastIndex = 0;

    var resultExec = this.exec(str);
    if (!resultExec) {
        return null;
    }

    var resultExecArray = [];

    while (resultExec) {
        resultExecArray.push(resultExec);
        if (resultExec[0].length === 0) {
            this.regex.lastIndex++;
        }
        if (!this.global) {
            break;
        }
        resultExec = this.exec(str);
    }

    this.lastIndex = 0;
    this.regex.lastIndex = 0;
    return resultExecArray;
}

/**
 * Group based search & replace. Based on {@linkcode Regex.prototype[Symbol.replace]} but instead of only being able to provide a
 * single "replacement substring" or "replacement function" for replacement of the entire match (aka matching-group[0])
 * we can provide an array [0..n] of "replacement substring" or "replacement function" elements for replacement of
 * each matching group [0..n].
 * <br>
 * Important: If we don't want a group to be replaced we provide the corresponding "replacement substring/function"
 * array element as undefined or null!
 * <br>
 * Important: If we provide a "replacement substring/function" for a parent group-element then (obviously) no
 * replacement is performed on its child-group-elements. E.g. if we provide a "replacement substring/function"
 * for group 0 then the entire match is replaced and (obviously) no replacement of the further child-groups
 * takes place!
 * <br>
 * <br>
 * <code>
 * Syntax: <b>(new Regex(pattern))[Symbol.replace](string, [array of replacement strings])</b><br>
 * Alternative Syntax: For browsers supporting "Symbol": Chrome & Firefox: string.replace(new Regex(pattern), [array of replacement strings])<br>
 * Example:<br>
 * //Convert plain text to html: Replace special characters (multiple spaces, tabs, ...) in plain text with their html "equivalent":<br>
 * var CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN = "( {2})|(\t)|(&)|(<)|(>)|(\n)";<br>
 * var CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN_REPLACE_STRING = [undefined, "&amp;nbsp;&amp;nbsp;", "&amp;emsp;", "&amp;amp;", "&amp;lt;", "&amp;gt;", "&lt;br&gt;"];<br>
 * var regex = new Regex(CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN, 'g');<br>
 * var result = regex[Symbol.replace](myPlainText,CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN_REPLACE_STRING);<br>
 * //Alternative Syntax: For browsers supporting "Symbol": Chrome & Firefox<br>
 * var resultAlternative = myPlainText.replace(regex,CONVERT_TEXT_SPECIAL_CHARACTER_TO_HTML_ESCAPE_CHARACTER_PATTERN_REPLACE_STRING);
 * </code>
 * <br>
 * <br>
 * Special (in addition to the standard search and replace): We support in the "new substring" as well $0 as replacement
 * pattern which is basically the entire match.
 * And accordingly for the "new function" we call it as well with p0 as parameter which is the entire match.
 *
 * @param [str] {String}
 * @param [newSubstringFunctionArray] {String[]|function[]|String|function}
 * @return {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@replace
 * @see http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype-@@replace
 * @alias Regex.replace
 */
Regex.prototype[Symbol.replace] = function (str, newSubstringFunctionArray) {
    this.lastIndex = 0;
    this.regex.lastIndex = 0;
    if (!str) {
        return str;
    }
    // if (!newSubstringFunctionArray && newSubstringFunctionArray !== "") {
    //     return newSubstringFunctionArray;
    //     // newSubstringFunctionArray = '' + newSubstringFunctionArray;
    //     // console.log(newSubstringFunctionArray);
    // }

    var resultExec = this.exec(str);
    if (!resultExec) {
        return str;
    }

    if (!(newSubstringFunctionArray instanceof Array)) {
        newSubstringFunctionArray = [newSubstringFunctionArray];
    }

    var resultString = '';
    var resultStringPosition = 0;

    var computeSubstringFunction = function (newSubstringFunctionIndex) {
        var computedString = '';
        var charAt = '';
        var newSubstringFunction = newSubstringFunctionArray[newSubstringFunctionIndex];
        // if(!newSubstringFunction){
        //     newSubstringFunction += '';
        // }
        if (typeof newSubstringFunction === 'string') {
            for (var i = 0; i < newSubstringFunction.length; i++) {
                charAt = newSubstringFunction.charAt(i);
                if (charAt === '$') {
                    i++;
                    charAt = newSubstringFunction.charAt(i);
                    if (charAt === '$') {
                        computedString += '$';
                    } else if (charAt === '&') {
                        computedString += resultExec[newSubstringFunctionIndex];
                    } else if (charAt === '`') {
                        computedString += str.substring(0, resultExec.index[newSubstringFunctionIndex]);
                    } else if (charAt === "'") {
                        computedString += str.substring(resultExec.index[newSubstringFunctionIndex] + resultExec[newSubstringFunctionIndex].length);
                    } else if (charAt >= '0' && charAt <= '9') {
                        var int = charAt;
                        i++;
                        charAt = newSubstringFunction.charAt(i);
                        while (charAt >= '0' && charAt <= '9') {
                            int += charAt;
                            i++;
                            charAt = newSubstringFunction.charAt(i);
                        }
                        i--;
                        if (resultExec[int]) {
                            computedString += resultExec[int];
                        } else {
                            computedString += '$' + int;
                        }
                    } else {
                        //strange not sure whether this is correct - initially it was: computedString += charAt;
                        //but unit tests in NPM told differently!...
                        computedString += '$' + charAt;
                    }
                } else {
                    computedString += charAt;
                }
            }
        } else if (newSubstringFunction instanceof Function) {
            var args = [resultExec[newSubstringFunctionIndex]];
            for (var j = 0; j < resultExec.length; j++) {
                args.push(resultExec[j]);
            }
            for (var k = 0; j < resultExec.index.length; k++) {
                args.push(resultExec.index[k]);
            }
            args.push(str);
            computedString += newSubstringFunction.apply(this, args);
        }
        return computedString;
    }

    var traverseRegexGroupStructure = function (regexGroupStructureChildren) {
        for (var i = 0; i < regexGroupStructureChildren.length; i++) {
            var originalIndex = regexGroupStructureChildren[i][1];
            if (originalIndex) {
                if (newSubstringFunctionArray[originalIndex] || newSubstringFunctionArray[originalIndex] === "") {
                    if (resultExec[originalIndex] || resultExec[originalIndex] === "") {
                        resultString += str.substring(resultStringPosition, resultExec.index[originalIndex]) + computeSubstringFunction(originalIndex);
                        resultStringPosition = resultExec.index[originalIndex] + resultExec[originalIndex].length;
                    }
                } else if (regexGroupStructureChildren[i][3]) {
                    traverseRegexGroupStructure(regexGroupStructureChildren[i][3]);
                }
            } else {
                traverseRegexGroupStructure(regexGroupStructureChildren[i][3]);
            }
        }
    };
    while (resultExec) {
        if (newSubstringFunctionArray[0] || newSubstringFunctionArray[0] === "") {
            resultString += str.substring(resultStringPosition, resultExec.index[0]) + computeSubstringFunction(0);
            resultStringPosition = resultExec.index[0] + resultExec[0].length;
        } else if (this.regexGroupStructure && this.regexGroupStructure[0][3]) {
            traverseRegexGroupStructure(this.regexGroupStructure[0][3]);
        }
        // 20170415 - avoid infinite loop according to specification!
        if (resultExec[0].length === 0) {
            this.regex.lastIndex++;
        }
        if (!this.global) {
            break;
        }
        resultExec = this.exec(str);
    }

    this.lastIndex = 0;
    this.regex.lastIndex = 0;
    return resultString + str.substring(resultStringPosition, str.length);
}

/**
 * Takes the regular expression "regex" as input and puts all the non-grouped regex characters before a group
 * opening "(") into additional groups: "(xyz)" so in the end all relevant parts of the regular expression
 * (relevant in the sense that they are required to calculate the starting position of each group) are grouped.
 * AND finally returns the group structure of this regex:
 * [[index, originalIndex, 'regexForThisGroup', [[child01Index, child01OriginalIndex, 'regexForThisChild01Group', [...]], [child02Index, child02OriginalIndex, ..., [...]], ...]]].
 * The array elements are:
 * - index: This is the group index in the regular expression
 * - originalIndex: This is the groups index in the initial/original regular expression. "originalIndex" is "undefined"
 * if this group was the result of the group completion.
 * - regexForThisGroup: The regular expression of this group including its parantheses
 * - child-array: An array containing the child regular expressions
 *
 * SPECIAL: indexMap: The first element contains one more array element: [1]: indexMap: This array maps the
 * original-index [0..n] to the actual-index [0..m]
 *
 * SPECIAL: source: The first element contains one more array element: [2]: source: This is the initial regular
 * expression pattern and the only reason this is required is because in RegExp.source the slash "/" needs to be
 * escaped.
 *
 * Rule for group parsing: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * And: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-regular-expression-objects
 * The capturing groups are numbered according to the order of left parentheses of capturing groups, starting from 1.
 * The matched substring can be recalled from the resulting array's elements [1], ..., [n] or from the predefined
 * RegExp object's properties $1, ..., $9.
 * The good thing is that the regular expression rules around groups (and as well in most other parts of the regular
 * expression) did not change between the different ECMA Script versions respective did not have any impact on the
 * group parsing and therefore this function is compatible between the different browsers!
 *
 * @param {String} [regex]
 * @returns {*}
 */
function getRegexCompleteGroupingStructure(regex) {
    if (!regex) {
        console.error('The "regex" is empty! Returning empty array!');
        return [];
    }
    var indexMap = [];
    var source = [''];
    var containsBackReference = [];
    containsBackReference[0] = false;
    var getRegexCompleteGroupingStructureInternalResult = getRegexCompleteGroupingStructureInternal(regex, [0, 0, 0], true, indexMap, source, containsBackReference);
    if (containsBackReference[0]) {
        var fixIndexOnGroupingStructure = function (groupingStructureElement) {
            var regexForThisGroup = '';
            var charAt;
            for (var i = 0; i < groupingStructureElement[2].length; i++) {
                charAt = groupingStructureElement[2].charAt(i);
                regexForThisGroup += charAt;
                if (charAt === '\\') {
                    if (i + 1 === groupingStructureElement[2].length) {
                        continue;
                    }
                    i++;
                    charAt = groupingStructureElement[2].charAt(i);
                    var int = '';
                    while (charAt >= '0' && charAt <= '9') {
                        int += charAt;
                        i++;
                        charAt = groupingStructureElement[2].charAt(i);
                    }
                    if (int) {
                        regexForThisGroup += indexMap[int];
                        i--;
                    } else {
                        regexForThisGroup += charAt;
                    }
                    continue;
                }
                if (charAt === '[') {
                    if (i + 1 === groupingStructureElement[2].length) {
                        continue;
                    }
                    i++;
                    charAt = groupingStructureElement[2].charAt(i);
                    while ((charAt !== ']' || (groupingStructureElement[2].charAt(i - 1) === '\\' && groupingStructureElement[2].charAt(i - 2) !== '\\')) && i < groupingStructureElement[2].length) {
                        regexForThisGroup += charAt;
                        i++;
                        charAt = groupingStructureElement[2].charAt(i);
                    }
                    regexForThisGroup += charAt;
                    continue;
                }
            }
            groupingStructureElement[2] = regexForThisGroup;
            for (var j = 0; j < groupingStructureElement[3].length; j++) {
                fixIndexOnGroupingStructure(groupingStructureElement[3][j]);
            }
        }
        fixIndexOnGroupingStructure(getRegexCompleteGroupingStructureInternalResult);
    }
    return [getRegexCompleteGroupingStructureInternalResult, indexMap, source];
}
/**
 * Description see getRegexCompleteGroupingStructure.
 * @param regex
 * @param posIndexOrigIndex - this array has 3 values:
 * [0]:position: while iterating through the regular expression the parsing position is incremented starting at 0
 * [1]:index: the index of the current group we are parsing
 * [2]:original index: the original index the group had before we added additional groups
 * @param isCapturingGroup - tells us whether this group of characters enclosed within parantheses is a capturing group
 * or not. If not it could be a non capturing group (?:xyz) or an assertion which starts as well with a group bracket
 * "(" character but is followed with a "?=" or "?!" and tells us that this is not a capturing group
 * @param indexMap this array maps the original-index [0..n] to the actual-index [0..m]
 * @param source This is the initial regular expression pattern and the only reason this is required is because in
 * RegExp.source the slash "/" needs to be escaped.
 * @returns {*}
 */
function getRegexCompleteGroupingStructureInternal(regex, posIndexOrigIndex, isCapturingGroup, indexMap, source, containsBackReference) {
    var groupStructure;
    if (isCapturingGroup) {
        groupStructure = [posIndexOrigIndex[1], posIndexOrigIndex[2], '', []];
        indexMap[posIndexOrigIndex[2]] = posIndexOrigIndex[1];
    } else {
        groupStructure = [undefined, undefined, '', []];
    }
    var tmpStr = '';
    var charAt;
    for (posIndexOrigIndex[0]; posIndexOrigIndex[0] < regex.length; posIndexOrigIndex[0]++) {
        charAt = regex.charAt(posIndexOrigIndex[0]);
        if (charAt === '\\') {
            //handle escape character
            if (posIndexOrigIndex[0] + 1 === regex.length) {
                tmpStr += '\\';
                source[0] += '\\';
                continue;
            }
            posIndexOrigIndex[0]++;
            charAt = regex.charAt(posIndexOrigIndex[0]);
            //check whether we have a back-reference and adjust it according to the shift in the index-map
            var int = '';
            //Back references above \9 behave strange and different in every language. In
            // Java-Script they are treated as back-reference if the group is existing otherwise they are treated
            // as character escape sequence.
            while (charAt >= '0' && charAt <= '9') {
                int += charAt;
                posIndexOrigIndex[0]++;
                charAt = regex.charAt(posIndexOrigIndex[0]);
            }
            if (int) {
                if (indexMap[int]) {
                    //if a group exists then back-reference to the group
                    //20170416 - bug the index map can change later if additional surrounding paranthesis are added
                    //Therefore this calculation needs to be done in the end!
                    //tmpStr += '\\' + indexMap[int];
                    tmpStr += '\\' + int;
                    containsBackReference[0] = true;
                } else {
                    if (int.indexOf('8') >= 0 || int.indexOf('9') >= 0) {
                        //if it is a non octal digit then treat it as simple number
                        tmpStr += int;
                    } else {
                        //otherwise it is a character escape
                        tmpStr += '\\' + 'x' + ("0" + (parseInt(int, 8).toString(16))).slice(-2).toUpperCase();
                    }
                }
                source[0] += '\\' + int;
                posIndexOrigIndex[0]--;
            } else {
                tmpStr += '\\' + charAt;
                source[0] += '\\' + charAt;
            }
            continue;
        }
        if (charAt === '[') {
            //parse character set
            tmpStr += '[';
            source[0] += '[';
            if (posIndexOrigIndex[0] + 1 === regex.length) {
                continue;
            }
            posIndexOrigIndex[0]++;
            charAt = regex.charAt(posIndexOrigIndex[0]);
            while ((charAt !== ']' || (regex.charAt(posIndexOrigIndex[0] - 1) === '\\' && regex.charAt(posIndexOrigIndex[0] - 2) !== '\\')) && posIndexOrigIndex[0] < regex.length) {
                tmpStr += charAt;
                source[0] += charAt;
                posIndexOrigIndex[0]++;
                charAt = regex.charAt(posIndexOrigIndex[0]);
            }
            tmpStr += charAt;
            source[0] += charAt;
            continue;
        }
        if (charAt === '|') {
            //finalize pending tmp group string if any
            //20170327 - this is not necessary
            // if (tmpStr && groupStructure[3].length > 0) {
            //     //complete grouping: put trailing and pending characters sequences into groups
            //     posIndexOrigIndex[1]++;
            //     tmpStr = '(' + tmpStr + ')';
            //     groupStructure[3].push([posIndexOrigIndex[1], , tmpStr, []]);
            // }
            groupStructure[2] += tmpStr + '|';
            tmpStr = '';
            source[0] += '|';
            continue;
        }
        if (charAt === ')') {
            //handle group ending
            //20170327 - not required to group here because it is already contained in a parent group
            // if (tmpStr && groupStructure[3].length > 0) {
            //     //complete grouping: put trailing and pending characters sequences into groups
            //     posIndexOrigIndex[1]++;
            //     tmpStr = '(' + tmpStr + ')';
            //     groupStructure[3].push([posIndexOrigIndex[1], , tmpStr, []]);
            // }
            groupStructure[2] += tmpStr + ')';
            source[0] += ')';
            return groupStructure;
        }
        if (charAt === '(') {
            //handle group start
            if (tmpStr) {
                //complete grouping: put trailing and pending characters sequences into non remembering groups
                posIndexOrigIndex[1]++;
                tmpStr = '(' + tmpStr + ')';
                groupStructure[3].push([posIndexOrigIndex[1], undefined, tmpStr, []]);
            }
            posIndexOrigIndex[0]++;
            var regexGroupStructureInternal;
            var idx = posIndexOrigIndex[1] + 1;
            isCapturingGroup = true;
            // check whether group is an assertion
            if (regex.charAt(posIndexOrigIndex[0]) === '?' && posIndexOrigIndex[0] + 1 < regex.length && (regex.charAt(posIndexOrigIndex[0] + 1) === '=' || regex.charAt(posIndexOrigIndex[0] + 1) === '!' || regex.charAt(posIndexOrigIndex[0] + 1) === ':')) {
                //Handle assertion
                posIndexOrigIndex[0]++;
                var assertionChar = regex.charAt(posIndexOrigIndex[0]);
                posIndexOrigIndex[0]++;
                //we only set isCapturingGroup to false in case it is a non capturing group. For assertion groups
                //i.e. positive-/negative-lookahead the parser steps back after the parsing of the lookahead and
                //therefore (see if statement further down) we don't need to set the assertion groups into additional
                //paranthesis.
                //In other words at the end of a lookahead or a lookbehind, the regex engine hasn't moved on the string.
                // You can chain three more lookaheads after the first, and the regex engine still won't move.
                if (assertionChar === ':') {
                    isCapturingGroup = false;
                }
                source[0] += '(?' + assertionChar;
                regexGroupStructureInternal = getRegexCompleteGroupingStructureInternal(regex, posIndexOrigIndex, false, indexMap, source, containsBackReference);
                regexGroupStructureInternal[2] = '(?' + assertionChar + regexGroupStructureInternal[2];
            } else {
                posIndexOrigIndex[1]++;
                posIndexOrigIndex[2]++;
                source[0] += '(';
                regexGroupStructureInternal = getRegexCompleteGroupingStructureInternal(regex, posIndexOrigIndex, true, indexMap, source, containsBackReference);
                regexGroupStructureInternal[2] = '(' + regexGroupStructureInternal[2];
            }

            //20170327 - special handling if we have a capturing group with a quantifier then we need to
            //put the quantified group into additional paranthesis otherwise only the first group matches!
            var quantifierStart = posIndexOrigIndex[0];
            var quantifierString = '';
            if (posIndexOrigIndex[0] + 1 < regex.length) {
                //parse quantifier
                charAt = regex.charAt(posIndexOrigIndex[0] + 1);
                if (charAt === '*') {
                    posIndexOrigIndex[0]++;
                    quantifierString = '*';
                } else if (charAt === '+') {
                    posIndexOrigIndex[0]++;
                    quantifierString = '+';
                } else if (charAt === '?') {
                    posIndexOrigIndex[0]++;
                    quantifierString = '?';
                } else if (charAt === '{') {
                    posIndexOrigIndex[0]++;
                    quantifierString = '{';
                    posIndexOrigIndex[0]++;
                    charAt = regex.charAt(posIndexOrigIndex[0]);
                    while (charAt >= '0' && charAt <= '9' && posIndexOrigIndex[0] < regex.length) {
                        quantifierString += charAt;
                        posIndexOrigIndex[0]++;
                        charAt = regex.charAt(posIndexOrigIndex[0]);
                    }
                    if (charAt === '}') {
                        quantifierString += '}';
                    } else {
                        if (charAt === ',') {
                            quantifierString += ',';
                            posIndexOrigIndex[0]++;
                            charAt = regex.charAt(posIndexOrigIndex[0]);
                            while (charAt >= '0' && charAt <= '9' && posIndexOrigIndex[0] < regex.length) {
                                quantifierString += charAt;
                                posIndexOrigIndex[0]++;
                                charAt = regex.charAt(posIndexOrigIndex[0]);
                            }
                            if (charAt === '}') {
                                quantifierString += '}';
                            } else {
                                quantifierString = '';
                            }
                        } else {
                            quantifierString = '';
                        }
                    }
                }
                if (quantifierString.length > 0) {
                    regexGroupStructureInternal[2] += quantifierString;
                    source[0] += quantifierString;
                    if (regex.charAt(posIndexOrigIndex[0] + 1) === '?') {
                        posIndexOrigIndex[0]++;
                        regexGroupStructureInternal[2] += '?';
                        source[0] += '?';
                    }
                } else {
                    posIndexOrigIndex[0] = quantifierStart;
                }
            }
            //20170327 - special handling if we have a non capturing group then we need to put this group into
            // additional paranthesis otherwise we don't know the size of the group !
            if (quantifierString.length > 0 || !isCapturingGroup) {
                incrementRegexGroupStructureIndex(regexGroupStructureInternal, indexMap);
                regexGroupStructureInternal = [idx, undefined, '(' + regexGroupStructureInternal[2] + ')', [regexGroupStructureInternal]];
                posIndexOrigIndex[1]++;
            }

            groupStructure[2] += tmpStr + regexGroupStructureInternal[2];
            groupStructure[3].push(regexGroupStructureInternal);
            tmpStr = '';
        } else {
            charAt = regex.charAt(posIndexOrigIndex[0]);
            tmpStr += charAt;
            if (charAt === '/') {
                source[0] += '\\' + charAt;
            } else {
                source[0] += charAt;
            }
        }
    }
    //we only get here in the top-most iteration i.e. for matching group 0 which has no enclosing paranthesis
    groupStructure[2] += tmpStr;
    return groupStructure;
}

function incrementRegexGroupStructureIndex(regexGroupStructure, indexMap) {
    if (regexGroupStructure[0]) {
        regexGroupStructure[0]++;
        if (regexGroupStructure[1]) {
            indexMap[regexGroupStructure[1]] = regexGroupStructure[0];
        }
    }
    for (var i = 0; i < regexGroupStructure[3].length; i++) {
        incrementRegexGroupStructureIndex(regexGroupStructure[3][i], indexMap);
    }
}

function initialize() {
    if (!(typeof module === "undefined")) {
        module.exports = Regex;
    }
}
initialize();