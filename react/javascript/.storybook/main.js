module.exports = {
  "stories": [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links"
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.fallback = { "assert": false }
    config.resolve.fallback = { "path": require.resolve('path-browserify') }
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true
            }
          }
        },
        'sass-loader'
      ],
    })
    return config
  },
  core: {
    builder: "webpack5",
  },
}
