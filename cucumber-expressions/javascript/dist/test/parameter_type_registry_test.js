"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var parameter_type_registry_1 = __importDefault(require("../src/parameter_type_registry"));
var parameter_type_1 = __importDefault(require("../src/parameter_type"));
var Name = /** @class */ (function () {
    function Name(name) {
        this.name = name;
    }
    return Name;
}());
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Place = /** @class */ (function () {
    function Place(name) {
        this.name = name;
    }
    return Place;
}());
var CAPITALISED_WORD = /[A-Z]+\w+/;
describe("ParameterTypeRegistry", function () {
    var registry;
    beforeEach(function () {
        registry = new parameter_type_registry_1.default();
    });
    it("does not allow more than one preferential parameter type for each regexp", function () {
        registry.defineParameterType(new parameter_type_1.default("name", CAPITALISED_WORD, Name, function (s) { return new Name(s); }, true, true));
        registry.defineParameterType(new parameter_type_1.default("person", CAPITALISED_WORD, Person, function (s) { return new Person(s); }, true, false));
        try {
            registry.defineParameterType(new parameter_type_1.default("place", CAPITALISED_WORD, Place, function (s) { return new Place(s); }, true, true));
            throw new Error("Should have failed");
        }
        catch (err) {
            assert_1.default.strictEqual(err.message, "There can only be one preferential parameter type per regexp. The regexp " + CAPITALISED_WORD + " is used for two preferential parameter types, {name} and {place}");
        }
    });
    it("looks up preferential parameter type by regexp", function () {
        var name = new parameter_type_1.default("name", /[A-Z]+\w+/, null, function (s) { return new Name(s); }, true, false);
        var person = new parameter_type_1.default("person", /[A-Z]+\w+/, null, function (s) { return new Person(s); }, true, true);
        var place = new parameter_type_1.default("place", /[A-Z]+\w+/, null, function (s) { return new Place(s); }, true, false);
        registry.defineParameterType(name);
        registry.defineParameterType(person);
        registry.defineParameterType(place);
        assert_1.default.strictEqual(registry.lookupByRegexp("[A-Z]+\\w+", /([A-Z]+\w+) and ([A-Z]+\w+)/, "Lisa and Bob"), person);
    });
});
//# sourceMappingURL=parameter_type_registry_test.js.map