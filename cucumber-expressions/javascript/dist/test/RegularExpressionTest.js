"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var RegularExpression_1 = __importDefault(require("../src/RegularExpression"));
var ParameterTypeRegistry_1 = __importDefault(require("../src/ParameterTypeRegistry"));
describe('RegularExpression', function () {
    it('documents match arguments', function () {
        var parameterRegistry = new ParameterTypeRegistry_1.default();
        /// [capture-match-arguments]
        var expr = /I have (\d+) cukes? in my (\w+) now/;
        var expression = new RegularExpression_1.default(expr, parameterRegistry);
        var args = expression.match('I have 7 cukes in my belly now');
        assert_1.default.strictEqual(7, args[0].getValue(null));
        assert_1.default.strictEqual('belly', args[1].getValue(null));
        /// [capture-match-arguments]
    });
    it('does no transform by default', function () {
        assert_1.default.deepStrictEqual(match(/(\d\d)/, '22')[0], '22');
    });
    it('does not transform anonymous', function () {
        assert_1.default.deepStrictEqual(match(/(.*)/, '22')[0], '22');
    });
    it('transforms negative int', function () {
        assert_1.default.deepStrictEqual(match(/(-?\d+)/, '-22')[0], -22);
    });
    it('transforms positive int', function () {
        assert_1.default.deepStrictEqual(match(/(\d+)/, '22')[0], 22);
    });
    it('transforms float without integer part', function () {
        assert_1.default.deepStrictEqual(match(/(-?\d*(?:\.\d+)?)/, '.22')[0], 0.22);
    });
    it('transforms float with sign', function () {
        assert_1.default.deepStrictEqual(match(/(-?\d*(?:\.\d+)?)/, '-1.22')[0], -1.22);
    });
    it('returns null when there is no match', function () {
        assert_1.default.strictEqual(match(/hello/, 'world'), null);
    });
    it('matches nested capture group without match', function () {
        assert_1.default.deepStrictEqual(match(/^a user( named "([^"]*)")?$/, 'a user'), [
            null,
        ]);
    });
    it('matches nested capture group with match', function () {
        assert_1.default.deepStrictEqual(match(/^a user( named "([^"]*)")?$/, 'a user named "Charlie"'), ['Charlie']);
    });
    it('matches capture group nested in optional one', function () {
        var regexp = /^a (pre-commercial transaction |pre buyer fee model )?purchase(?: for \$(\d+))?$/;
        assert_1.default.deepStrictEqual(match(regexp, 'a purchase'), [null, null]);
        assert_1.default.deepStrictEqual(match(regexp, 'a purchase for $33'), [null, 33]);
        assert_1.default.deepStrictEqual(match(regexp, 'a pre buyer fee model purchase'), [
            'pre buyer fee model ',
            null,
        ]);
    });
    it('ignores non capturing groups', function () {
        assert_1.default.deepStrictEqual(match(/(\S+) ?(can|cannot)? (?:delete|cancel) the (\d+)(?:st|nd|rd|th) (attachment|slide) ?(?:upload)?/, 'I can cancel the 1st slide upload'), ['I', 'can', 1, 'slide']);
    });
    it('works with escaped parenthesis', function () {
        assert_1.default.deepStrictEqual(match(/Across the line\(s\)/, 'Across the line(s)'), []);
    });
    it('exposes regexp and source', function () {
        var regexp = /I have (\d+) cukes? in my (.+) now/;
        var expression = new RegularExpression_1.default(regexp, new ParameterTypeRegistry_1.default());
        assert_1.default.deepStrictEqual(expression.regexp, regexp);
        assert_1.default.deepStrictEqual(expression.source, regexp.source);
    });
    it('does not take consider parenthesis in character class as group', function () {
        var expression = new RegularExpression_1.default(/^drawings: ([A-Z_, ()]+)$/, new ParameterTypeRegistry_1.default());
        var args = expression.match('drawings: ONE, TWO(ABC)');
        assert_1.default.strictEqual(args[0].getValue(this), 'ONE, TWO(ABC)');
    });
});
var match = function (regexp, text) {
    var parameterRegistry = new ParameterTypeRegistry_1.default();
    var regularExpression = new RegularExpression_1.default(regexp, parameterRegistry);
    var args = regularExpression.match(text);
    if (!args) {
        return null;
    }
    return args.map(function (arg) { return arg.getValue(null); });
};
//# sourceMappingURL=RegularExpressionTest.js.map