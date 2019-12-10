import uuidv4 from 'uuid/v4'

export type NewId = () => string

export function uuid(): NewId {
  return () => uuidv4()
}

export function incrementing(): NewId {
  let next = 0
  return () => (next++).toString()
}
