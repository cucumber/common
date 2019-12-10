module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
    ],
  })
  config.module.rules.push({
    test: /\.ndjson$/,
    use: [
      {
        loader: require.resolve('raw-loader'),
      },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
