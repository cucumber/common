import os from 'os'
import { parse as parseUrl, format as formatUrl } from 'url'
import * as messages from '@cucumber/messages'
import defaultCiDict from './ciDict.json'
import evaluateVariableExpression from "./evaluateVariableExpression";

export type CiDict = Record<string,CiSystem>
export type Env = Record<string,string|undefined>

export interface CiSystem {
  url: string
  git: {
    remote: string | undefined
    branch: string | undefined
    revision: string | undefined
    tag: string | undefined
  }
}

export default function createMeta(
  toolName: string,
  toolVersion: string,
  envDict: Env,
  ciDict?: CiDict
): messages.Meta {
  if (ciDict === undefined) {
    ciDict = defaultCiDict
  }
  return {
    protocolVersion: messages.version,
    implementation: {
      name: toolName,
      version: toolVersion,
    },
    cpu: {
      name: os.arch(),
    },
    os: {
      name: os.platform(),
      version: os.release(),
    },
    runtime: {
      name: 'node.js',
      version: process.versions.node,
    },
    ci: detectCI(ciDict, envDict),
  }
}

export function detectCI(ciDict: CiDict, envDict: Env): messages.Ci | undefined {
  const detected: messages.Ci[] = []
  for (const [ciName, ciSystem] of Object.entries(ciDict)) {
    const ci = createCi(ciName, ciSystem, envDict)
    if (ci) {
      detected.push(ci)
    }
  }
  if (detected.length !== 1) {
    return undefined
  }
  if (detected.length > 1) {
    console.error(`@cucumber/create-meta WARNING: Detected more than one CI: ${JSON.stringify(detected, null, 2)}`)
    console.error('Using the first one.')
  }
  return detected[0]
}

export function removeUserInfoFromUrl(value: string): string {
  if (!value) return value
  const url = parseUrl(value)
  if (url.auth === null) return value
  url.auth = null
  return formatUrl(url)
}

function createCi(ciName: string, ciSystem: CiSystem, envDict: Env): messages.Ci | undefined {
  const url = evaluateVariableExpression(ciSystem.url, envDict)
  if (url === undefined) {
    // The url is what consumers will use as the primary key for a build
    // If this cannot be determined, we return nothing.
    return undefined
  }

  let branch = evaluateVariableExpression(ciSystem.git.branch, envDict);
  return {
    url,
    name: ciName,
    git: {
      remote: removeUserInfoFromUrl(evaluateVariableExpression(ciSystem.git.remote, envDict)),
      revision: evaluateVariableExpression(ciSystem.git.revision, envDict),
      branch: branch,
      tag: evaluateVariableExpression(ciSystem.git.tag, envDict),
    },
  }
}

