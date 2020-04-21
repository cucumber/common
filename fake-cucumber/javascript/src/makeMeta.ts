import os from 'os'
import { version } from '../package.json'
import { messages, version as protocolVersion } from '@cucumber/messages'

export default function (): messages.Meta {
  return new messages.Meta({
    protocolVersion,
    implementation: new messages.Meta.Product({
      name: 'fake-cucumber',
      version,
    }),
    cpu: new messages.Meta.Product({
      name: os.arch(),
    }),
    os: new messages.Meta.Product({
      name: os.platform(),
      version: os.release(),
    }),
    runtime: new messages.Meta.Product({
      name: 'node.js',
      version: process.versions.node,
    }),
  })
}
