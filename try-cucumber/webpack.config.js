module.exports = {
  entry: './lib/try_cucumber.js',
  output: {
    path: './public',
    filename: 'try_cucumber.bundle.js'
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
}
