const path = require('path')

module.exports = {
  entry: './src/main.tsx',
  module: {
    rules: [
      {test: /\.tsx?$/, use: 'ts-loader'}
    ]
  },
  resolve: {
    fallback: {
      stream: false,
      path: false
    },
    alias: {
      react: path.resolve('./node_modules/react')
    }
  }
};
