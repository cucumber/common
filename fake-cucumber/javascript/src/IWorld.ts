export default interface IWorld {
  testStepId: string

  attach(data: string, contentType: string): void
}
