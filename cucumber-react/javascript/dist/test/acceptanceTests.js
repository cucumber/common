"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var cucumber_messages_1 = require("cucumber-messages");
var gherkin_1 = __importDefault(require("gherkin"));
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var GherkinDocumentList_1 = __importDefault(require("../src/components/app/GherkinDocumentList"));
var cucumber_query_1 = __importDefault(require("cucumber-query"));
var SupportCode_1 = __importDefault(require("fake-cucumber/dist/src/SupportCode"));
var makeDummyStepDefinitions_1 = __importDefault(require("fake-cucumber/dist/test/makeDummyStepDefinitions"));
var makeDummyHooks_1 = __importDefault(require("fake-cucumber/dist/test/makeDummyHooks"));
var CucumberStream_1 = __importDefault(require("fake-cucumber/dist/src/CucumberStream"));
describe('App', function () {
    var e_1, _a;
    var dir = __dirname + '/../../../gherkin/testdata/good';
    var files = fs_1.default.readdirSync(dir);
    var newId = cucumber_messages_1.IdGenerator.uuid();
    var supportCode = new SupportCode_1.default(newId);
    makeDummyStepDefinitions_1.default(supportCode);
    makeDummyHooks_1.default(supportCode);
    var _loop_1 = function (file) {
        if (file.match(/\.feature$/)) {
            it("can render " + file, function () { return __awaiter(void 0, void 0, void 0, function () {
                var JSDOM, dom, document, p, envelopes, gherkinDocuments, cucumberQuery, app;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            JSDOM = require('jsdom').JSDOM;
                            dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>');
                            // @ts-ignore
                            global.window = dom.window;
                            document = dom.window.document;
                            p = path_1.default.join(dir, file);
                            return [4 /*yield*/, streamToArray(gherkin_1.default
                                    .fromPaths([p], { newId: cucumber_messages_1.IdGenerator.incrementing() })
                                    .pipe(new CucumberStream_1.default(supportCode.stepDefinitions, supportCode.hooks, newId)))];
                        case 1:
                            envelopes = _a.sent();
                            gherkinDocuments = envelopes.filter(function (e) { return e.gherkinDocument; }).map(function (e) { return e.gherkinDocument; });
                            cucumberQuery = envelopes.reduce(function (q, e) { return q.update(e); }, new cucumber_query_1.default());
                            app = react_1.default.createElement(GherkinDocumentList_1.default, { gherkinDocuments: gherkinDocuments, cucumberQuery: cucumberQuery });
                            react_dom_1.default.render(app, document.getElementById('content'));
                            return [2 /*return*/];
                    }
                });
            }); }).timeout(7000); // TODO: What the hell is taking so long??
        }
    };
    try {
        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
            var file = files_1_1.value;
            _loop_1(file);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
function streamToArray(readableStream) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var items = [];
                    readableStream.on('data', items.push.bind(items));
                    readableStream.on('error', function (err) { return reject(err); });
                    readableStream.on('end', function () { return resolve(items); });
                })];
        });
    });
}
//# sourceMappingURL=acceptanceTests.js.map