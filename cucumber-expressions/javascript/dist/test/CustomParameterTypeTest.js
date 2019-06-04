'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var assert_throws_1 = __importDefault(require("./assert_throws"));
var CucumberExpression_1 = __importDefault(require("../src/CucumberExpression"));
var RegularExpression_1 = __importDefault(require("../src/RegularExpression"));
var ParameterTypeRegistry_1 = __importDefault(require("../src/ParameterTypeRegistry"));
var ParameterType_1 = __importDefault(require("../src/ParameterType"));
var Color = /** @class */ (function () {
    /// [color-constructor]
    function Color(name) {
        this.name = name;
    }
    return Color;
}());
var CssColor = /** @class */ (function () {
    function CssColor(name) {
        this.name = name;
    }
    return CssColor;
}());
describe('Custom parameter type', function () {
    var parameterTypeRegistry;
    beforeEach(function () {
        parameterTypeRegistry = new ParameterTypeRegistry_1.default();
        /* eslint-disable prettier/prettier */
        /// [add-color-parameter-type]
        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('color', // name
        /red|blue|yellow/, // regexp
        Color, // type
        function (// type
        s) { return new Color(s); }, // transformer
        false, // useForSnippets
        true // preferForRegexpMatch
        ));
        /// [add-color-parameter-type]
        /* eslint-enable prettier/prettier */
    });
    describe('CucumberExpression', function () {
        it('throws exception for illegal character in parameter name', function () {
            assert_throws_1.default(function () { return new ParameterType_1.default('[string]', /.*/, String, function (s) { return s; }, false, true); }, "Illegal character '[' in parameter name {[string]}");
        });
        it('matches parameters with custom parameter type', function () {
            var expression = new CucumberExpression_1.default('I have a {color} ball', parameterTypeRegistry);
            var value = expression.match('I have a red ball')[0].getValue(null);
            assert_1.default.strictEqual(value.name, 'red');
        });
        it('matches parameters with multiple capture groups', function () {
            var Coordinate = /** @class */ (function () {
                function Coordinate(x, y, z) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
                return Coordinate;
            }());
            parameterTypeRegistry.defineParameterType(new ParameterType_1.default('coordinate', /(\d+),\s*(\d+),\s*(\d+)/, Coordinate, function (x, y, z) {
                return new Coordinate(Number(x), Number(y), Number(z));
            }, true, true));
            var expression = new CucumberExpression_1.default('A {int} thick line from {coordinate} to {coordinate}', parameterTypeRegistry);
            var args = expression.match('A 5 thick line from 10,20,30 to 40,50,60');
            var thick = args[0].getValue(null);
            assert_1.default.strictEqual(thick, 5);
            var from = args[1].getValue(null);
            assert_1.default.strictEqual(from.x, 10);
            assert_1.default.strictEqual(from.y, 20);
            assert_1.default.strictEqual(from.z, 30);
            var to = args[2].getValue(null);
            assert_1.default.strictEqual(to.x, 40);
            assert_1.default.strictEqual(to.y, 50);
            assert_1.default.strictEqual(to.z, 60);
        });
        it('matches parameters with custom parameter type using optional capture group', function () {
            parameterTypeRegistry = new ParameterTypeRegistry_1.default();
            parameterTypeRegistry.defineParameterType(new ParameterType_1.default('color', [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/], Color, function (s) { return new Color(s); }, false, true));
            var expression = new CucumberExpression_1.default('I have a {color} ball', parameterTypeRegistry);
            var value = expression.match('I have a dark red ball')[0].getValue(null);
            assert_1.default.strictEqual(value.name, 'dark red');
        });
        it('defers transformation until queried from argument', function () {
            parameterTypeRegistry.defineParameterType(new ParameterType_1.default('throwing', /bad/, null, function (s) {
                throw new Error("Can't transform [" + s + "]");
            }, false, true));
            var expression = new CucumberExpression_1.default('I have a {throwing} parameter', parameterTypeRegistry);
            var args = expression.match('I have a bad parameter');
            assert_throws_1.default(function () { return args[0].getValue(null); }, "Can't transform [bad]");
        });
        describe('conflicting parameter type', function () {
            it('is detected for type name', function () {
                assert_throws_1.default(function () {
                    return parameterTypeRegistry.defineParameterType(new ParameterType_1.default('color', /.*/, CssColor, function (s) { return new CssColor(s); }, false, true));
                }, 'There is already a parameter type with name color');
            });
            it('is not detected for type', function () {
                parameterTypeRegistry.defineParameterType(new ParameterType_1.default('whatever', /.*/, Color, function (s) { return new Color(s); }, false, false));
            });
            it('is not detected for regexp', function () {
                parameterTypeRegistry.defineParameterType(new ParameterType_1.default('css-color', /red|blue|yellow/, CssColor, function (s) { return new CssColor(s); }, true, false));
                assert_1.default.strictEqual(new CucumberExpression_1.default('I have a {css-color} ball', parameterTypeRegistry)
                    .match('I have a blue ball')[0]
                    .getValue(null).constructor, CssColor);
                assert_1.default.strictEqual(new CucumberExpression_1.default('I have a {css-color} ball', parameterTypeRegistry)
                    .match('I have a blue ball')[0]
                    .getValue(null).name, 'blue');
                assert_1.default.strictEqual(new CucumberExpression_1.default('I have a {color} ball', parameterTypeRegistry)
                    .match('I have a blue ball')[0]
                    .getValue(null).constructor, Color);
                assert_1.default.strictEqual(new CucumberExpression_1.default('I have a {color} ball', parameterTypeRegistry)
                    .match('I have a blue ball')[0]
                    .getValue(null).name, 'blue');
            });
        });
        // JavaScript-specific
        it('creates arguments using async transform', function () { return __awaiter(_this, void 0, void 0, function () {
            var expression, args, value;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameterTypeRegistry = new ParameterTypeRegistry_1.default();
                        /// [add-async-parameter-type]
                        parameterTypeRegistry.defineParameterType(new ParameterType_1.default('asyncColor', /red|blue|yellow/, Color, function (s) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, new Color(s)];
                        }); }); }, false, true));
                        expression = new CucumberExpression_1.default('I have a {asyncColor} ball', parameterTypeRegistry);
                        return [4 /*yield*/, expression.match('I have a red ball')];
                    case 1:
                        args = _a.sent();
                        return [4 /*yield*/, args[0].getValue(null)];
                    case 2:
                        value = _a.sent();
                        assert_1.default.strictEqual(value.name, 'red');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('RegularExpression', function () {
        it('matches arguments with custom parameter type', function () {
            var expression = new RegularExpression_1.default(/I have a (red|blue|yellow) ball/, parameterTypeRegistry);
            var value = expression.match('I have a red ball')[0].getValue(null);
            assert_1.default.strictEqual(value.constructor, Color);
            assert_1.default.strictEqual(value.name, 'red');
        });
    });
});
//# sourceMappingURL=CustomParameterTypeTest.js.map