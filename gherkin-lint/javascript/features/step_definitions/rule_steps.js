module.exports = function () {
  this.Given(/^the (.+) rule is enabled$/, function (ruleName) {
    this.ruleName = ruleName
  })
}
