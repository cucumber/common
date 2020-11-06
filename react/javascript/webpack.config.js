const path = require('path')

module.exports = {
  entry: './test/webpackTest.ts',
  output: {
    // We don't package the output in the npm package - we only run webpack
    // to validate we don't have dependencies that depend on Node.js (which requires polyfills)
    path: path.resolve('./acceptance'),
  },
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
