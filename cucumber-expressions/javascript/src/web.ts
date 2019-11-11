import CucumberExpressions from './index'

declare var define: { (fn: () => void): () => void; amd: boolean }
;(function(GLOBAL: any) {
  if (typeof define === 'function' && define.amd) {
    define(() => CucumberExpressions)

    // Node and other CommonJS-like environments that support module.exports.
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = CucumberExpressions

    // Browser.
  } else {
    GLOBAL.CucumberExpressions = CucumberExpressions
  }
})(this)
