// a DOM is required to make SSR work, because react-sidenav references document directly
const { JSDOM } = require('jsdom')
const dom = new JSDOM('<html><body></body></html>')
global.window = dom.window
global.navigator = dom.window.navigator
global.document = dom.window.document

require('../dist/src/html-formatter/cli-main')
