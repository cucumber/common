"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var CucumberExpression_1 = __importDefault(require("../src/CucumberExpression"));
var ParameterTypeRegistry_1 = __importDefault(require("../src/ParameterTypeRegistry"));
describe('CucumberExpression', function () {
    describe('RegExp translation', function () {
        it('translates no arguments', function () {
            assertRegexp('I have 10 cukes in my belly now', /^I have 10 cukes in my belly now$/);
        });
        it('translates alternation', function () {
            assertRegexp('I had/have a great/nice/charming friend', /^I (?:had|have) a (?:great|nice|charming) friend$/);
        });
        it('translates alternation with non-alpha', function () {
            assertRegexp('I said Alpha1/Beta1', /^I said (?:Alpha1|Beta1)$/);
        });
        it('translates parameters', function () {
            assertRegexp("I have {float} cukes at {int} o'clock", /^I have (-?\d*(?:[.,]\d+)?) cukes at ((?:-?\d+)|(?:\d+)) o'clock$/);
        });
        it('translates parenthesis to non-capturing optional capture group', function () {
            assertRegexp('I have many big(ish) cukes', /^I have many big(?:ish)? cukes$/);
        });
        it('translates parenthesis with alpha unicode', function () {
            assertRegexp('Привет, Мир(ы)!', /^Привет, Мир(?:ы)?!$/);
        });
    });
});
var assertRegexp = function (expression, expectedRegexp) {
    var cucumberExpression = new CucumberExpression_1.default(expression, new ParameterTypeRegistry_1.default());
    assert_1.default.deepStrictEqual(cucumberExpression.regexp, expectedRegexp);
};
//# sourceMappingURL=CucumberExpressionRegExpTest.js.map