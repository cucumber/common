"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var ExeFile_1 = __importDefault(require("../src/ExeFile"));
describe("ExeFile", function () {
    it("detects macos", function () {
        var exeFile = new ExeFile_1.default("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}", {
            os: "darwin",
            arch: "x64"
        });
        assert_1.default.strictEqual(exeFile.fileName, "gherkin-darwin-amd64");
    });
    it("detects windows", function () {
        var exeFile = new ExeFile_1.default("gherkin-{{.OS}}-{{.Arch}}{{.Ext}}", {
            os: "win32",
            arch: "x32"
        });
        assert_1.default.strictEqual(exeFile.fileName, "gherkin-windows-386.exe");
    });
});
//# sourceMappingURL=ExeFileTest.js.map