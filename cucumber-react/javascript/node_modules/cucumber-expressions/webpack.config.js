const path = require('path')

module.exports = {
  entry: './src/web.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'web.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
