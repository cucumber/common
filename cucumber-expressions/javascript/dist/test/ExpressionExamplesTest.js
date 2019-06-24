"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var assert_1 = __importDefault(require("assert"));
var CucumberExpression_1 = __importDefault(require("../src/CucumberExpression"));
var RegularExpression_1 = __importDefault(require("../src/RegularExpression"));
var ParameterTypeRegistry_1 = __importDefault(require("../src/ParameterTypeRegistry"));
describe('examples.txt', function () {
    var e_1, _a;
    var match = function (expressionText, text) {
        var m = /\/(.*)\//.exec(expressionText);
        var expression = m
            ? new RegularExpression_1.default(new RegExp(m[1]), new ParameterTypeRegistry_1.default())
            : new CucumberExpression_1.default(expressionText, new ParameterTypeRegistry_1.default());
        var args = expression.match(text);
        if (!args) {
            return null;
        }
        return args.map(function (arg) { return arg.getValue(null); });
    };
    var examples = fs_1.default.readFileSync('examples.txt', 'utf-8');
    var chunks = examples.split(/^---/m);
    var _loop_1 = function (chunk) {
        var _a = __read(chunk.trim().split(/\n/m), 3), expressionText = _a[0], text = _a[1], expectedArgs = _a[2];
        it("Works with: " + expressionText, function () {
            assert_1.default.deepStrictEqual(JSON.stringify(match(expressionText, text)), expectedArgs);
        });
    };
    try {
        for (var chunks_1 = __values(chunks), chunks_1_1 = chunks_1.next(); !chunks_1_1.done; chunks_1_1 = chunks_1.next()) {
            var chunk = chunks_1_1.value;
            _loop_1(chunk);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (chunks_1_1 && !chunks_1_1.done && (_a = chunks_1.return)) _a.call(chunks_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
//# sourceMappingURL=ExpressionExamplesTest.js.map