import fs from 'fs'
import p from 'path'
import glob from 'glob'
import { promisify } from 'util'

const globPromise = promisify(glob)

function globCode(dir: string) {
  // TODO: Provide a way to configure the glob
  return globPromise(`${dir}/**/*.{js,ts}`)
}

export default async function findSupportCodePaths(
  paths: string[]
): Promise<string[]> {
  const files = new Set<string>()
  for (const path of paths) {
    const stats = fs.lstatSync(path)
    if (stats.isDirectory()) {
      const codePaths = await globCode(path)
      for (const codePath of codePaths) {
        files.add(p.resolve(codePath))
      }
    } else if (stats.isFile()) {
      const dir = p.dirname(path)
      const codePaths = await globCode(dir)
      if (codePaths.includes(path)) {
        files.add(p.resolve(path))
      } else {
        for (const codePath of codePaths) {
          files.add(p.resolve(codePath))
        }
      }
    } else {
      throw new Error(
        `Can't load ${path} - it is not a regular file or directory`
      )
    }
  }
  return Array.from(files).sort()
}
