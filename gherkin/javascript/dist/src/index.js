"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var c21e_1 = __importDefault(require("c21e"));
var cucumber_messages_1 = require("cucumber-messages");
var defaultOptions = {
    includeSource: true,
    includeGherkinDocument: true,
    includePickles: true,
};
function fromPaths(paths, options) {
    if (options === void 0) { options = defaultOptions; }
    return new Gherkin(paths, [], options).messageStream();
}
function fromSources(sources, options) {
    if (options === void 0) { options = defaultOptions; }
    return new Gherkin([], sources, options).messageStream();
}
function fromSourcesWasm() {
    return __awaiter(this, void 0, void 0, function () {
        var gherkin;
        return __generator(this, function (_a) {
            gherkin = new Gherkin([], [], {
                includeGherkinDocument: true,
                includePickles: true,
                includeSource: true,
            });
            return [2 /*return*/, gherkin.wasmMessageStream()];
        });
    });
}
exports.default = { fromPaths: fromPaths, fromSources: fromSources, fromSourcesWasm: fromSourcesWasm };
var Gherkin = /** @class */ (function () {
    function Gherkin(paths, sources, options) {
        this.paths = paths;
        this.sources = sources;
        this.options = options;
        this.options = __assign({}, defaultOptions, options);
        var gherkinGoDir = __dirname + "/../../gherkin-go";
        try {
            fs_1.statSync(gherkinGoDir);
        }
        catch (err) {
            // Dev mode - we're in src, not dist/src
            gherkinGoDir = __dirname + "/../gherkin-go";
        }
        this.exeFile = new c21e_1.default(gherkinGoDir + "/gherkin-go-{{.OS}}-{{.Arch}}{{.Ext}}");
    }
    Gherkin.prototype.messageStream = function () {
        return this.exeMessageStream();
    };
    Gherkin.prototype.wasmMessageStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fs, importObject, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = require('fs');
                        importObject = { foo: 'bar' };
                        return [4 /*yield*/, WebAssembly.instantiate(fs.readFileSync(__dirname + '/gherkin.wasm'), importObject)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Gherkin.prototype.exeMessageStream = function () {
        var e_1, _a;
        var options = [];
        if (!this.options.includeSource) {
            options.push('--no-source');
        }
        if (!this.options.includeGherkinDocument) {
            options.push('--no-ast');
        }
        if (!this.options.includePickles) {
            options.push('--no-pickles');
        }
        var args = options.concat(this.paths);
        var gherkin = child_process_1.spawn(this.exeFile.fileName, args);
        var protobufMessageStream = new cucumber_messages_1.ProtobufMessageStream(cucumber_messages_1.messages.Wrapper.decodeDelimited.bind(cucumber_messages_1.messages.Wrapper));
        gherkin.on('error', function (err) {
            protobufMessageStream.emit('error', err);
        });
        gherkin.stdout.pipe(protobufMessageStream);
        try {
            for (var _b = __values(this.sources), _c = _b.next(); !_c.done; _c = _b.next()) {
                var source = _c.value;
                var wrapper = cucumber_messages_1.messages.Wrapper.fromObject({ source: source });
                gherkin.stdin.write(cucumber_messages_1.messages.Wrapper.encodeDelimited(wrapper).finish());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        gherkin.stdin.end();
        return protobufMessageStream;
    };
    return Gherkin;
}());
//# sourceMappingURL=index.js.map