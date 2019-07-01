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
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var c21e_1 = require("c21e");
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
exports.fromPaths = fromPaths;
function fromSources(sources, options) {
    if (options === void 0) { options = defaultOptions; }
    return new Gherkin([], sources, options).messageStream();
}
exports.fromSources = fromSources;
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
        this.exeFile = new c21e_1.ExeFile(gherkinGoDir + "/gherkin-go-{{.OS}}-{{.Arch}}{{.Ext}}");
    }
    Gherkin.prototype.messageStream = function () {
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
        var protobufMessageStream = new cucumber_messages_1.ProtobufMessageStream(cucumber_messages_1.messages.Envelope.decodeDelimited.bind(cucumber_messages_1.messages.Envelope));
        gherkin.on('error', function (err) {
            protobufMessageStream.emit('error', err);
        });
        gherkin.stdout.pipe(protobufMessageStream);
        try {
            for (var _b = __values(this.sources), _c = _b.next(); !_c.done; _c = _b.next()) {
                var source = _c.value;
                var wrapper = cucumber_messages_1.messages.Envelope.fromObject({ source: source });
                gherkin.stdin.write(cucumber_messages_1.messages.Envelope.encodeDelimited(wrapper).finish());
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