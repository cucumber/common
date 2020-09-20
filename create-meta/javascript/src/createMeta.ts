import os from 'os'
import { parse as parseUrl, format as formatUrl } from 'url'
import { messages, version as protocolVersion } from '@cucumber/messages'
import defaultCiDict from './ciDict.json'

export type CiDict = { [name: string]: CiSystem }
export type EnvDict = { [name: string]: string | undefined }

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
  envDict: EnvDict,
  ciDict?: CiDict
): messages.Meta {
  if (ciDict === undefined) {
    ciDict = defaultCiDict
  }
  return new messages.Meta({
    protocolVersion,
    implementation: new messages.Meta.Product({
      name: toolName,
      version: toolVersion,
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
    ci: detectCI(ciDict, envDict),
  })
}

export function detectCI(
  ciDict: CiDict,
  envDict: EnvDict
): messages.Meta.CI | undefined {
  const detected: messages.Meta.CI[] = []
  for (const [ciName, ciSystem] of Object.entries(ciDict)) {
    const ci = createCi(ciName, ciSystem, envDict)
    if (ci) {
      detected.push(ci)
    }
  }
  if (detected.length !== 1) {
    return undefined
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

function createCi(
  ciName: string,
  ciSystem: CiSystem,
  envDict: EnvDict
): messages.Meta.CI | undefined {
  const url = evaluate(ciSystem.url, envDict)
  if (url === undefined) {
    // The url is what consumers will use as the primary key for a build
    // If this cannot be determined, we return nothing.
    return undefined
  }

  return messages.Meta.CI.create({
    url,
    name: ciName,
    git: {
      remote: removeUserInfoFromUrl(evaluate(ciSystem.git.remote, envDict)),
      revision: evaluate(ciSystem.git.revision, envDict),
      branch: evaluate(ciSystem.git.branch, envDict),
      tag: evaluate(ciSystem.git.tag, envDict),
    },
  })
}

/**
 * Evaluates a simple template
 *
 * @param template - the template from the ciDict.json file
 * @param envDict - variables
 * @return the evaluated template, or undefined if a variable was undefined
 */
function evaluate(template: string, envDict: EnvDict): string | undefined {
  if (template === undefined) {
    return undefined
  }
  try {
    return template.replace(
      /\${((refbranch|reftag)\s+)?([^\s}]+)(\s+\|\s+([^}]+))?}/g,
      (substring: string, ...args: any[]): string => {
        const func = args[1]
        const variable = args[2]
        const defaultValue = args[4]
        const value = envDict[variable] || defaultValue
        if (value === undefined) {
          throw new Error(`Undefined variable: ${variable}`)
        }
        switch (func) {
          case 'refbranch':
            return group1(value, /^refs\/heads\/(.*)/)
          case 'reftag':
            return group1(value, /^refs\/tags\/(.*)/)
          default:
            return value
        }
      }
    )
  } catch (err) {
    // There was an undefined variable
    return undefined
  }
}

function group1(value: string, regexp: RegExp): string {
  const match = value.match(regexp)
  if (match === null) throw new Error('No match')
  return match[1]
}
