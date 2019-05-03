"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var parameter_type_1 = __importDefault(require("../src/parameter_type"));
var combinatorial_generated_expression_factory_1 = __importDefault(require("../src/combinatorial_generated_expression_factory"));
describe("CucumberExpressionGenerator", function () {
    it("generates multiple expressions", function () {
        var parameterTypeCombinations = [
            [
                new parameter_type_1.default("color", /red|blue|yellow/, null, function (s) { return s; }, false, true),
                new parameter_type_1.default("csscolor", /red|blue|yellow/, null, function (s) { return s; }, false, true)
            ],
            [
                new parameter_type_1.default("date", /\d{4}-\d{2}-\d{2}/, null, function (s) { return s; }, false, true),
                new parameter_type_1.default("datetime", /\d{4}-\d{2}-\d{2}/, null, function (s) { return s; }, false, true),
                new parameter_type_1.default("timestamp", /\d{4}-\d{2}-\d{2}/, null, function (s) { return s; }, false, true)
            ]
        ];
        var factory = new combinatorial_generated_expression_factory_1.default("I bought a {%s} ball on {%s}", parameterTypeCombinations);
        var expressions = factory.generateExpressions().map(function (ge) { return ge.source; });
        assert_1.default.deepStrictEqual(expressions, [
            "I bought a {color} ball on {date}",
            "I bought a {color} ball on {datetime}",
            "I bought a {color} ball on {timestamp}",
            "I bought a {csscolor} ball on {date}",
            "I bought a {csscolor} ball on {datetime}",
            "I bought a {csscolor} ball on {timestamp}"
        ]);
    });
});
//# sourceMappingURL=combinatorial_generated_expression_factory_test.js.map