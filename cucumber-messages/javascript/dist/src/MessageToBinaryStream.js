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
/**
 * Transforms a stream of message objects to binary
 */
var MessageToBinaryStream = /** @class */ (function (_super) {
    __extends(MessageToBinaryStream, _super);
    function MessageToBinaryStream() {
        return _super.call(this, { objectMode: true }) || this;
    }
    MessageToBinaryStream.prototype._transform = function (message, encoding, callback) {
        // @ts-ignore
        var chunk = message.constructor.encodeDelimited(message).finish();
        this.push(chunk);
        callback();
    };
    return MessageToBinaryStream;
}(stream_1.Transform));
exports.default = MessageToBinaryStream;
//# sourceMappingURL=MessageToBinaryStream.js.map