var path = require('path')
var fs = require('fs')
var exec = require('child_process').exec

fs.access(path.join(__dirname, '..', 'dist'), function(err) {
  if (!err) return
  exec('yarn build', { cwd: path.join(__dirname, '..') }, function(err) {
    if (err) throw err
  })
})
