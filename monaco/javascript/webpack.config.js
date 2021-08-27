const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './example/index.js',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, 'example'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript', 'css']
    })
  ]
}
