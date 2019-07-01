"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var CucumberExpressionGenerator_1 = __importDefault(require("../src/CucumberExpressionGenerator"));
var CucumberExpression_1 = __importDefault(require("../src/CucumberExpression"));
var ParameterType_1 = __importDefault(require("../src/ParameterType"));
var ParameterTypeRegistry_1 = __importDefault(require("../src/ParameterTypeRegistry"));
var Currency = /** @class */ (function () {
    function Currency(s) {
        this.s = s;
    }
    return Currency;
}());
describe('CucumberExpressionGenerator', function () {
    var parameterTypeRegistry;
    var generator;
    function assertExpression(expectedExpression, expectedArgumentNames, text) {
        var generatedExpression = generator.generateExpressions(text)[0];
        assert_1.default.deepStrictEqual(generatedExpression.parameterNames, expectedArgumentNames);
        assert_1.default.strictEqual(generatedExpression.source, expectedExpression);
        var cucumberExpression = new CucumberExpression_1.default(generatedExpression.source, parameterTypeRegistry);
        var match = cucumberExpression.match(text);
        if (match === null) {
            assert_1.default.fail("Expected text '" + text + "' to match generated expression '" + generatedExpression.source + "'");
        }
        assert_1.default.strictEqual(match.length, expectedArgumentNames.length);
    }
    beforeEach(function () {
        parameterTypeRegistry = new ParameterTypeRegistry_1.default();
        generator = new CucumberExpressionGenerator_1.default(parameterTypeRegistry);
    });
    it('documents expression generation', function () {
        parameterTypeRegistry = new ParameterTypeRegistry_1.default();
        generator = new CucumberExpressionGenerator_1.default(parameterTypeRegistry);
        var undefinedStepText = 'I have 2 cucumbers and 1.5 tomato';
        var generatedExpression = generator.generateExpressions(undefinedStepText)[0];
        assert_1.default.strictEqual(generatedExpression.source, 'I have {int} cucumbers and {float} tomato');
        assert_1.default.strictEqual(generatedExpression.parameterNames[0], 'int');
        assert_1.default.strictEqual(generatedExpression.parameterTypes[1].name, 'float');
    });
    it('generates expression for no args', function () {
        assertExpression('hello', [], 'hello');
    });
    it('generates expression with escaped left parenthesis', function () {
        assertExpression('\\(iii)', [], '(iii)');
    });
    it('generates expression with escaped left curly brace', function () {
        assertExpression('\\{iii}', [], '{iii}');
    });
    it('generates expression with escaped slashes', function () {
        assertExpression('The {int}\\/{int}\\/{int} hey', ['int', 'int2', 'int3'], 'The 1814/05/17 hey');
    });
    it('generates expression for int float arg', function () {
        assertExpression('I have {int} cukes and {float} euro', ['int', 'float'], 'I have 2 cukes and 1.5 euro');
    });
    it('generates expression for strings', function () {
        assertExpression('I like {string} and {string}', ['string', 'string2'], 'I like "bangers" and \'mash\'');
    });
    it('generates expression with % sign', function () {
        assertExpression('I am {int}%% foobar', ['int'], 'I am 20%% foobar');
    });
    it('generates expression for just int', function () {
        assertExpression('{int}', ['int'], '99999');
    });
    it('numbers only second argument when builtin type is not reserved keyword', function () {
        assertExpression('I have {float} cukes and {float} euro', ['float', 'float2'], 'I have 2.5 cukes and 1.5 euro');
    });
    it('generates expression for custom type', function () {
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('currency', /[A-Z]{3}/, Currency, function (s) { return new Currency(s); }, true, false));
        assertExpression('I have a {currency} account', ['currency'], 'I have a EUR account');
    });
    it('prefers leftmost match when there is overlap', function () {
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('currency', /cd/, Currency, function (s) { return new Currency(s); }, true, false));
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('date', /bc/, Date, function (s) { return new Date(s); }, true, false));
        assertExpression('a{date}defg', ['date'], 'abcdefg');
    });
    // TODO: prefers widest match
    it('generates all combinations of expressions when several parameter types match', function () {
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('currency', /x/, null, function (s) { return new Currency(s); }, true, false));
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('date', /x/, null, function (s) { return new Date(s); }, true, false));
        var generatedExpressions = generator.generateExpressions('I have x and x and another x');
        var expressions = generatedExpressions.map(function (e) { return e.source; });
        assert_1.default.deepStrictEqual(expressions, [
            'I have {currency} and {currency} and another {currency}',
            'I have {currency} and {currency} and another {date}',
            'I have {currency} and {date} and another {currency}',
            'I have {currency} and {date} and another {date}',
            'I have {date} and {currency} and another {currency}',
            'I have {date} and {currency} and another {date}',
            'I have {date} and {date} and another {currency}',
            'I have {date} and {date} and another {date}',
        ]);
    });
    it('exposes parameter type names in generated expression', function () {
        var expression = generator.generateExpressions('I have 2 cukes and 1.5 euro')[0];
        var typeNames = expression.parameterTypes.map(function (parameter) { return parameter.name; });
        assert_1.default.deepStrictEqual(typeNames, ['int', 'float']);
    });
    it('matches parameter types with optional capture groups', function () {
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('optional-flight', /(1st flight)?/, null, function (s) { return s; }, true, false));
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('optional-hotel', /(1st hotel)?/, null, function (s) { return s; }, true, false));
        var expression = generator.generateExpressions('I reach Stage4: 1st flight-1st hotel')[0];
        // While you would expect this to be `I reach Stage{int}: {optional-flight}-{optional-hotel}` the `-1` causes
        // {int} to match just before {optional-hotel}.
        assert_1.default.strictEqual(expression.source, 'I reach Stage{int}: {optional-flight}{int}st hotel');
    });
    it('generates at most 256 expressions', function () {
        for (var i = 0; i < 4; i++) {
            parameterTypeRegistry.defineParameterType(new ParameterType_1.default('my-type-' + i, /[a-z]/, null, function (s) { return s; }, true, false));
        }
        // This would otherwise generate 4^11=419430 expressions and consume just shy of 1.5GB.
        var expressions = generator.generateExpressions('a simple step');
        assert_1.default.strictEqual(expressions.length, 256);
    });
    it('prefers expression with longest non empty match', function () {
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('zero-or-more', /[a-z]*/, null, function (s) { return s; }, true, false));
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('exactly-one', /[a-z]/, null, function (s) { return s; }, true, false));
        var expressions = generator.generateExpressions('a simple step');
        assert_1.default.strictEqual(expressions.length, 2);
        assert_1.default.strictEqual(expressions[0].source, '{exactly-one} {zero-or-more} {zero-or-more}');
        assert_1.default.strictEqual(expressions[1].source, '{zero-or-more} {zero-or-more} {zero-or-more}');
    });
});
//# sourceMappingURL=CucumberExpressionGeneratorTest.js.map