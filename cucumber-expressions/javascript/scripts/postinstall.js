var path = require('path')
var fs = require('fs')
var exec = require('child_process').exec

fs.exists(path.join(__dirname, '..', 'dist'), function(distExists, err) {
  if (err) throw err
  if (!distExists) {
    exec('npm run build', { cwd: path.join(__dirname, '..') }, function(err) {
      if (err) throw err
    })
  }
})
