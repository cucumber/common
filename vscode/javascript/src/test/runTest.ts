import path from 'path'

import { runTests } from 'vscode-test'

async function main() {
  if (process.env['CI']) {
    // https://app.circleci.com/pipelines/github/cucumber/common/7908/workflows/10de1a58-5b66-4834-8a5e-e9ac11748e43/jobs/311298
    console.error('Skipping test of vscode plugin in CI')
    return
  }

  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../')

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index')

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath })
  } catch (err) {
    console.error('Failed to run tests')
    process.exit(1)
  }
}

main()
