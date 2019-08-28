const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    minimize: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
}
