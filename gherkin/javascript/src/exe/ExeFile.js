const os = require('os')

module.exports = class ExeFile {
  constructor(
    fileNamePattern,
    props = {
      os: os.platform(),
      arch: os.arch(),
    }
  ) {
    this._filenamePattern = fileNamePattern
    this._props = props
  }

  get fileName() {
    return this._filenamePattern
      .replace('{{.OS}}', this._os())
      .replace('{{.Arch}}', this._arch())
      .replace('{{.Ext}}', this._ext())
  }

  _os() {
    // https://nodejs.org/dist/latest-v10.x/docs/api/os.html#os_os_platform
    return (
      {
        win32: 'windows',
      }[this._props.os] || this._props.os
    )
  }

  _arch() {
    // https://nodejs.org/dist/latest-v10.x/docs/api/process.html#process_process_arch
    return (
      {
        mipsel: 'mipsle',
        x32: '386',
        x64: 'amd64',
      }[this._props.arch] || this._props.arch
    )
  }

  _ext() {
    return 'windows' === this._os() ? '.exe' : ''
  }
}
