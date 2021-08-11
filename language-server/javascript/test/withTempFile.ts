// https://advancedweb.hu/secure-tempfiles-in-nodejs-without-dependencies/
import fs from 'fs'
import os from 'os'
import path from 'path'
import { promisify } from 'util'

const realpath = promisify(fs.realpath)
const mkdtemp = promisify(fs.mkdtemp)
const rm = promisify(fs.rm)

type DirFn = (dir: string) => any

export default async function withTempFile(fn: DirFn) {
  return withTempDir((dir) => fn(path.join(dir, 'file')))
}

async function withTempDir(fn: DirFn) {
  const dirName = (await realpath(os.tmpdir())) + path.sep
  const dir = await mkdtemp(dirName)
  try {
    return await fn(dir)
  } finally {
    await rm(dir, { recursive: true })
  }
}
