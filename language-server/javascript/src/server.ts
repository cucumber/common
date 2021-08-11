import {
  CompletionItem,
  createConnection,
  DidChangeConfigurationNotification,
  InitializeParams,
  InitializeResult,
  ProposedFeatures,
  TextDocumentPositionParams,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

import { TextDocument } from 'vscode-languageserver-textdocument'
import Completer from './Completer'
import { bruteForceIndex, fuseIndex, Index, jsSearchIndex, StepDocument } from '@cucumber/suggest'
import getGherkinDiagnostics from './getGherkinDiagnostics'
import writeStepDocumentsJson from './writeStepDocumentsJson'
import fs from 'fs'
import os from 'os'
import path from 'path'

const stepDocumentsPath = path.join(os.tmpdir(), 'cucumber-language-server-step-documents.json')

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all)

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

let index: Index = fuseIndex([])
updateIndex()

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

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: false,
      },
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
  updateIndexDebounce()
  validateGherkinDocument(change.document)
})

let updateTimer: NodeJS.Timer

function updateIndexDebounce() {
  if (updateTimer) clearTimeout(updateTimer)
  updateTimer = setTimeout(updateIndex, 5000)
}

function updateIndex() {
  writeStepDocumentsJson(process.execPath, ['./node_modules/.bin/cucumber-js', '--dry-run', '--format', 'message'], stepDocumentsPath)
    .then(() => loadIndex())
    .catch(err => connection.console.error('Failed to build Cucumber index: ' + err.message))
}

function loadIndex() {
  const stepDocuments: StepDocument[] = JSON.parse(fs.readFileSync(stepDocumentsPath, { encoding: 'utf-8' }))
  index = jsSearchIndex(stepDocuments)
}

function validateGherkinDocument(textDocument: TextDocument): void {
  const diagnostics = getGherkinDiagnostics(textDocument.getText())
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics })
}

connection.onCompletion((textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
  const completer = new Completer(documents, index)
  return completer.complete(textDocumentPosition)
})

connection.onCompletionResolve((item) => item)

documents.listen(connection)

connection.listen()
