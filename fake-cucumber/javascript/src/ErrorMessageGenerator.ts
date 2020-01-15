import StackUtils from 'stack-utils'

export type MakeErrorMessage = (error: Error, sourceFrames: string[]) => string

export function withFullStackTrace(): MakeErrorMessage {
  const stack = new StackUtils({
    cwd: process.cwd(),
    internals: [
      ...StackUtils.nodeInternals(),
      // Exclude ourself from stack traces in case we're npm link'ed
      /\s*at .*[/]fake-cucumber[/]/,
    ],
  })

  return (error: Error, sourceFrames: string[]) => {
    const trace = stack
      .clean(error.stack)
      .trim()
      .split('\n')
      .concat(sourceFrames)
      .map(frame => `    at ${frame}`)
      .join('\n')

    return `${error.message}\n${trace}`
  }
}

export function withSourceFramesOnlyStackTrace(): MakeErrorMessage {
  return (error: Error, sourceFrames: string[]) => {
    return [error.message, ...sourceFrames].join('\n')
  }
}
