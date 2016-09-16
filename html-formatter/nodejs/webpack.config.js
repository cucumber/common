module.exports = {
  entry: './lib/react/html_formatter_app.jsx',
  output: {
    path: './public',
    filename: 'html_formatter_app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
