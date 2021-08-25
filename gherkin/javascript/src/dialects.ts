import Dialect from './Dialect.js'

// https://pawelgrzybek.com/all-you-need-to-know-to-move-from-commonjs-to-ecmascript-modules-esm-in-node-js/#importing-json
import { createRequire } from "module"
const require = createRequire(import.meta.url)
export const dialects = require('./gherkin-languages.json') as Readonly<Record<string, Dialect>>

