"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var TreeRegexp_1 = __importDefault(require("../src/TreeRegexp"));
describe("TreeRegexp", function () {
    it("exposes group source", function () {
        var tr = new TreeRegexp_1.default(/(a(?:b)?)(c)/);
        assert_1.default.deepStrictEqual(tr.groupBuilder.children.map(function (gb) { return gb.source; }), [
            "a(?:b)?",
            "c"
        ]);
    });
    it("builds tree", function () {
        var tr = new TreeRegexp_1.default(/(a(?:b)?)(c)/);
        var group = tr.match("ac");
        assert_1.default.strictEqual(group.value, "ac");
        assert_1.default.strictEqual(group.children[0].value, "a");
        assert_1.default.deepStrictEqual(group.children[0].children, []);
        assert_1.default.strictEqual(group.children[1].value, "c");
    });
    it("ignores non-capturing groups", function () {
        var tr = new TreeRegexp_1.default(/(a(?:b)?)(c)/);
        var group = tr.match("ac");
        assert_1.default.strictEqual(group.value, "ac");
        assert_1.default.strictEqual(group.children[0].value, "a");
        assert_1.default.deepStrictEqual(group.children[0].children, []);
        assert_1.default.strictEqual(group.children[1].value, "c");
    });
    it("matches optional group", function () {
        var tr = new TreeRegexp_1.default(/^Something( with an optional argument)?/);
        var group = tr.match("Something");
        assert_1.default.strictEqual(group.children[0].value, null);
    });
    it("matches nested groups", function () {
        var tr = new TreeRegexp_1.default(/^A (\d+) thick line from ((\d+),\s*(\d+),\s*(\d+)) to ((\d+),\s*(\d+),\s*(\d+))/);
        var group = tr.match("A 5 thick line from 10,20,30 to 40,50,60");
        assert_1.default.strictEqual(group.children[0].value, "5");
        assert_1.default.strictEqual(group.children[1].value, "10,20,30");
        assert_1.default.strictEqual(group.children[1].children[0].value, "10");
        assert_1.default.strictEqual(group.children[1].children[1].value, "20");
        assert_1.default.strictEqual(group.children[1].children[2].value, "30");
        assert_1.default.strictEqual(group.children[2].value, "40,50,60");
        assert_1.default.strictEqual(group.children[2].children[0].value, "40");
        assert_1.default.strictEqual(group.children[2].children[1].value, "50");
        assert_1.default.strictEqual(group.children[2].children[2].value, "60");
    });
    it("detects multiple non capturing groups", function () {
        var tr = new TreeRegexp_1.default(/(?:a)(:b)(\?c)(d)/);
        var group = tr.match("a:b?cd");
        assert_1.default.strictEqual(group.children.length, 3);
    });
    it("works with escaped backslash", function () {
        var tr = new TreeRegexp_1.default(/foo\\(bar|baz)/);
        var group = tr.match("foo\\bar");
        assert_1.default.strictEqual(group.children.length, 1);
    });
    it("works with escaped slash", function () {
        var tr = new TreeRegexp_1.default(/^I go to '\/(.+)'$/);
        var group = tr.match("I go to '/hello'");
        assert_1.default.strictEqual(group.children.length, 1);
    });
    it("works with digit and word", function () {
        var tr = new TreeRegexp_1.default(/^(\d) (\w+)$/);
        var group = tr.match("2 you");
        assert_1.default.strictEqual(group.children.length, 2);
    });
    it("captures non capturing groups with capturing groups inside", function () {
        var tr = new TreeRegexp_1.default('the stdout(?: from "(.*?)")?');
        var group = tr.match("the stdout");
        assert_1.default.strictEqual(group.value, "the stdout");
        assert_1.default.strictEqual(group.children[0].value, null);
        assert_1.default.strictEqual(group.children.length, 1);
    });
    it("works with flags", function () {
        var tr = new TreeRegexp_1.default(/HELLO/i);
        var group = tr.match("hello");
        assert_1.default.strictEqual(group.value, "hello");
    });
    it("does not consider parenthesis in character class as group", function () {
        var tr = new TreeRegexp_1.default(/^drawings: ([A-Z, ()]+)$/);
        var group = tr.match("drawings: ONE(TWO)");
        assert_1.default.strictEqual(group.value, "drawings: ONE(TWO)");
        assert_1.default.strictEqual(group.children.length, 1);
        assert_1.default.strictEqual(group.children[0].value, "ONE(TWO)");
    });
});
//# sourceMappingURL=TreeRegexpTest.js.map