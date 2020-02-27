import { v4 as uuidv4 } from 'uuid'

export type NewId = () => string

export function uuid(): NewId {
  return () => uuidv4()
}

export function incrementing(): NewId {
  let next = 0
  return () => (next++).toString()
}
