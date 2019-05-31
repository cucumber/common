"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var ExeFile = /** @class */ (function () {
    function ExeFile(fileNamePattern, props) {
        if (props === void 0) { props = {
            os: os_1.default.platform(),
            arch: os_1.default.arch()
        }; }
        this.fileNamePattern = fileNamePattern;
        this.props = props;
    }
    Object.defineProperty(ExeFile.prototype, "fileName", {
        get: function () {
            return this.fileNamePattern
                .replace("{{.OS}}", this.os())
                .replace("{{.Arch}}", this.arch())
                .replace("{{.Ext}}", this.ext());
        },
        enumerable: true,
        configurable: true
    });
    ExeFile.prototype.os = function () {
        // https://nodejs.org/dist/latest-v10.x/docs/api/os.html#os_os_platform
        var defaults = {
            win32: "windows"
        };
        return defaults[this.props.os] || this.props.os;
    };
    ExeFile.prototype.arch = function () {
        // https://nodejs.org/dist/latest-v10.x/docs/api/process.html#process_process_arch
        var defaults = {
            mipsel: "mipsle",
            x32: "386",
            x64: "amd64"
        };
        return defaults[this.props.arch] || this.props.arch;
    };
    ExeFile.prototype.ext = function () {
        return "windows" === this.os() ? ".exe" : "";
    };
    return ExeFile;
}());
exports.default = ExeFile;
//# sourceMappingURL=ExeFile.js.map