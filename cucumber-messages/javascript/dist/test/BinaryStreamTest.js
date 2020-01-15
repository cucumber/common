"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var verifyStreamContract_1 = __importDefault(require("./verifyStreamContract"));
describe('BinaryStream', function () {
    var makeToMessageStream = function () {
        return new src_1.BinaryToMessageStream(src_1.messages.Envelope.decodeDelimited.bind(src_1.messages.Envelope));
    };
    var makeFromMessageStream = function () { return new src_1.MessageToBinaryStream(); };
    verifyStreamContract_1.default(makeFromMessageStream, makeToMessageStream);
});
//# sourceMappingURL=BinaryStreamTest.js.map