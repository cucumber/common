const commander = require('commander')

class Options {
  constructor(argv) {
    const args = commander
      .option('-p, --port <n>', 'Port to listen for events on', parseInt)
      .option('-d, --debug', 'Print extra debugging information')
      .parse(argv)

    this.port = args.port
    this.debug = args.debug
  }
}

module.exports = Options
