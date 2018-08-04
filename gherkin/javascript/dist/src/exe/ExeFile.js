const os = require('os');

module.exports = class ExeFile {
  constructor(fileNamePattern, props = {
    os: os.platform(),
    arch: os.arch()
  }) {
    this._filenamePattern = fileNamePattern;
    this._props = props;
  }

  get fileName() {
    return this._filenamePattern.replace('{{.OS}}', this._os()).replace('{{.Arch}}', this._arch()).replace('{{.Ext}}', this._ext());
  }

  _os() {
    // TODO: Support all of these: https://nodejs.org/dist/latest-v10.x/docs/api/os.html#os_os_platform
    const value = this._normalize(this._props.os);
    if (value.startsWith('darwin')) {
      return 'darwin';
    }
    return 'unknown';
  }

  _arch() {
    // TODO: Support all of these: https://nodejs.org/dist/latest-v10.x/docs/api/process.html#process_process_arch
    const value = this._normalize(this._props.arch);
    if (value.match(/^(x8664|amd64|ia32e|em64t|x64)$/)) {
      return 'amd64';
    }
    return 'unknown';
  }

  _ext() {
    return 'windows' === this._os() ? '.exe' : '';
  }

  _normalize(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
  }
};