export interface CiSystem {
  url: string
  buildNumber: string
  git: {
    remote: string | undefined
    branch: string | undefined
    revision: string | undefined
    tag: string | undefined
  }
}

export type CiDict = Record<string, CiSystem>
export type Env = Record<string, string | undefined>
