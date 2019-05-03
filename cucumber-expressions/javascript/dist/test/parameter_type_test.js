"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_throws_1 = __importDefault(require("./assert_throws"));
var parameter_type_1 = __importDefault(require("../src/parameter_type"));
describe("ParameterType", function () {
    it("does not allow ignore flag on regexp", function () {
        assert_throws_1.default(function () {
            return new parameter_type_1.default("case-insensitive", /[a-z]+/i, String, function (s) { return s; }, true, true);
        }, "ParameterType Regexps can't use flag 'i'");
    });
});
//# sourceMappingURL=parameter_type_test.js.map