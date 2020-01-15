module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts',
      'dist/**/*.js'
    ],
    tests: [
      'test/**/*.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.+(js|ts)': wallaby.compilers.typeScript({allowJs: true, outDir: './bin'})
    },
    preprocessors: {
      '**/*.jsts': file => file.changeExt('js').content
    },
    testFramework: 'jest',
    debug: true
  }
}
