"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var stream_1 = require("stream");
var assert = require("assert");
var Source = src_1.messages.Source;
var Attachment = src_1.messages.Attachment;
var Envelope = src_1.messages.Envelope;
describe('messages', function () {
    it('can be serialised over a stream', function () { return __awaiter(_this, void 0, void 0, function () {
        var outgoingMessages, out, input, incomingMessages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outgoingMessages = createOutgoingMessages();
                    out = new stream_1.PassThrough();
                    input = out.pipe(new src_1.ProtobufMessageStream(Envelope.decodeDelimited.bind(Envelope)));
                    writeOutgoingMessages(outgoingMessages, out);
                    return [4 /*yield*/, readIncomingMessages(input)];
                case 1:
                    incomingMessages = _a.sent();
                    assert.deepStrictEqual(incomingMessages, outgoingMessages);
                    return [2 /*return*/];
            }
        });
    }); });
    function createOutgoingMessages() {
        return [
            Envelope.create({ source: Source.create({ data: 'Feature: Hello' }) }),
            Envelope.create({
                attachment: Attachment.create({ data: 'Some stack trace' }),
            }),
        ];
    }
    function writeOutgoingMessages(outgoingMessages, output) {
        var e_1, _a;
        try {
            for (var outgoingMessages_1 = __values(outgoingMessages), outgoingMessages_1_1 = outgoingMessages_1.next(); !outgoingMessages_1_1.done; outgoingMessages_1_1 = outgoingMessages_1.next()) {
                var outgoingMessage = outgoingMessages_1_1.value;
                var chunk = Envelope.encodeDelimited(outgoingMessage).finish();
                output.write(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (outgoingMessages_1_1 && !outgoingMessages_1_1.done && (_a = outgoingMessages_1.return)) _a.call(outgoingMessages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        output.end();
    }
    function readIncomingMessages(input) {
        return new Promise(function (resolve, reject) {
            var result = [];
            input.on('data', function (wrapper) { return result.push(wrapper); });
            input.on('end', function () { return resolve(result); });
            input.on('error', function (err) { return reject(err); });
        });
    }
});
//# sourceMappingURL=message_serialization_test.js.map