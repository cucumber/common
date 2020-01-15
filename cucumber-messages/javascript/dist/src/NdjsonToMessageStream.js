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
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
/**
 * Transforms an NDJSON stream to a stream of message objects
 */
var NdjsonToMessageStream = /** @class */ (function (_super) {
    __extends(NdjsonToMessageStream, _super);
    function NdjsonToMessageStream(fromObject) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.fromObject = fromObject;
        return _this;
    }
    NdjsonToMessageStream.prototype._transform = function (chunk, encoding, callback) {
        var e_1, _a;
        if (this.buffer === undefined) {
            this.buffer = '';
        }
        this.buffer += chunk;
        var lines = this.buffer.split('\n');
        this.buffer = lines.pop();
        try {
            for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                var line = lines_1_1.value;
                this.push(this.fromObject(JSON.parse(line)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        callback();
    };
    NdjsonToMessageStream.prototype._flush = function (callback) {
        if (this.buffer) {
            this.push(this.fromObject(JSON.parse(this.buffer)));
        }
        callback();
    };
    return NdjsonToMessageStream;
}(stream_1.Transform));
exports.default = NdjsonToMessageStream;
//# sourceMappingURL=NdjsonToMessageStream.js.map