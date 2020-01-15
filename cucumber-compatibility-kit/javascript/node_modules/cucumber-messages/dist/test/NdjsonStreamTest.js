"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var assert_1 = __importDefault(require("assert"));
var NdjsonToMessageStream_1 = __importDefault(require("../src/NdjsonToMessageStream"));
var verifyStreamContract_1 = __importDefault(require("./verifyStreamContract"));
describe('NdjsonStream', function () {
    var makeToMessageStream = function () {
        return new NdjsonToMessageStream_1.default(src_1.messages.Envelope.fromObject.bind(src_1.messages.Envelope));
    };
    var makeFromMessageStream = function () { return new src_1.MessageToNdjsonStream(); };
    verifyStreamContract_1.default(makeFromMessageStream, makeToMessageStream);
    it('converts messages to JSON with enums as strings', function (cb) {
        var stream = new src_1.MessageToNdjsonStream();
        stream.on('data', function (json) {
            var ob = JSON.parse(json);
            assert_1.default.deepStrictEqual(ob, {
                testStepFinished: {
                    testResult: {
                        status: 'UNKNOWN',
                    },
                },
            });
            cb();
        });
        stream.write(src_1.messages.Envelope.create({
            testStepFinished: src_1.messages.TestStepFinished.create({
                testResult: src_1.messages.TestResult.create({
                    status: src_1.messages.TestResult.Status.UNKNOWN,
                }),
            }),
        }));
    });
    it('converts messages to JSON with undefined arrays omitted', function (cb) {
        var stream = new src_1.MessageToNdjsonStream();
        stream.on('data', function (json) {
            var ob = JSON.parse(json);
            assert_1.default.deepStrictEqual(ob, { testCase: { pickleId: '123' } });
            cb();
        });
        stream.write(src_1.messages.Envelope.create({
            testCase: src_1.messages.TestCase.create({
                pickleId: '123',
            }),
        }));
    });
    it('converts messages to JSON with undefined strings omitted', function (cb) {
        var stream = new src_1.MessageToNdjsonStream();
        stream.on('data', function (json) {
            var ob = JSON.parse(json);
            assert_1.default.deepStrictEqual(ob, { testCase: {} });
            cb();
        });
        stream.write(src_1.messages.Envelope.create({
            testCase: src_1.messages.TestCase.create({ pickleId: '' }),
        }));
    });
    it('converts messages to JSON with undefined numbers omitted', function (cb) {
        var stream = new src_1.MessageToNdjsonStream();
        stream.on('data', function (json) {
            var ob = JSON.parse(json);
            assert_1.default.deepStrictEqual(ob, {
                gherkinDocument: {
                    feature: {
                        location: {
                            column: 1,
                        },
                    },
                },
            });
            cb();
        });
        stream.write(src_1.messages.Envelope.create({
            gherkinDocument: src_1.messages.GherkinDocument.create({
                feature: src_1.messages.GherkinDocument.Feature.create({
                    location: src_1.messages.Location.create({
                        column: 1,
                    }),
                }),
            }),
        }));
    });
});
//# sourceMappingURL=NdjsonStreamTest.js.map