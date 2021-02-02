const path = require('path')

module.exports = {
  entry: './src/main.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  }
};
