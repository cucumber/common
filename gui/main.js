const net = require('net')
const readline = require('readline')

const { app, BrowserWindow } = require('electron')
app.commandLine.appendSwitch('--disable-http-cache')

require('electron-reload')(
  `${__dirname}/renderer`,
  { electron: `${__dirname}/node_modules/.bin/electron` }
)

const Options = require('./cli/options')
const options = new Options(process.argv)

let server

app.on('ready', () => {
  server = net.createServer((socket) => {
    let win = new BrowserWindow({ height: 800, width: 900 })
    const indexPath = `file://${__dirname}/renderer/index.html`
    win.loadURL(indexPath)

    win.on('closed', () => { win = null })

    win.webContents.on('did-finish-load', () => {
      const socketSession = readline.createInterface({ input: socket })

      socketSession.on('line', (line) => {
        const message = JSON.parse(line)
        if (options.debug) console.log(JSON.stringify(message, null, 2))
        win.webContents.send(message['type'], message)
      })

      socketSession.on('close', () => win.webContents.send('end'))
    })
  })

  server.listen(options.port || 0, () => {
    console.log('Cucumber GUI listening for events on port ' + server.address().port)
  })
})