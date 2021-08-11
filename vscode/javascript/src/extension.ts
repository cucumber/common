// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from 'path'
import vscode from 'vscode'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node'

let client: LanguageClient

const isDebugMode = () => process.env.VSCODE_DEBUG_MODE === 'true'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let serverModule: string
  if (isDebugMode()) {
    serverModule = context.asAbsolutePath(
      path.join('../../language-server/javascript/bin/cucumber-language-server.js')
    )
  } else {
    serverModule = require.resolve('@cucumber/language-server/bin/cucumber-language-server.js')
  }
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'gherkin' }],
  }

  client = new LanguageClient('cucumber', 'Cucumber Language Server', serverOptions, clientOptions)

  const disposeClient = client.start()
  context.subscriptions.push(disposeClient)

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Cucumber extension activated')
}

// this method is called when your extension is deactivated
export function deactivate() {
  // no-op
}
