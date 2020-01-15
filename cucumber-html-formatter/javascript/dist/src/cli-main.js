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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var cucumber_messages_1 = require("cucumber-messages");
var react_1 = __importDefault(require("react"));
var commander_1 = __importDefault(require("commander"));
var package_json_1 = __importDefault(require("../package.json"));
var stream_1 = require("stream");
var cucumber_react_1 = require("cucumber-react");
var server_1 = require("react-dom/server");
var cucumber_query_1 = __importDefault(require("cucumber-query"));
var CucumberHtmlStream = /** @class */ (function (_super) {
    __extends(CucumberHtmlStream, _super);
    function CucumberHtmlStream() {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.envelopes = [];
        return _this;
    }
    CucumberHtmlStream.prototype._transform = function (envelope, encoding, callback) {
        this.envelopes.push(envelope);
        callback();
    };
    CucumberHtmlStream.prototype._flush = function (callback) {
        var _this = this;
        fs_1.readFile(__dirname + '/../main.js', function (err, js) {
            if (err) {
                return callback(err);
            }
            var gherkinDocuments = _this.envelopes
                .filter(function (e) { return e.gherkinDocument; })
                .map(function (e) { return e.gherkinDocument; });
            var cucumberQuery = _this.envelopes.reduce(function (q, e) { return q.update(e); }, new cucumber_query_1.default());
            _this.push("<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <title>Cucumber</title>\n    <meta content=\"text/html;charset=utf-8\" http-equiv=\"Content-Type\">\n  </head>\n  <body>\n    <div id=\"content\">\n");
            _this.push(server_1.renderToString(react_1.default.createElement(cucumber_react_1.GherkinDocumentList, { gherkinDocuments: gherkinDocuments, cucumberQuery: cucumberQuery })));
            _this.push("\n    </div>\n    <script>\n      window.CUCUMBER_MESSAGES = " + JSON.stringify(_this.envelopes) + "\n    </script>\n    <script>\n" + js.toString('utf8') + "\n    </script>\n  </body>\n</html>\n");
            callback();
        });
    };
    return CucumberHtmlStream;
}(stream_1.Transform));
commander_1.default.version(package_json_1.default.version);
commander_1.default.option('-f, --format <format>', 'output format: ndjson|protobuf', 'protobuf');
commander_1.default.parse(process.argv);
var toMessageStream = commander_1.default.format === 'ndjson'
    ? new cucumber_messages_1.NdjsonToMessageStream(cucumber_messages_1.messages.Envelope.fromObject.bind(cucumber_messages_1.messages.Envelope))
    : new cucumber_messages_1.BinaryToMessageStream(cucumber_messages_1.messages.Envelope.decodeDelimited.bind(cucumber_messages_1.messages.Envelope));
stream_1.pipeline(process.stdin, toMessageStream, new CucumberHtmlStream(), process.stdout, function (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=cli-main.js.map