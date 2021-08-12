import {
  CompletionItem,
  createConnection,
  DidChangeConfigurationNotification,
  InitializeParams,
  InitializeResult,
  ProposedFeatures,
  SemanticTokensParams,
  TextDocumentPositionParams,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

import { TextDocument } from 'vscode-languageserver-textdocument'
import { fuseIndex, Index, jsSearchIndex } from '@cucumber/suggest'
import {
  getGherkinCompletionItems,
  getGherkinDiagnostics,
  getGherkinSemanticTokens,
  semanticTokenModifiers,
  semanticTokenTypes
} from './lsp'
import makeCucumberInfo from './makeCucumberInfo'
import { Expression } from '@cucumber/cucumber-expressions'

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all)

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

let expressions: readonly Expression[] = []
let index: Index = fuseIndex([])
updateCucumberInfo()

let hasConfigurationCapability = false
let hasWorkspaceFolderCapability = false
let hasDiagnosticRelatedInformationCapability = false

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities

  // Does the client support the `workspace/configuration` request?
  // If not, we fall back using global settings.
  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration)
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  )
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  )

  const semanticTokensSupport = params.capabilities.textDocument && params.capabilities.textDocument.semanticTokens

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: false,
      },
      semanticTokensProvider: semanticTokensSupport ? {
        full: {
          delta: false
        },
        legend: {
          tokenTypes: semanticTokenTypes,
          tokenModifiers: semanticTokenModifiers
        }
      } : undefined,
    },
  }
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    }
  }
  return result
})

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(DidChangeConfigurationNotification.type, undefined)
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log('Workspace folder change event received.')
    })
  }
  connection.console.log('Cucumber Language server initialized')
})

connection.onDidChangeConfiguration(() => {
  documents.all().forEach(validateGherkinDocument)
})

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  updateCucumberInfoDebounce()
  validateGherkinDocument(change.document)
})

let updateTimer: NodeJS.Timer

function updateCucumberInfoDebounce() {
  if (updateTimer) clearTimeout(updateTimer)
  updateTimer = setTimeout(updateCucumberInfo, 5000)
}

function updateCucumberInfo() {
  makeCucumberInfo(process.execPath, ['./node_modules/.bin/cucumber-js', '--dry-run', '--format', 'message'])
    .then((cucumberInfo) => {
      expressions = cucumberInfo.expressions
      index = jsSearchIndex(cucumberInfo.stepDocuments)
    })
    .catch(err => connection.console.error('Failed to make Cucumber Info: ' + err.message))
}

function validateGherkinDocument(textDocument: TextDocument): void {
  const diagnostics = getGherkinDiagnostics(textDocument.getText(), expressions)
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics })
}

connection.onCompletion((textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
  const gherkinSource = documents.get(textDocumentPosition.textDocument.uri).getText()
  return getGherkinCompletionItems(gherkinSource, textDocumentPosition.position.line, index)
})

connection.onCompletionResolve((item) => item)

connection.languages.semanticTokens.on((semanticTokenParams: SemanticTokensParams) => {
  const gherkinSource = documents.get(semanticTokenParams.textDocument.uri).getText()
  return getGherkinSemanticTokens(gherkinSource, expressions)
})

documents.listen(connection)

connection.listen()

