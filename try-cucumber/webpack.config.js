const path = require('path')

module.exports = {
  entry: './lib/try_cucumber.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'try_cucumber.bundle.js'
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
}
