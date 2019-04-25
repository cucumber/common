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
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var protobufjs_1 = require("protobufjs");
var ProtobufMessageStream = (function (_super) {
    __extends(ProtobufMessageStream, _super);
    function ProtobufMessageStream(decodeDelimited) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.decodeDelimited = decodeDelimited;
        _this.buffer = Buffer.alloc(0);
        return _this;
    }
    ProtobufMessageStream.prototype._transform = function (chunk, encoding, callback) {
        this.buffer = Buffer.concat([this.buffer, chunk]);
        while (true) {
            try {
                var reader = protobufjs_1.Reader.create(this.buffer);
                var message = this.decodeDelimited(reader);
                this.push(message);
                this.buffer = this.buffer.slice(reader.pos);
            }
            catch (err) {
                break;
            }
        }
        callback();
    };
    return ProtobufMessageStream;
}(stream_1.Transform));
exports.default = ProtobufMessageStream;
//# sourceMappingURL=ProtobufMessageStream.js.map