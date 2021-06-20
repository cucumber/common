const hook = require('css-modules-require-hook');
const sass = require('sass');
const path = require('path');

hook({
  extensions: ['.scss'],
  preprocessCss(css, filePath) {
    return sass.renderSync({
      data: css,
      includePaths: [ path.resolve(filePath, '..') ]
    }).css
  },
  generateScopedName: '[local]__generated',
});