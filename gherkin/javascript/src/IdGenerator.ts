import uuidv4 from 'uuid/v4'
import { NewId } from './types'

export function uuid(): NewId {
  return () => uuidv4()
}

export function incrementing(): NewId {
  let next = 0
  return () => (next++).toString()
}
