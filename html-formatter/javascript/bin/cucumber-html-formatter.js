#!/usr/bin/env node

// a DOM is required to make SSR work on Node, because react-sidenav references document directly
const { JSDOM } = require('jsdom')
const dom = new JSDOM('<html lang="en"><body></body></html>')
global.window = dom.window
global.navigator = dom.window.navigator
global.document = dom.window.document

require('../dist/src/cli-main')
