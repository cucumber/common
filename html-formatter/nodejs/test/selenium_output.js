const webdriver = require('selenium-webdriver')

class SeleniumOutput {
  constructor(port) {
    this._port = port
    this._browser = new webdriver.Builder()
      .forBrowser(process.env.cucumber_html_formatter_selenium_browser || 'firefox')
      .build()
  }

  getFeatureNames() {
    return this._browser.get(`http://localhost:${this._port}`)
      .then(() => ['JALLA'])
  }
}

module.exports = SeleniumOutput
