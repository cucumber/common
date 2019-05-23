"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var tag_expression_parser_1 = __importDefault(require("../src/tag_expression_parser"));
describe("TagExpressionParser", function () {
    describe("#parse", function () {
        [
            ["", "true"],
            ["a and b", "( a and b )"],
            ["a or b", "( a or b )"],
            ["not a", "not ( a )"],
            ["( a and b ) or ( c and d )", "( ( a and b ) or ( c and d ) )"],
            [
                "not a or b and not c or not d or e and f",
                "( ( ( not ( a ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )"
            ],
            [
                "not a\\(\\) or b and not c or not d or e and f",
                "( ( ( not ( a\\(\\) ) or ( b and not ( c ) ) ) or not ( d ) ) or ( e and f ) )"
            ]
            // a or not b
        ].forEach(function (inOut) {
            it(inOut[0], function () {
                var infix = inOut[0];
                var expr = tag_expression_parser_1.default(infix);
                assert_1.default.strictEqual(expr.toString(), inOut[1]);
                var roundtripTokens = expr.toString();
                var roundtripExpr = tag_expression_parser_1.default(roundtripTokens);
                assert_1.default.strictEqual(roundtripExpr.toString(), inOut[1]);
            });
        });
        [
            ["@a @b or", "Syntax error. Expected operator"],
            ["@a and (@b not)", "Syntax error. Expected operator"],
            ["@a and (@b @c) or", "Syntax error. Expected operator"],
            ["@a and or", "Syntax error. Expected operand"],
            ["or or", "Syntax error. Expected operand"],
            ["a b", "Syntax error. Expected operator"],
            ["( a and b ) )", "Syntax error. Unmatched )"],
            ["( ( a and b )", "Syntax error. Unmatched ("]
            // a or not b
        ].forEach(function (inOut) {
            it(inOut[0] + " fails", function () {
                var infix = inOut[0];
                try {
                    tag_expression_parser_1.default(infix);
                    throw new Error("Expected syntax error");
                }
                catch (expected) {
                    assert_1.default.strictEqual(expected.message, inOut[1]);
                }
            });
        });
        // evaluation
        it("evaluates not", function () {
            var expr = tag_expression_parser_1.default("not   x");
            assert_1.default.strictEqual(expr.evaluate(["x"]), false);
            assert_1.default.strictEqual(expr.evaluate(["y"]), true);
        });
        it("evaluates and", function () {
            var expr = tag_expression_parser_1.default("x and y");
            assert_1.default.strictEqual(expr.evaluate(["x", "y"]), true);
            assert_1.default.strictEqual(expr.evaluate(["y"]), false);
            assert_1.default.strictEqual(expr.evaluate(["x"]), false);
        });
        it("evaluates or", function () {
            var expr = tag_expression_parser_1.default("  x or(y) ");
            assert_1.default.strictEqual(expr.evaluate([]), false);
            assert_1.default.strictEqual(expr.evaluate(["y"]), true);
            assert_1.default.strictEqual(expr.evaluate(["x"]), true);
        });
        it("evaluates expressions with escaped chars", function () {
            var expr = tag_expression_parser_1.default("  x\\(1\\) or(y\\(2\\)) ");
            assert_1.default.strictEqual(expr.evaluate([]), false);
            assert_1.default.strictEqual(expr.evaluate(["y(2)"]), true);
            assert_1.default.strictEqual(expr.evaluate(["x(1)"]), true);
            assert_1.default.strictEqual(expr.evaluate(["y"]), false);
            assert_1.default.strictEqual(expr.evaluate(["x"]), false);
        });
        it("evaluates empty expressions to true", function () {
            var expr = tag_expression_parser_1.default("");
            assert_1.default.strictEqual(expr.evaluate([]), true);
            assert_1.default.strictEqual(expr.evaluate(["y"]), true);
            assert_1.default.strictEqual(expr.evaluate(["x"]), true);
        });
    });
});
//# sourceMappingURL=tag_expression_parser_test.js.map