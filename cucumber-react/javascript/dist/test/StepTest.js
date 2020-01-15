"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = __importDefault(require("react-dom"));
var react_1 = __importDefault(require("react"));
var Step_1 = __importDefault(require("../src/components/gherkin/Step"));
var cucumber_messages_1 = require("cucumber-messages");
var assert = __importStar(require("assert"));
var cucumber_query_1 = __importDefault(require("cucumber-query"));
var CucumberQueryContext_1 = __importDefault(require("../src/CucumberQueryContext"));
describe('Step', function () {
    it('renders', function () {
        var JSDOM = require('jsdom').JSDOM;
        var dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>');
        // @ts-ignore
        global.window = dom.window;
        // global.navigator = dom.window.navigator
        var document = dom.window.document;
        var step = new cucumber_messages_1.messages.GherkinDocument.Feature.Step({
            keyword: 'Given',
            text: 'the 48 pixies',
            location: new cucumber_messages_1.messages.Location({ column: 1, line: 1 }),
        });
        var StubCucumberQuery = /** @class */ (function (_super) {
            __extends(StubCucumberQuery, _super);
            function StubCucumberQuery() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StubCucumberQuery.prototype.getStepMatchArguments = function (uri, lineNumber) {
                return [
                    new cucumber_messages_1.messages.StepMatchArgument({
                        group: new cucumber_messages_1.messages.StepMatchArgument.Group({
                            start: 4,
                            value: '48',
                            children: [],
                        }),
                    }),
                ];
            };
            return StubCucumberQuery;
        }(cucumber_query_1.default));
        var app = react_1.default.createElement(CucumberQueryContext_1.default.Provider, { value: new StubCucumberQuery() },
            react_1.default.createElement(Step_1.default, { step: step }));
        react_dom_1.default.render(app, document.getElementById('content'));
        assert.strictEqual(document.querySelector('#content h3 > span:nth-child(2)').innerHTML, 'the ');
        assert.strictEqual(document.querySelector('#content h3 > span:nth-child(3)').innerHTML, '48');
        assert.strictEqual(document.querySelector('#content h3 > span:nth-child(4)').innerHTML, ' pixies');
    });
});
//# sourceMappingURL=StepTest.js.map