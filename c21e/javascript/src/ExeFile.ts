import os from "os";

export default class ExeFile {
  constructor(
    private readonly fileNamePattern: string,
    private readonly props: { os: string; arch: string } = {
      os: os.platform(),
      arch: os.arch()
    }
  ) {}

  get fileName() {
    return this.fileNamePattern
      .replace("{{.OS}}", this.os())
      .replace("{{.Arch}}", this.arch())
      .replace("{{.Ext}}", this.ext());
  }

  private os(): string {
    // https://nodejs.org/dist/latest-v10.x/docs/api/os.html#os_os_platform
    const defaults: { [key: string]: string } = {
      win32: "windows"
    };
    return defaults[this.props.os] || this.props.os;
  }

  private arch() {
    // https://nodejs.org/dist/latest-v10.x/docs/api/process.html#process_process_arch
    const defaults: { [key: string]: string } = {
      mipsel: "mipsle",
      x32: "386",
      x64: "amd64"
    };
    return defaults[this.props.arch] || this.props.arch;
  }

  private ext() {
    return "windows" === this.os() ? ".exe" : "";
  }
}
