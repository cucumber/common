"use strict";
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
var assert_1 = __importDefault(require("assert"));
var CucumberExpression_1 = __importDefault(require("../src/CucumberExpression"));
var ParameterTypeRegistry_1 = __importDefault(require("../src/ParameterTypeRegistry"));
var ParameterType_1 = __importDefault(require("../src/ParameterType"));
describe('CucumberExpression', function () {
    var e_1, _a;
    it('documents match arguments', function () {
        var parameterTypeRegistry = new ParameterTypeRegistry_1.default();
        /// [capture-match-arguments]
        var expr = 'I have {int} cuke(s)';
        var expression = new CucumberExpression_1.default(expr, parameterTypeRegistry);
        var args = expression.match('I have 7 cukes');
        assert_1.default.strictEqual(7, args[0].getValue(null));
        /// [capture-match-arguments]
    });
    it('matches word', function () {
        assert_1.default.deepStrictEqual(match('three {word} mice', 'three blind mice'), [
            'blind',
        ]);
    });
    it('matches double quoted string', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', 'three "blind" mice'), [
            'blind',
        ]);
    });
    it('matches multiple double quoted strings', function () {
        assert_1.default.deepStrictEqual(match('three {string} and {string} mice', 'three "blind" and "crippled" mice'), ['blind', 'crippled']);
    });
    it('matches single quoted string', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', "three 'blind' mice"), [
            'blind',
        ]);
    });
    it('matches multiple single quoted strings', function () {
        assert_1.default.deepStrictEqual(match('three {string} and {string} mice', "three 'blind' and 'crippled' mice"), ['blind', 'crippled']);
    });
    it('does not match misquoted string', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', 'three "blind\' mice'), null);
    });
    it('matches single quoted string with double quotes', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', 'three \'"blind"\' mice'), ['"blind"']);
    });
    it('matches double quoted string with single quotes', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', 'three "\'blind\'" mice'), ["'blind'"]);
    });
    it('matches double quoted string with escaped double quote', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', 'three "bl\\"nd" mice'), ['bl"nd']);
    });
    it('matches single quoted string with escaped single quote', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', "three 'bl\\'nd' mice"), ["bl'nd"]);
    });
    it('matches single quoted string with escaped single quote', function () {
        assert_1.default.deepStrictEqual(match('three {string} mice', "three 'bl\\'nd' mice"), ["bl'nd"]);
    });
    it('matches escaped parenthesis', function () {
        assert_1.default.deepStrictEqual(match('three \\(exceptionally) {string} mice', 'three (exceptionally) "blind" mice'), ['blind']);
    });
    it('matches escaped slash', function () {
        assert_1.default.deepStrictEqual(match('12\\/2020', '12/2020'), []);
    });
    it('matches int', function () {
        assert_1.default.deepStrictEqual(match('{int}', '22'), [22]);
    });
    it("doesn't match float as int", function () {
        assert_1.default.deepStrictEqual(match('{int}', '1.22'), null);
    });
    it('matches float', function () {
        assert_1.default.deepStrictEqual(match('{float}', '0.22'), [0.22]);
        assert_1.default.deepStrictEqual(match('{float}', '.22'), [0.22]);
    });
    it('matches anonymous', function () {
        assert_1.default.deepStrictEqual(match('{}', '0.22'), ['0.22']);
    });
    it('throws unknown parameter type', function () {
        try {
            match('{unknown}', 'something');
            assert_1.default.fail();
        }
        catch (expected) {
            assert_1.default.strictEqual(expected.message, 'Undefined parameter type {unknown}');
        }
    });
    it('does not allow optional parameter types', function () {
        try {
            match('({int})', '3');
            assert_1.default.fail();
        }
        catch (expected) {
            assert_1.default.strictEqual(expected.message, 'Parameter types cannot be optional: ({int})');
        }
    });
    it('allows escaped optional parameter types', function () {
        assert_1.default.deepStrictEqual(match('\\({int})', '(3)'), [3]);
    });
    it('does not allow text/parameter type alternation', function () {
        try {
            match('x/{int}', '3');
            assert_1.default.fail();
        }
        catch (expected) {
            assert_1.default.strictEqual(expected.message, 'Parameter types cannot be alternative: x/{int}');
        }
    });
    it('does not allow parameter type/text alternation', function () {
        try {
            match('{int}/x', '3');
            assert_1.default.fail();
        }
        catch (expected) {
            assert_1.default.strictEqual(expected.message, 'Parameter types cannot be alternative: {int}/x');
        }
    });
    var _loop_1 = function (c) {
        it("does not allow parameter type with " + c, function () {
            try {
                match("{" + c + "string}", 'something');
                assert_1.default.fail();
            }
            catch (expected) {
                assert_1.default.strictEqual(expected.message, "Illegal character '" + c + "' in parameter name {" + c + "string}");
            }
        });
    };
    try {
        for (var _b = __values('[]()$.|?*+'.split('')), _c = _b.next(); !_c.done; _c = _b.next()) {
            var c = _c.value;
            _loop_1(c);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    it('exposes source', function () {
        var expr = 'I have {int} cuke(s)';
        assert_1.default.strictEqual(new CucumberExpression_1.default(expr, new ParameterTypeRegistry_1.default()).source, expr);
    });
    // JavaScript-specific
    it('delegates transform to custom object', function () {
        var parameterTypeRegistry = new ParameterTypeRegistry_1.default();
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('widget', /\w+/, null, function (s) {
            return this.createWidget(s);
        }, false, true));
        var expression = new CucumberExpression_1.default('I have a {widget}', parameterTypeRegistry);
        var world = {
            createWidget: function (s) {
                return "widget:" + s;
            },
        };
        var args = expression.match("I have a bolt");
        assert_1.default.strictEqual(args[0].getValue(world), 'widget:bolt');
    });
    describe('escapes special characters', function () {
        ;
        ['\\', '[', ']', '^', '$', '.', '|', '?', '*', '+'].forEach(function (character) {
            it("escapes " + character, function () {
                var expr = "I have {int} cuke(s) and " + character;
                var expression = new CucumberExpression_1.default(expr, new ParameterTypeRegistry_1.default());
                var arg1 = expression.match("I have 800 cukes and " + character)[0];
                assert_1.default.strictEqual(arg1.getValue(null), 800);
            });
        });
        it("escapes .", function () {
            var expr = "I have {int} cuke(s) and .";
            var expression = new CucumberExpression_1.default(expr, new ParameterTypeRegistry_1.default());
            assert_1.default.strictEqual(expression.match("I have 800 cukes and 3"), null);
            var arg1 = expression.match("I have 800 cukes and .")[0];
            assert_1.default.strictEqual(arg1.getValue(null), 800);
        });
        it("escapes |", function () {
            var expr = "I have {int} cuke(s) and a|b";
            var expression = new CucumberExpression_1.default(expr, new ParameterTypeRegistry_1.default());
            assert_1.default.strictEqual(expression.match("I have 800 cukes and a"), null);
            assert_1.default.strictEqual(expression.match("I have 800 cukes and b"), null);
            var arg1 = expression.match("I have 800 cukes and a|b")[0];
            assert_1.default.strictEqual(arg1.getValue(null), 800);
        });
    });
});
var match = function (expression, text) {
    var cucumberExpression = new CucumberExpression_1.default(expression, new ParameterTypeRegistry_1.default());
    var args = cucumberExpression.match(text);
    if (!args) {
        return null;
    }
    return args.map(function (arg) { return arg.getValue(null); });
};
//# sourceMappingURL=CucumberExpressionTest.js.map