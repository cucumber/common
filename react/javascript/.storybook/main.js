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
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
    return config
  },
  core: {
    builder: "webpack5",
  },
}
