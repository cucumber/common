const { JSDOM } = require('jsdom')
const dom = new JSDOM('<html><body></body></html>')
global.window = dom.window
global.navigator = dom.window.navigator
global.document = dom.window.document

require('../dist/src/html-formatter/main')
