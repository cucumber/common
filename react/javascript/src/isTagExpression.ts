export default function isTagExpression(expression: string): boolean {
  const tagExpression = /^\s*((@[^\s]+\s*)|(and\s+)|(or\s+)|(not\s+)|\(|\))+\s*$/
  return !!tagExpression.exec(expression)
}
